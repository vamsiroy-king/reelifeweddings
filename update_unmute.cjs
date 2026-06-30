const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// 1. Remove the old unmute button
const oldBtnRegex = /<button id="unmute-btn"[\s\S]*?<\/button>/;
html = html.replace(oldBtnRegex, '');

// 2. Add the new unmute button inside swiper-container-hero, and modify swiper container to be relative
html = html.replace('<div class="swiper swiper-container-hero">', '<div class="swiper swiper-container-hero" style="position: relative;">');

const newBtn = `
            <button id="unmute-btn" style="position: absolute; bottom: 20px; right: 20px; z-index: 1000; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); padding: 12px 16px; border-radius: 100px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); color: #fff;">
                <i class="fas fa-volume-xmark" id="unmute-icon"></i> <span id="unmute-text">Unmute</span>
            </button>
        </div>
    </section>`;
html = html.replace('        </div>\n    </section>', newBtn);

// 3. Make the 2nd and 3rd slides blank. The first one is hero_video_1.mp4.
const blankSlide = `
                <div class="swiper-slide swiper-slide-reel">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5); font-weight: 600;">Coming Soon</div>
                </div>`;

const wrapperContent = `
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/hero_video_1.mp4"></video>
                </div>${blankSlide}${blankSlide}
            </div>`;

const wrapperRegex = /<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>/;
html = html.replace(wrapperRegex, wrapperContent + '\n        </div>');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Successfully updated HTML layout!');
