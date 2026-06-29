const fs = require('fs');
const path = require('path');

const dir = 'C:/reelifeweddingsAG';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. Update Header & Mobile Menu Nav Links
        content = content.replace(
            /<a href="faqs\.html" class="nav-link">Pricing (?:&|&amp;) FAQs<\/a>/g,
            '<a href="index.html#pricing" class="nav-link">Pricing</a>\n                <a href="faqs.html" class="nav-link">FAQs</a>'
        );
        
        // 2. Update Footer Links
        content = content.replace(
            /<a href="faqs\.html" style="([^"]*)">Pricing (?:&|&amp;) FAQs<\/a>/g,
            '<a href="index.html#pricing" style="$1">Pricing</a>\n            <a href="faqs.html" style="$1">FAQs</a>'
        );

        // 3. Update VIEW PACKAGES button in index.html
        if (file === 'index.html') {
            content = content.replace(
                /<a href="faqs\.html" class="btn btn-primary"/g,
                '<a href="#pricing" class="btn btn-primary"'
            );
            
            // Add id to pricing section
            content = content.replace(
                /<section class="pricing-section">/g,
                '<section class="pricing-section" id="pricing">'
            );
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', file);
    }
});
