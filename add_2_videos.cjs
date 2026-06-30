const fs = require('fs');

let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const createSlide = (videoName) => `
                <div class="swiper-slide swiper-slide-reel">
                    <button class="slide-mute-btn swiper-no-swiping" style="position: absolute; bottom: 20px; right: 20px; z-index: 100; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                        <i class="fas fa-volume-mute"></i>
                    </button>
                    <video class="reel-video" muted loop playsinline preload="metadata" src="./assets/videos/${videoName}.mp4#t=0.001"></video>
                </div>`;

const newSlides = createSlide('hero_video_4') + createSlide('hero_video_5');

// Insert the new slides right after the first slide
const insertPos = html.indexOf('</div>', html.indexOf('<div class="swiper-slide swiper-slide-reel">')) + 6;
html = html.slice(0, insertPos) + newSlides + html.slice(insertPos);

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');

// Also update initialSlide in main.js to 7 to stay centered with 8 videos duplicated to 16
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');
js = js.replace(/initialSlide: \d+,/, 'initialSlide: 7,');
fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');

console.log('Added 2 new videos to HTML and updated initialSlide!');
