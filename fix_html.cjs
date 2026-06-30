const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Ensure hero text content has a proper container and the button exists
const wrapperRegex = /<div class="swiper swiper-container-hero" style="position: relative;">[\s\S]*?<\/section>/;

const newSection = `<div class="swiper swiper-container-hero" style="position: relative;">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/hero_video_1.mp4"></video>
                </div>
                <div class="swiper-slide swiper-slide-reel">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); color: rgba(255,255,255,0.5); font-weight: 600;">Coming Soon</div>
                </div>
                <div class="swiper-slide swiper-slide-reel">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.8); color: rgba(255,255,255,0.5); font-weight: 600;">Coming Soon</div>
                </div>
            </div>
            
            <button id="unmute-btn" style="position: absolute; bottom: 20px; right: 20px; z-index: 1000; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); padding: 12px 16px; border-radius: 100px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); color: #fff;">
                <i class="fas fa-volume-xmark" id="unmute-icon"></i> <span id="unmute-text">Unmute</span>
            </button>
        </div>
    </section>`;

html = html.replace(wrapperRegex, newSection);

// Add dark background to hero section if it's missing so white text shows up
if (!html.includes('background: #000')) {
    html = html.replace('<section class="hero-carousel-section">', '<section class="hero-carousel-section" style="background: #000;">');
}

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Fixed HTML layout completely!');
