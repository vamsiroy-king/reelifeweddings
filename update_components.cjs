const fs = require('fs');

const cssPath = 'C:/reelifeweddingsAG/css/components.css';
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Header Wrapper Glassmorphism
content = content.replace(
    /\.header-wrapper \{\s*position: fixed;\s*\/\* ALWAYS FIXED \*\/\s*top: 0;\s*left: 0;\s*width: 100%;\s*z-index: 1000;\s*background-color: var\(--color-bg-light\);\s*\/\* Pink bg to blend in \*\/\s*padding: 24px 0;\s*\}/,
    `.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(253, 248, 244, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  padding: 16px 0;
  transition: all 0.3s ease;
}`
);

// 2. Logo adjustments
content = content.replace(
    /\.nav-logo \{\s*height: 40px;\s*\/\* Adjust as needed \*\/\s*width: auto;\s*\/\*[\s\S]*?\*\/\s*filter: brightness\(0\);\s*\}/,
    `.nav-logo {
  height: 48px;
  width: auto;
  border-radius: 4px;
}`
);

// Also remove brightness(0) from mobile menu
// Not in css, it's inline in HTML.

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Successfully updated components.css');
