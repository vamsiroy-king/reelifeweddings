const fs = require('fs');

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Remove old motifs from after <body>
html = html.replace(/<body>[\s\S]*?<!--  Flawless Fixed Header  -->/, '<body>\n    <!--  Flawless Fixed Header  -->');

// Replace nav-logo img tags with a div for mask-image coloring in BOTH desktop header and mobile menu
html = html.replace(/<img src="\.\/assets\/logo-red\.svg" alt="Reelife Weddings" class="nav-logo">/g, '<div class="nav-logo"></div>');
html = html.replace(/<img src="\.\/assets\/logo-red\.svg" alt="Reelife Weddings" style="height: 50px; margin-bottom: 20px; border-radius: 4px;">/g, '<div class="nav-logo mobile-nav-logo"></div>');

// Replace the entire hero text block and separate it from carousel section
const oldHeroTextRegex = /<div class="hero-text-content">[\s\S]*?<\/div>/;

const newHeroText = `
    <!--  Dedicated Hero Text Section  -->
    <section class="hero-text-section" style="padding-top: 160px; text-align: center; position: relative; padding-bottom: 40px; overflow: hidden;">
        
        <!-- Wedding Motifs -->
        <svg class="wedding-motif" viewBox="0 0 50 100" style="position: absolute; left: 10%; top: 120px; width: 45px; opacity: 0.8; z-index: -1;">
            <path d="M25 100 Q25 50 10 10" fill="none" stroke="#FF2A4D" stroke-width="1.5"/>
            <path d="M22 80 Q40 70 45 50 Q30 60 22 80" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <path d="M18 60 Q5 50 2 30 Q15 40 18 60" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <path d="M15 35 Q30 25 35 5 Q20 15 15 35" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <circle cx="45" cy="50" r="2" fill="#FF2A4D"/>
            <circle cx="2" cy="30" r="2" fill="#FF2A4D"/>
            <circle cx="35" cy="5" r="2" fill="#FF2A4D"/>
        </svg>
        <svg class="wedding-motif" viewBox="0 0 50 100" style="position: absolute; right: 10%; top: 120px; width: 45px; opacity: 0.8; z-index: -1; transform: scaleX(-1);">
            <path d="M25 100 Q25 50 10 10" fill="none" stroke="#FF2A4D" stroke-width="1.5"/>
            <path d="M22 80 Q40 70 45 50 Q30 60 22 80" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <path d="M18 60 Q5 50 2 30 Q15 40 18 60" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <path d="M15 35 Q30 25 35 5 Q20 15 15 35" fill="#FDE8EA" stroke="#FF2A4D" stroke-width="1"/>
            <circle cx="45" cy="50" r="2" fill="#FF2A4D"/>
            <circle cx="2" cy="30" r="2" fill="#FF2A4D"/>
            <circle cx="35" cy="5" r="2" fill="#FF2A4D"/>
        </svg>

        <h1 style="font-family: 'Poppins', sans-serif; font-weight: 800; font-size: clamp(3.5rem, 10vw, 8rem); letter-spacing: -3px; margin-bottom: 0px; line-height: 1.1; color: var(--color-primary);">India's Best</h1>
        <h2 style="font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(1rem, 3vw, 1.8rem); color: var(--color-primary); letter-spacing: 1px; margin-bottom: 24px; margin-top: 10px;">- WEDDING CONTENT CREATORS -</h2>
        
        <p style="margin-bottom: 32px; font-size: 1.05rem; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto; line-height: 1.7; color: #5D4037; padding: 0 20px;">
            We specialize in live social media coverage of your wedding with stunning reels, engaging stories, and curated posts. Our team provides professional editing and personalized content, ensuring your celebration shines online. Let's make every moment shareable, memorable & uniquely yours!
        </p>
        
        <a href="#pricing" class="btn btn-primary" style="background: transparent; border: 1px solid var(--color-text-main); color: var(--color-text-main); padding: 12px 32px; border-radius: 50px; font-weight: 600; font-size: 0.95rem; display: inline-flex; align-items: center; justify-content: center; margin-top: 10px;">BROCHURE <i class="fas fa-arrow-down" style="margin-left: 8px;"></i></a>
    </section>
`;

html = html.replace(oldHeroTextRegex, '');
html = html.replace('<section class="hero-carousel-section">', newHeroText + '\n    <section class="hero-carousel-section" style="padding-top: 20px;">');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');


// 2. UPDATE COMPONENTS.CSS
let css = fs.readFileSync('C:/reelifeweddingsAG/css/components.css', 'utf8');

// Change header-wrapper position to absolute so it scrolls away naturally
css = css.replace('.header-wrapper {\n  position: fixed;', '.header-wrapper {\n  position: absolute;');

// Update .nav-logo to use mask-image with the original optimized webp!
const oldNavLogoRegex = /\.nav-logo \{[\s\S]*?\}/;
const newNavLogo = `.nav-logo {
  height: 90px;
  width: 140px;
  background-color: var(--color-primary);
  -webkit-mask-image: url('../assets/logo-optimized.webp');
  mask-image: url('../assets/logo-optimized.webp');
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.mobile-nav-logo {
  height: 60px;
  width: 100px;
  margin-bottom: 20px;
}`;
css = css.replace(oldNavLogoRegex, newNavLogo);

fs.writeFileSync('C:/reelifeweddingsAG/css/components.css', css, 'utf8');


// 3. UPDATE MAIN.JS
let js = fs.readFileSync('C:/reelifeweddingsAG/js/main.js', 'utf8');

const scrollObserverCode = `
    // Auto-pause and mute videos when carousel scrolls out of view
    const carouselSection = document.querySelector('.hero-carousel-section');
    if (carouselSection && typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    document.querySelectorAll('.reel-video').forEach(video => {
                        video.muted = true;
                        video.pause();
                        // Reset play button states
                        const btn = video.nextElementSibling;
                        if (btn && btn.classList.contains('slide-mute-btn')) {
                            btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
                        }
                    });
                }
            });
        }, { threshold: 0 });
        observer.observe(carouselSection);
    }
`;

// Insert the scroll observer code into the DOMContentLoaded block
js = js.replace('// 3. Mobile Menu Toggle', scrollObserverCode + '\n\n    // 3. Mobile Menu Toggle');

fs.writeFileSync('C:/reelifeweddingsAG/js/main.js', js, 'utf8');

console.log('Fixed requested issues!');
