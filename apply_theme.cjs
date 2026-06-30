const fs = require('fs');

// 1. Create logo-red.svg
const logoSvg = fs.readFileSync('C:/reelifeweddingsAG/assets/logo.svg', 'utf8');
const logoRedSvg = logoSvg
    .replace(/stroke="white"/g, 'stroke="#E91E63"')
    .replace(/fill="white"/g, 'fill="#E91E63"')
    .replace(/rgba\(255,255,255,0\.1\)/g, 'rgba(233, 30, 99, 0.05)');
fs.writeFileSync('C:/reelifeweddingsAG/assets/logo-red.svg', logoRedSvg, 'utf8');

// 2. Update variables.css
let vars = fs.readFileSync('C:/reelifeweddingsAG/css/variables.css', 'utf8');
vars = vars.replace('--color-bg-light: #FFFFFF;', '--color-bg-light: #FDE8EA; /* Soft pastel pink */');
fs.writeFileSync('C:/reelifeweddingsAG/css/variables.css', vars, 'utf8');

// 3. Update components.css
let comps = fs.readFileSync('C:/reelifeweddingsAG/css/components.css', 'utf8');
// Fix Header Background
comps = comps.replace(/background-color: rgba\(10, 10, 10, 0\.9\);/g, 'background-color: transparent;');
comps = comps.replace(/border-bottom: 1px solid rgba\(255,255,255,0\.05\);/g, 'border-bottom: none;');
// Fix Nav Links
comps = comps.replace(/color: #ffffff;\s*transition/g, 'color: #5D4037;\n  transition'); // Warm dark brown for text
// Fix Mobile Toggle
comps = comps.replace(/background: #ffffff;\s*transition/g, 'background: #5D4037;\n  transition');
// Fix Mobile Menu
comps = comps.replace(/background-color: rgba\(10, 10, 10, 0\.98\);/g, 'background-color: #FDE8EA;');
comps = comps.replace(/\.mobile-menu \.nav-link \{\n  font-size: 1\.5rem;\n  color: #ffffff;/g, '.mobile-menu .nav-link {\n  font-size: 1.5rem;\n  color: #5D4037;');
// Make Logo Bigger
comps = comps.replace(/height: 48px;/g, 'height: 85px;');

fs.writeFileSync('C:/reelifeweddingsAG/css/components.css', comps, 'utf8');

// 4. Update index.html
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');
// Use red logo
html = html.replace(/src="\.\/assets\/logo-optimized\.webp"/g, 'src="./assets/logo-red.svg"');
html = html.replace(/src="\.\/assets\/favicon\.png"/g, 'src="./assets/logo-red.svg"'); // mobile menu logo
// Add motifs to header-wrapper
const motifs = `
    <!-- Wedding Motifs -->
    <svg class="wedding-motif" viewBox="0 0 50 100" style="position: absolute; left: 8%; top: 250px; width: 45px; opacity: 0.8; z-index: -1;">
        <path d="M25 100 Q25 50 10 10" fill="none" stroke="#E91E63" stroke-width="1.5"/>
        <path d="M22 80 Q40 70 45 50 Q30 60 22 80" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <path d="M18 60 Q5 50 2 30 Q15 40 18 60" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <path d="M15 35 Q30 25 35 5 Q20 15 15 35" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <circle cx="45" cy="50" r="2" fill="#E91E63"/>
        <circle cx="2" cy="30" r="2" fill="#E91E63"/>
        <circle cx="35" cy="5" r="2" fill="#E91E63"/>
    </svg>
    <svg class="wedding-motif" viewBox="0 0 50 100" style="position: absolute; right: 8%; top: 250px; width: 45px; opacity: 0.8; z-index: -1; transform: scaleX(-1);">
        <path d="M25 100 Q25 50 10 10" fill="none" stroke="#E91E63" stroke-width="1.5"/>
        <path d="M22 80 Q40 70 45 50 Q30 60 22 80" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <path d="M18 60 Q5 50 2 30 Q15 40 18 60" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <path d="M15 35 Q30 25 35 5 Q20 15 15 35" fill="#FDE8EA" stroke="#E91E63" stroke-width="1"/>
        <circle cx="45" cy="50" r="2" fill="#E91E63"/>
        <circle cx="2" cy="30" r="2" fill="#E91E63"/>
        <circle cx="35" cy="5" r="2" fill="#E91E63"/>
    </svg>
`;
// Insert motifs right after body tag opening
html = html.replace('<body>', '<body>\n' + motifs);

// Adjust pricing section text color to match the theme
html = html.replace(/color: #8B7B74;/g, 'color: #5D4037;');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');

console.log('Successfully applied pastel theme, seamless header, red logo, and floral motifs!');
