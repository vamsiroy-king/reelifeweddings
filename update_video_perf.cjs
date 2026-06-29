const fs = require('fs');

// 1. Update css/sections.css for video performance
const cssPath = 'C:/reelifeweddingsAG/css/sections.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
    /\.reel-video \{\s*width: 100%;\s*height: 100%;\s*object-fit: cover;\s*background: #000;\s*\}/,
    `.reel-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
  transform: translateZ(0);
  will-change: transform;
}`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');

// 2. Update index.html videos with preload="none" so they don't block the main thread loading
const htmlPath = 'C:/reelifeweddingsAG/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace all video tags to add preload="none"
htmlContent = htmlContent.replace(/<video class="reel-video" muted loop playsinline src="\.\/assets\/videos\/video\.mp4"><\/video>/g, '<video class="reel-video" muted loop playsinline preload="none" src="./assets/videos/video.mp4"></video>');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');

console.log('Successfully updated video performance configurations.');
