const fs = require('fs');

let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const clickToggleCode = `
    // Play/Pause toggle on click
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('reel-video')) {
            const video = e.target;
            const slide = video.closest('.swiper-slide');
            
            if (video.paused) {
                video.play().catch(e => console.log('Play prevented'));
                if (slide) slide.classList.remove('video-paused');
            } else {
                video.pause();
                if (slide) slide.classList.add('video-paused');
            }
        }
    });
`;

// Only insert if it's not already there
if (!js.includes('Play/Pause toggle on click')) {
    js = js.replace('// 3. Mobile Menu Toggle', clickToggleCode + '\n\n    // 3. Mobile Menu Toggle');
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Fixed play/pause logic!');
} else {
    console.log('Logic already exists, checking why it failed...');
}
