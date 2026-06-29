const fs = require('fs');
const htmlPath = 'C:/reelifeweddingsAG/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const newPricingHTML = `
    <!-- ── React Pricing Section ── -->
    <div id="react-pricing-root"></div>
`;

// Replace the existing pricing section (from <section class="pricing-section"... to </section>)
htmlContent = htmlContent.replace(
    /<section class="pricing-section" id="pricing">[\s\S]*?<!-- Pricing notes moved to cards -->\s*<\/section>/,
    newPricingHTML
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully updated index.html pricing section.');
