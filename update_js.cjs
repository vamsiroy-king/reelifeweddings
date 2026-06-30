const fs = require('fs');
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const newSwiperInit = `
    // 2. Swiper Coverflow Initialization
    let isGlobalMuted = true;
    const unmuteBtn = document.getElementById('unmute-btn');
    const unmuteIcon = document.getElementById('unmute-icon');
    const unmuteText = document.getElementById('unmute-text');

    if (unmuteBtn) {
        unmuteBtn.addEventListener('click', () => {
            isGlobalMuted = !isGlobalMuted;
            if (isGlobalMuted) {
                unmuteIcon.className = 'fas fa-volume-xmark';
                unmuteText.textContent = 'Unmute';
            } else {
                unmuteIcon.className = 'fas fa-volume-high';
                unmuteText.textContent = 'Mute';
            }
            if (window.heroSwiper) {
                playActiveVideo(window.heroSwiper);
            }
        });
    }

    if (typeof Swiper !== 'undefined') {
        window.heroSwiper = new Swiper('.swiper-container-hero', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1.5,
            breakpoints: {
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 }
            },
            loop: true,
            initialSlide: 0,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            on: {
                init: function () {
                    playActiveVideo(this);
                },
                slideChangeTransitionEnd: function () {
                    playActiveVideo(this);
                },
            }
        });

        function playActiveVideo(swiperInstance) {
            // Let all videos play visually, but mute them all first
            document.querySelectorAll('.reel-video').forEach(video => {
                video.muted = true;
                // Ensure they are playing (in case browsers blocked initial autoplay)
                video.play().catch(e => {}); 
            });

            // If global mute is OFF, unmute ONLY the active slide's video
            if (!isGlobalMuted) {
                const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
                const activeVideo = activeSlide.querySelector('video');
                if (activeVideo) {
                    activeVideo.muted = false;
                }
            }
        }
    }
`;

// Replace the old Swiper initialization
// Need to find the start of "// 2. Swiper Coverflow Initialization" and the end of that block.
const startIndex = js.indexOf('// 2. Swiper Coverflow Initialization');
const endIndex = js.indexOf('// 3. Mobile Menu Toggle');

if (startIndex !== -1 && endIndex !== -1) {
    js = js.substring(0, startIndex) + newSwiperInit + '\n    ' + js.substring(endIndex);
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Updated main.js successfully.');
} else {
    console.log('Could not find boundaries in main.js');
}
