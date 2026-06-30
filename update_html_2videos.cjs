const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const startIndex = html.indexOf('<div class="swiper-wrapper">');
const endIndex = html.indexOf('</div>\n        </div>\n    </section>'); // end of swiper container

if (startIndex !== -1 && endIndex !== -1) {
    const newWrapperContent = `<div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/IMG_0797.mp4"></video>
                </div>
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/IMG_7694.mp4"></video>
                </div>
            `;
    
    html = html.substring(0, startIndex) + newWrapperContent + html.substring(endIndex);
    fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
    console.log('Updated index.html to contain exactly the 2 new videos!');
} else {
    console.log('Could not find swiper-wrapper boundaries.');
}
