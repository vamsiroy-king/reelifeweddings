const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Replace video tags to remove preload="none" and add autoplay
html = html.replace(/<video class="reel-video" muted loop playsinline preload="none" src="\.\/assets\/video\.mp4"><\/video>/g, 
    '<video class="reel-video" muted autoplay loop playsinline src="./assets/video.mp4"></video>');

// Add the floating Unmute button if it doesn't exist
if (!html.includes('id="unmute-btn"')) {
    const btnHtml = `
        <button id="unmute-btn" style="position: absolute; top: 120px; right: 24px; z-index: 1000; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); border: 1px solid rgba(0,0,0,0.1); padding: 8px 16px; border-radius: 100px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); color: #111;">
            <i class="fas fa-volume-xmark" id="unmute-icon"></i> <span id="unmute-text">Unmute</span>
        </button>
    `;
    html = html.replace('<div class="hero-text-content">', btnHtml + '\n        <div class="hero-text-content">');
}

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Updated index.html with autoplay videos and unmute button.');
