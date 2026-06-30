const fs = require('fs');

let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// The original hero section from lines 59 to 102
html = html.replace(
    /<!-- ── Hero Coverflow Carousel ── -->[\s\S]*?<\/section>/,
    '<!-- ── React Hero Section ── -->\n    <div id="react-hero-root"></div>'
);

fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Reverted index.html back to using React Hero Root.');
