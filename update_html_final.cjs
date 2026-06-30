const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Replace all video tags safely
let counter = 1;
html = html.replace(/<video[^>]+src="\.\/assets\/videos\/video\.mp4"><\/video>/g, () => {
    let newVideo = `<video class="reel-video" muted autoplay loop playsinline src="./assets/videos/reel${counter}.mp4"></video>`;
    counter = (counter % 5) + 1;
    return newVideo;
});

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Fixed index.html properly!');
