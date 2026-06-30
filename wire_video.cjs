const fs = require('fs');

let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const newSlide = `
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/hero_video_2.mp4"></video>
                    <button class="slide-mute-btn swiper-no-swiping" style="position: absolute; bottom: 20px; right: 20px; z-index: 100; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;">
                        <i class="fas fa-volume-xmark"></i>
                    </button>
                </div>`;

const blankSlide = `
                <div class="swiper-slide swiper-slide-reel">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); color: rgba(255,255,255,0.5); font-weight: 600;">Coming Soon</div>
                </div>`;

// We want to replace the first blank slide with the new video slide
const regex = /<div class="swiper-slide swiper-slide-reel">\s*<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba\(0,0,0,0.8\); color: rgba\(255,255,255,0.5\); font-weight: 600;">Coming Soon<\/div>\s*<\/div>/;

// Replace the first match of the coming soon slide with the new video slide
html = html.replace(regex, newSlide);

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log("Wired up second slide!");
