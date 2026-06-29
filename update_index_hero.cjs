const fs = require('fs');
const htmlPath = 'C:/reelifeweddingsAG/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const newHeroHTML = `
    <!-- ── React Hero Section ── -->
    <div id="react-hero-root"></div>
    <script type="module" src="/js/react-main.jsx"></script>
`;

htmlContent = htmlContent.replace(
    /<!-- ── Hero Coverflow Carousel ── -->[\s\S]*?(?=<!-- ── Pricing Section ── -->)/,
    newHeroHTML + '\n    '
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully updated index.html hero section.');
