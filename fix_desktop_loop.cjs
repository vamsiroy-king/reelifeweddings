const fs = require('fs');

let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const injection = `
    // Dynamically clone slides if there are too few for a wide desktop screen
    // This keeps the HTML clean but ensures Swiper's loop engine has enough elements to render infinitely without breaking
    const swiperWrapper = document.querySelector('.swiper-container-hero .swiper-wrapper');
    if (swiperWrapper) {
        const slides = Array.from(swiperWrapper.children);
        if (slides.length > 0 && slides.length < 10) {
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                swiperWrapper.appendChild(clone);
            });
        }
    }

    if (typeof Swiper !== 'undefined') {`;

js = js.replace(/if \(typeof Swiper !== 'undefined'\) {/, injection);

fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');
console.log('Fixed JS!');
