const fs = require('fs');

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Inject the play-overlay icon into every swiper-slide-reel right after the video tag
const playOverlayHTML = `\n                    <div class="play-overlay"><i class="fas fa-play"></i></div>`;
// Replace the end of the video tag so the overlay sits right after it
html = html.replace(/<video class="reel-video"([\s\S]*?)<\/video>/g, '<video class="reel-video"$1</video>' + playOverlayHTML);

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');


// 2. UPDATE SECTIONS.CSS
let css = fs.readFileSync('C:/reelifeweddingsAG/css/sections.css', 'utf8');

const playOverlayCSS = `
/* Play/Pause Overlay */
.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 50;
  text-shadow: 0 4px 15px rgba(0,0,0,0.4);
}

.swiper-slide.video-paused .play-overlay {
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(1.1);
}

/* Allow clicking on the video to toggle */
.reel-video {
  cursor: pointer;
}
`;

css += '\n' + playOverlayCSS;
fs.writeFileSync('C:/reelifeweddingsAG/css/sections.css', css, 'utf8');


// 3. UPDATE MAIN.JS
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

// Insert the click toggle logic into DOMContentLoaded block
js = js.replace('// 2. Mute Button Logic (Independent Event Delegation)', clickToggleCode + '\n\n    // 2. Mute Button Logic (Independent Event Delegation)');

// Make sure slide changes reset the pause state
js = js.replace('video.play().catch(e => {}); // Play only the active video', "video.play().catch(e => {}); // Play only the active video\n                            activeSlide.classList.remove('video-paused');");

fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');

console.log('Added play/pause feature successfully!');
