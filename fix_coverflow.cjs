const fs = require('fs');

// 1. Fix main.js Coverflow effect and looping parameters
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const coverflowRegex = /coverflowEffect:\s*{\s*rotate:\s*\d+,\s*stretch:\s*\d+,\s*depth:\s*\d+,\s*modifier:\s*[\d.]+,\s*slideShadows:\s*(true|false),?\s*}/;

const newCoverflow = `coverflowEffect: {
                rotate: 0,
                stretch: -20,
                depth: 150,
                modifier: 2.5,
                slideShadows: false,
            }`;

js = js.replace(coverflowRegex, newCoverflow);

// Add loopedSlides to help Swiper perfectly center with only 3 DOM slides
if(!js.includes('loopedSlides: 3')) {
    js = js.replace(/loop: true,/, "loop: true,\n            loopedSlides: 3,\n            observer: true,\n            observeParents: true,");
}
js = js.replace(/initialSlide: 0,/, "initialSlide: 1,");

fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');


// 2. Fix index.html by removing the 3 hardcoded duplicate slides.
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
            </div>`;

const wrapperRegex = /<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
html = html.replace(wrapperRegex, wrapperContent + '\n        </div>\n    </section>');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Fixed coverflow effect to match screenshot 2, and removed hardcoded duplicates!');
