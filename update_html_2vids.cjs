const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const regex = /<div class="swiper-wrapper">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;

const match = html.match(regex);
if (match) {
    const newWrapper = `<div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/IMG_0797.mp4"></video>
                </div>
                <div class="swiper-slide swiper-slide-reel">
                    <video class="reel-video" muted autoplay loop playsinline src="./assets/videos/IMG_7694.mp4"></video>
                </div>
            </div>
        </div>
    </section>`;
    
    html = html.replace(regex, newWrapper);
    fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
    console.log('Updated to exactly 2 videos!');
} else {
    console.log('Regex did not match!');
}
