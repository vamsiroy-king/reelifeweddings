const fs = require('fs');

const cssPath = 'C:/reelifeweddingsAG/css/sections.css';
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Remove brown gradient, use Premium Dark Grey for popular card
content = content.replace(
    /background: linear-gradient\(145deg, #2C1810, #4A2520\);/,
    'background: #1C1C1C;'
);
content = content.replace(
    /box-shadow: 0 20px 60px rgba\(44, 24, 16, 0\.25\);/,
    'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);'
);

// 2. Change ticks to Red
content = content.replace(
    /background: #C0392B;/g,
    'background: #ff3b5c;'
);

// 3. Change Prices to Red
content = content.replace(
    /color: #C0392B;/g,
    'color: #ff3b5c;'
);

// 4. Update Button Theme ("smartly please")
// Regular button
content = content.replace(
    /\.pricing-btn {\s*width: 100%;\s*margin-top: auto;\s*font-weight: 600;\s*padding: 14px;\s*border-radius: 8px;\s*font-size: 0\.95rem;\s*background: #2C1810;/,
    '.pricing-btn {\n    width: 100%;\n    margin-top: auto;\n    font-weight: 600;\n    padding: 14px;\n    border-radius: 8px;\n    font-size: 0.95rem;\n    background: #FDF8F4;\n    color: #ff3b5c;\n    border: 1px solid #ff3b5c;'
);
// Hover state
content = content.replace(
    /\.pricing-btn:hover {\s*opacity: 0\.9;\s*transform: none;\s*box-shadow: none;\s*}/,
    '.pricing-btn:hover {\n    background: #ff3b5c;\n    color: #FFFFFF;\n}'
);
// Popular button
content = content.replace(
    /\.pricing-card.popular \.pricing-btn {\s*background: #FFFFFF;\s*color: #2C1810;\s*}/,
    '.pricing-card.popular .pricing-btn {\n    background: #ff3b5c;\n    color: #FFFFFF;\n    border: none;\n}\n.pricing-card.popular .pricing-btn:hover {\n    opacity: 0.9;\n    background: #ff3b5c;\n}'
);

// 5. Fix alignment: "exactly side by side"
content = content.replace(
    /\.pricing-features li {\s*padding: 8px 0;\s*font-size: 0\.9rem;\s*text-align: left;\s*color: #4A3F3A;\s*display: flex;\s*align-items: flex-start;\s*gap: 10px;\s*line-height: 1\.4;\s*}/,
    '.pricing-features li {\n    padding: 8px 0;\n    font-size: 0.9rem;\n    text-align: left;\n    color: #4A3F3A;\n    display: block;\n    position: relative;\n    padding-left: 32px;\n    line-height: 1.4;\n    min-height: 72px;\n}'
);

content = content.replace(
    /\.pricing-features li::before {\s*content: '';\s*width: 20px;\s*height: 20px;\s*min-width: 20px;\s*border-radius: 50%;\s*background: #ff3b5c;\s*display: inline-flex;\s*align-items: center;\s*justify-content: center;\s*margin-top: 2px;/,
    '.pricing-features li::before {\n    content: \'\';\n    position: absolute;\n    left: 0;\n    top: 8px;\n    width: 20px;\n    height: 20px;\n    min-width: 20px;\n    border-radius: 50%;\n    background: #ff3b5c;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    margin-top: 0;'
);


fs.writeFileSync(cssPath, content, 'utf8');
console.log('Successfully updated sections.css');
