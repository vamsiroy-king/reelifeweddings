const fs = require('fs');

// 1. Remove the black background from index.html
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');
html = html.replace('<section class="hero-carousel-section" style="background: #000;">', '<section class="hero-carousel-section">');

// Update button to include swiper-no-swiping to prevent swiper from eating clicks
html = html.replace(/<button class="slide-mute-btn"/g, '<button class="slide-mute-btn swiper-no-swiping"');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');

// 2. Fix the JS logic
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

// The new bulletproof logic
const newLogic = `
    let isGlobalSoundOn = false;

    // Direct click handler for mute/unmute buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.slide-mute-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle sound
            isGlobalSoundOn = !isGlobalSoundOn;
            
            // Immediately apply to the actively visible video
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const video = activeSlide.querySelector('.reel-video');
                const icon = btn.querySelector('i');
                if (video) {
                    if (isGlobalSoundOn) {
                        video.muted = false;
                        video.volume = 1.0;
                        if(icon) icon.className = 'fas fa-volume-high';
                        // Also update all duplicate active slides visually
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-high');
                    } else {
                        video.muted = true;
                        if(icon) icon.className = 'fas fa-volume-xmark';
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-xmark');
                    }
                }
            }
            
            // Also force update all other slides to be muted
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                if (!slide.classList.contains('swiper-slide-active') && !slide.classList.contains('swiper-slide-duplicate-active')) {
                    const video = slide.querySelector('.reel-video');
                    const slideBtn = slide.querySelector('.slide-mute-btn i');
                    if (video) video.muted = true;
                    if (slideBtn) slideBtn.className = 'fas fa-volume-xmark';
                }
            });
        }
    });

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
                    // Start all muted
                    document.querySelectorAll('.reel-video').forEach(video => {
                        video.muted = true;
                        video.play().catch(e => {});
                    });
                },
                slideChangeTransitionEnd: function () {
                    // When user scrolls, mute everything first
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        const video = slide.querySelector('.reel-video');
                        const btn = slide.querySelector('.slide-mute-btn i');
                        if (video) {
                            video.muted = true;
                            video.play().catch(e => {});
                        }
                        if (btn) btn.className = 'fas fa-volume-xmark';
                    });

                    // Unmute the active slide IF global sound is ON
                    if (isGlobalSoundOn) {
                        const activeSlide = document.querySelector('.swiper-slide-active');
                        if (activeSlide) {
                            const video = activeSlide.querySelector('.reel-video');
                            if (video) {
                                video.muted = false;
                                video.volume = 1.0;
                            }
                        }
                        // Update icons for active & duplicate-active
                        document.querySelectorAll('.swiper-slide-active .slide-mute-btn i, .swiper-slide-duplicate-active .slide-mute-btn i').forEach(i => i.className = 'fas fa-volume-high');
                    }
                },
            }
        });
    }
`;

// Replace from 'let isGlobalSoundOn' to the end of the swiper init block
const startIdx = js.indexOf('let isGlobalSoundOn');
const endIdx = js.indexOf('// 3. Mobile Menu Toggle');

if (startIdx !== -1 && endIdx !== -1) {
    js = js.substring(0, startIdx) + newLogic + '\n    ' + js.substring(endIdx);
    fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
    console.log('Fixed button logic in main.js and background in index.html!');
} else {
    console.log('Could not find replace block in main.js');
}
