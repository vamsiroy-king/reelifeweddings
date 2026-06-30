const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Remove the global unmute button if it exists
html = html.replace(/<button id="unmute-btn"[\s\S]*?<\/button>/g, '');

// Create the new slide layout with an internal mute/unmute button
const videoSlide = `
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/hero_video_1.mp4"></video>
                    <button class="slide-mute-btn" style="position: absolute; bottom: 20px; right: 20px; z-index: 100; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                        <i class="fas fa-volume-xmark"></i>
                    </button>
                </div>`;

const blankSlide = `
                <div class="swiper-slide swiper-slide-reel">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); color: rgba(255,255,255,0.5); font-weight: 600;">Coming Soon</div>
                </div>`;

const wrapperContent = `
            <div class="swiper-wrapper">
${videoSlide}
${blankSlide}
${blankSlide}
            </div>`;

// Replace the swiper wrapper
const wrapperRegex = /<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>/;
html = html.replace(wrapperRegex, wrapperContent + '\n        </div>');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');


// 2. Update main.js
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

// Replace the playActiveVideo and global mute logic entirely
const newLogic = `
    let isGlobalSoundOn = false;

    // Attach click events to all individual slide mute buttons using event delegation
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.slide-mute-btn');
        if (btn) {
            const slide = btn.closest('.swiper-slide');
            const video = slide.querySelector('.reel-video');
            if (video) {
                isGlobalSoundOn = !isGlobalSoundOn;
                updateVideoSoundStates();
            }
        }
    });

    if (typeof Swiper !== 'undefined') {
        window.heroSwiper = new Swiper('.swiper-container-hero', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1.5,
            breakpoints: {
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 }
            },
            loop: true,
            initialSlide: 0,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            on: {
                init: function () {
                    updateVideoSoundStates();
                },
                slideChangeTransitionEnd: function () {
                    updateVideoSoundStates();
                },
            }
        });

        function updateVideoSoundStates() {
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                const video = slide.querySelector('.reel-video');
                const btn = slide.querySelector('.slide-mute-btn i');
                
                if (video) {
                    // Always make sure video is playing visually
                    video.play().catch(e => {});

                    // If it's the active slide and global sound is ON, play sound
                    if (slide.classList.contains('swiper-slide-active') && isGlobalSoundOn) {
                        video.muted = false;
                        video.volume = 1.0;
                        if(btn) btn.className = 'fas fa-volume-high';
                    } else {
                        // If it's scrolled away OR global sound is off, MUTE it
                        video.muted = true;
                        if(btn) btn.className = 'fas fa-volume-xmark';
                    }
                }
            });
        }
    }
`;

// Replace everything from let isGlobalMuted to the end of the swiper init block
const startIdx = js.indexOf('let isGlobalMuted = true;');
const endIdx = js.indexOf('    // 3. Mobile Menu Toggle');

if (startIdx !== -1 && endIdx !== -1) {
    js = js.substring(0, startIdx) + newLogic + js.substring(endIdx);
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Fixed index.html and main.js logic!');
} else {
    console.log('Could not find replace block in main.js');
}
