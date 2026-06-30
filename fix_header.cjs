const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Change logo
html = html.replace(/src="\.\/assets\/favicon\.png"/g, 'src="./assets/logo.png"');

// Add #t=0.001 to all hero videos to force iOS/mobile to load the first frame as a poster!
html = html.replace(/\.mp4"/g, '.mp4#t=0.001"');
// prevent double appending if already there
html = html.replace(/\.mp4#t=0\.001#t=0\.001"/g, '.mp4#t=0.001"');

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');

// 2. Update css/components.css
let css = fs.readFileSync('C:/reelifeweddingsAG/css/components.css', 'utf8');

// Header background
css = css.replace('background-color: rgba(253, 248, 244, 0.85);', 'background-color: rgba(10, 10, 10, 0.9);');
css = css.replace('border-bottom: 1px solid rgba(0,0,0,0.05);', 'border-bottom: 1px solid rgba(255,255,255,0.05);');

// Nav links color to white
css = css.replace(/color: var\(--color-text-main\);\s*transition/g, 'color: #ffffff;\n  transition');
// Mobile toggle lines to white
css = css.replace(/background: var\(--color-text-main\);\s*transition/g, 'background: #ffffff;\n  transition');

// Mobile menu background to dark
css = css.replace(/background-color: var\(--color-white\);\s*z-index: 900;/g, 'background-color: rgba(10, 10, 10, 0.98);\n  z-index: 900;');

// Mobile menu nav links to white (it might already be matched by the global replace above, but just in case)
css = css.replace(/\.mobile-menu \.nav-link \{\n  font-size: 1\.5rem;\n  color: var\(--color-text-main\);/g, '.mobile-menu .nav-link {\n  font-size: 1.5rem;\n  color: #ffffff;');

fs.writeFileSync('C:/reelifeweddingsAG/css/components.css', css, 'utf8');

console.log('Fixed mobile black screen posters and header color scheme!');
