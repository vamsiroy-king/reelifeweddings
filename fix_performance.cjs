const fs = require('fs');

// 1. Update index.html to have all 7 videos with optimized tags
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const createSlide = (videoName) => `
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted loop playsinline preload="metadata" src="./assets/videos/${videoName}"></video>
                    <button class="slide-mute-btn swiper-no-swiping" style="position: absolute; bottom: 20px; right: 20px; z-index: 100; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                        <i class="fas fa-volume-xmark"></i>
                    </button>
                </div>`;

const wrapperContent = `
            <div class="swiper-wrapper">
${createSlide('hero_video_1.mp4')}
${createSlide('hero_video_2.mp4')}
${createSlide('hero_video_3.mp4')}
${createSlide('hero_video_4.mp4')}
${createSlide('hero_video_5.mp4')}
${createSlide('hero_video_6.mp4')}
${createSlide('hero_video_7.mp4')}
            </div>`;

const wrapperRegex = /<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
html = html.replace(wrapperRegex, wrapperContent + '\n        </div>\n    </section>');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');

// 2. Update main.js for lazy playing
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

// Update initialSlide
js = js.replace(/initialSlide: 1,/, "initialSlide: 3,");

// Re-write the 'on' events block to handle play/pause
const onBlock = `on: {
                init: function () {
                    // Mute and pause all videos except the center one
                    document.querySelectorAll('.reel-video').forEach(video => {
                        video.muted = true;
                        video.pause();
                    });
                    
                    // Give swiper a tiny delay to mark the active slide, then play it
                    setTimeout(() => {
                        const activeSlide = document.querySelector('.swiper-slide-active');
                        if (activeSlide) {
                            const video = activeSlide.querySelector('.reel-video');
                            if (video) video.play().catch(e => {});
                        }
                    }, 100);
                },
                slideChangeTransitionEnd: function () {
                    // Pause all videos to save bandwidth and CPU
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        const video = slide.querySelector('.reel-video');
                        const btn = slide.querySelector('.slide-mute-btn i');
                        if (video) {
                            video.muted = true;
                            video.pause(); // Stop playing inactive videos!
                        }
                        if (btn) btn.className = 'fas fa-volume-xmark';
                    });

                    // Play and optionally unmute the active slide
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) {
                        const video = activeSlide.querySelector('.reel-video');
                        if (video) {
                            video.play().catch(e => {}); // Play only the active video
                            
                            if (isGlobalSoundOn) {
                                video.muted = false;
                                video.volume = 1.0;
                            }
                        }
                    }

                    // Update UI icons for active
                    if (isGlobalSoundOn) {
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-high');
                    }
                },
            }`;

// Replace everything from 'on: {' to '});\n    }' (which closes the swiper setup)
const swiperSetupEndIdx = js.indexOf('});', js.indexOf('on: {'));
const swiperSetupStartIdx = js.indexOf('on: {');

if (swiperSetupStartIdx !== -1 && swiperSetupEndIdx !== -1) {
    js = js.substring(0, swiperSetupStartIdx) + onBlock + js.substring(swiperSetupEndIdx);
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Fixed performance and mobile layout spacing!');
} else {
    console.log('Failed to patch main.js');
}
