const fs = require('fs');
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const newFunc = `
        function playActiveVideo() {
            // Let all videos play visually, but mute them all first
            document.querySelectorAll('.reel-video').forEach(video => {
                video.muted = true;
                // Ensure they are playing
                video.play().catch(e => {}); 
            });

            // If global mute is OFF, unmute ONLY the active slide's video
            if (!isGlobalMuted) {
                // Use .swiper-slide-active to perfectly target the center slide
                const activeVideo = document.querySelector('.swiper-slide-active .reel-video');
                if (activeVideo) {
                    activeVideo.muted = false;
                    activeVideo.volume = 1.0;
                }
            }
        }`;

// Replace the old playActiveVideo function
const funcStart = js.indexOf('function playActiveVideo(swiperInstance) {');
const funcEnd = js.indexOf('    }', funcStart) + 5; // find the end of the block

if (funcStart !== -1) {
    js = js.substring(0, funcStart) + newFunc + js.substring(funcEnd);
    
    // Also remove 'this' argument from playActiveVideo calls
    js = js.replace(/playActiveVideo\(this\);/g, 'playActiveVideo();');
    js = js.replace(/playActiveVideo\(window\.heroSwiper\);/g, 'playActiveVideo();');
    
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Fixed playActiveVideo logic in main.js!');
} else {
    console.log('Could not find function block in main.js');
}
