const fs = require('fs');

// 1. Update variables.css to import new elegant fonts
let vars = fs.readFileSync('C:/reelifeweddingsAG/css/variables.css', 'utf8');
vars = vars.replace(
    /@import url\('https:\/\/fonts.googleapis.com\/css2\?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap'\);/,
    `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800&family=Great+Vibes&family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');`
);
fs.writeFileSync('C:/reelifeweddingsAG/css/variables.css', vars, 'utf8');


// 2. Update index.html
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

const oldHeroRegex = /<!--  Dedicated Hero Text Section  -->[\s\S]*?<\/section>/;

const newHero = `
    <!--  Unique Hero Split Section  -->
    <section class="hero-split-section" id="home">
        <div class="hero-split-container">
            <div class="hero-split-text">
                <span class="hero-tagline">Crafting Cinematic Magic</span>
                <h1 class="hero-headline">Relive Your Magic, Frame by Frame.</h1>
                <p class="hero-description">We transform your wedding into stunning cinematic reels and engaging social media stories delivered within 24 hours. From intimate glances to grand celebrations, our dedicated team ensures every magical moment is beautifully documented and ready to share with the world.</p>
                <a href="#contact" class="btn-book-now">Book Your Dates <i class="fas fa-calendar-check" style="margin-left: 8px;"></i></a>
            </div>
            <div class="hero-split-collage">
                <img src="./assets/images/wedding_muhurtham_1782395043700.png" alt="Wedding Moment" class="collage-img collage-img-1">
                <img src="./assets/images/haldi_ceremony_1782395055259.png" alt="Haldi Moment" class="collage-img collage-img-2">
                <img src="./assets/images/pre_wedding_shoot_1782395089990.png" alt="Pre Wedding Shoot" class="collage-img collage-img-3">
            </div>
        </div>
    </section>
`;

html = html.replace(oldHeroRegex, newHero);
fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');


// 3. Update sections.css
let css = fs.readFileSync('C:/reelifeweddingsAG/css/sections.css', 'utf8');

const splitCSS = `
/*  Hero Split Redesign  */
.hero-split-section {
  padding-top: 150px;
  padding-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.hero-split-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-split-text {
  text-align: left;
}

.hero-tagline {
  font-family: 'Great Vibes', cursive;
  font-size: 2.8rem;
  color: var(--color-primary);
  display: block;
  margin-bottom: 0px;
  transform: rotate(-3deg);
}

.hero-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 4vw, 4rem);
  line-height: 1.1;
  color: var(--color-text-main);
  margin-bottom: 24px;
}

.hero-description {
  font-size: 1.1rem;
  color: #5D4037;
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 95%;
}

.btn-book-now {
  background: var(--color-primary);
  color: white;
  padding: 16px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(255, 42, 77, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-book-now:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 25px rgba(255, 42, 77, 0.4);
  color: white;
}

.hero-split-collage {
  position: relative;
  height: 550px;
  width: 100%;
}

.collage-img {
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border: 10px solid white;
  transition: transform 0.4s ease, z-index 0s;
  object-fit: cover;
}

.collage-img:hover {
  transform: scale(1.05) translateZ(10px) !important;
  z-index: 10 !important;
}

.collage-img-1 {
  width: 260px;
  height: 340px;
  top: 10%;
  left: 0;
  transform: rotate(-6deg);
  z-index: 3;
}

.collage-img-2 {
  width: 300px;
  height: 400px;
  top: -5%;
  right: 0;
  transform: rotate(4deg);
  z-index: 2;
}

.collage-img-3 {
  width: 240px;
  height: 300px;
  bottom: 0;
  left: 20%;
  transform: rotate(-2deg);
  z-index: 4;
}

@media (max-width: 991px) {
  .hero-split-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 50px;
  }
  
  .hero-split-text {
    text-align: center;
  }
  
  .hero-tagline {
    transform: none;
    margin-bottom: 10px;
  }
  
  .hero-description {
    margin: 0 auto 32px auto;
  }
  
  .hero-split-collage {
    height: 450px;
  }
  
  .collage-img-1 { width: 50%; height: auto; top: 10%; left: 0; }
  .collage-img-2 { width: 60%; height: auto; top: 0; right: 0; }
  .collage-img-3 { width: 45%; height: auto; bottom: 0; left: 25%; }
}
`;

css += '\n' + splitCSS;
fs.writeFileSync('C:/reelifeweddingsAG/css/sections.css', css, 'utf8');

console.log('Successfully redesigned hero section!');
