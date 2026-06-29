const fs = require('fs');

const cssPath = 'C:/reelifeweddingsAG/css/sections.css';
let content = fs.readFileSync(cssPath, 'utf8');

// Section Background
content = content.replace(
    /\.pricing-section {\s*padding: 100px 24px;\s*background: #[A-Fa-f0-9]+;\s*}/,
    '.pricing-section {\n    padding: 100px 24px;\n    background: #FFFFFF;\n}'
);

// Card Background
content = content.replace(
    /\.pricing-card {\s*background: #[A-Fa-f0-9]+;/,
    '.pricing-card {\n    background: #bce4fb;'
);

// Popular Card
content = content.replace(
    /\.pricing-card\.popular {\s*background: linear-gradient[^;]+;\s*color: #[A-Fa-f0-9]+;/,
    '.pricing-card.popular {\n    background: #a9d9f5;\n    color: #111;'
);
content = content.replace(/box-shadow: 0 20px 60px rgba\(44, 24, 16, 0\.25\);/, 'box-shadow: 0 20px 60px rgba(0, 100, 200, 0.15);');

// Header
content = content.replace(
    /\.pricing-header h2 {\s*font-family: [^;]+;\s*font-size: 1\.6rem;\s*font-weight: 700;\s*margin-bottom: 6px;\s*color: #[A-Fa-f0-9]+;/,
    '.pricing-header h2 {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n    font-size: 1.6rem;\n    font-weight: 700;\n    margin-bottom: 6px;\n    color: #111;'
);
// Subtitle
content = content.replace(/color: #8B7B74;/g, 'color: #555;');
// Price Current
content = content.replace(
    /\.price-current {\s*font-size: 2\.2rem;\s*font-weight: 800;\s*color: #C0392B;/,
    '.price-current {\n    font-size: 2.2rem;\n    font-weight: 800;\n    color: #ff3b5c;'
);
// Ticks
content = content.replace(
    /background: #C0392B;/g,
    'background: #ff3b5c;'
);
// Features text
content = content.replace(
    /color: #4A3F3A;/g,
    'color: #222;'
);

// Button
content = content.replace(
    /\.pricing-btn {\s*width: 100%;\s*margin-top: auto;\s*font-weight: 600;\s*padding: 14px;\s*border-radius: 8px;\s*font-size: 0\.95rem;\s*background: #2C1810;/,
    '.pricing-btn {\n    width: 100%;\n    margin-top: auto;\n    font-weight: 600;\n    padding: 14px;\n    border-radius: 8px;\n    font-size: 0.95rem;\n    background: #ff3b5c;'
);

// Remove popular card overrides (white text)
const overrides = [
    '.pricing-card.popular .pricing-header {\n    border-bottom-color: rgba(255,255,255,0.15);\n}',
    '.pricing-card.popular .pricing-header h2 {\n    color: #FFFFFF;\n}',
    '.pricing-card.popular .pricing-subtitle {\n    color: rgba(255,255,255,0.7);\n}',
    '.pricing-card.popular .price-strikethrough {\n    color: rgba(255,255,255,0.5);\n}',
    '.pricing-card.popular .price-current {\n    color: #FFFFFF;\n}',
    '.pricing-card.popular .price-unit {\n    color: rgba(255,255,255,0.6);\n}',
    '.pricing-card.popular .pricing-features li {\n    color: rgba(255,255,255,0.85);\n}',
    '.pricing-card.popular .pricing-features li::before {\n    background-color: rgba(255,255,255,0.2);\n}',
    '.pricing-card.popular .pricing-btn {\n    background: #FFFFFF;\n    color: #2C1810;\n}'
];

overrides.forEach(override => {
    content = content.replace(override, '/* removed */');
});

content = content.replace(
    '.pricing-card.popular .pricing-header {\r\n    border-bottom-color: rgba(255,255,255,0.15);\r\n}',
    '/* removed */'
);
// I will just use regex to remove them safely to avoid line ending issues
content = content.replace(/\.pricing-card\.popular \.pricing-header \{\s*border-bottom-color: rgba\(255,255,255,0\.15\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.pricing-header h2 \{\s*color: #FFFFFF;\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.pricing-subtitle \{\s*color: rgba\(255,255,255,0\.7\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.price-strikethrough \{\s*color: rgba\(255,255,255,0\.5\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.price-current \{\s*color: #FFFFFF;\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.price-unit \{\s*color: rgba\(255,255,255,0\.6\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.pricing-features li \{\s*color: rgba\(255,255,255,0\.85\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.pricing-features li::before \{\s*background-color: rgba\(255,255,255,0\.2\);\s*\}/, '');
content = content.replace(/\.pricing-card\.popular \.pricing-btn \{\s*background: #FFFFFF;\s*color: #2C1810;\s*\}/, '');


// Make borders fit the blue cards
content = content.replace(/border: 1px solid #E8E0DA;/g, 'border: 1px solid rgba(0, 0, 0, 0.05);');
content = content.replace(/border-bottom: 1px solid #E8E0DA;/g, 'border-bottom: 1px solid rgba(0, 0, 0, 0.05);');

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Successfully updated sections.css theme');
