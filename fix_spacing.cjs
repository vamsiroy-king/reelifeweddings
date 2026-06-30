const fs = require('fs');

let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const createSlide = (videoName) => `
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/${videoName}"></video>
                    <button class="slide-mute-btn swiper-no-swiping" style="position: absolute; bottom: 20px; right: 20px; z-index: 100; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                        <i class="fas fa-volume-xmark"></i>
                    </button>
                </div>`;

const wrapperContent = `
            <div class="swiper-wrapper">
${createSlide('hero_video_1.mp4')}
${createSlide('hero_video_2.mp4')}
${createSlide('hero_video_3.mp4')}
${createSlide('hero_video_1.mp4')}
${createSlide('hero_video_2.mp4')}
${createSlide('hero_video_3.mp4')}
            </div>`;

// Replace the swiper wrapper
const wrapperRegex = /<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>/;
html = html.replace(wrapperRegex, wrapperContent + '\n        </div>');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log("Wired up 6 slides to fix swiper spacing!");
