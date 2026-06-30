const fs = require('fs');

const oldHtml = fs.readFileSync('C:/reelifeweddingsAG/old_index_utf8.html', 'utf8');
let currentHtml = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// Extract hero section from old HTML
const heroMatch = oldHtml.match(/<!-- ── Hero Coverflow Carousel ── -->[\s\S]*?<\/section>/);
if (!heroMatch) {
    console.error('Could not find hero section in old HTML');
    process.exit(1);
}

const originalHero = heroMatch[0];

// Replace in current HTML
currentHtml = currentHtml.replace(
    /<!-- ── React Hero Section ── -->[\s\S]*?<div id="react-hero-root"><\/div>/,
    originalHero
);

fs.writeFileSync('C:/reelifeweddingsAG/index.html', currentHtml, 'utf8');
console.log('Successfully restored original Hero section in index.html');
