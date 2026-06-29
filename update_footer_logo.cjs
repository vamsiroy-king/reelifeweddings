const fs = require('fs');
const htmlPath = 'C:/reelifeweddingsAG/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

htmlContent = htmlContent.replace(
    /<img src="\.\/assets\/logo\.png" alt="Reelife Weddings" style="height: 40px; margin-bottom: 20px;">/,
    '<img src="./assets/logo.png" alt="Reelife Weddings" style="height: 64px; margin-bottom: 20px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully updated footer logo');
