const fs = require('fs');
const path = require('path');

const seoMeta = `    <title>Reelife Weddings | India's Premier Wedding Content Creators</title>
    <meta name="description" content="Reelife Weddings is India's top-recognized and premier wedding content creation team. We capture your special day with premium iPhone cinematic filmmaking and instant same-day reels.">
    <meta name="keywords" content="wedding content creators in india, best wedding content creators, premier wedding works, premium wedding content, instant wedding reels, Reelife Weddings">
    <link rel="icon" type="image/png" href="./assets/favicon.png">`;

const files = [
    'index.html',
    'portfolio.html',
    'about.html',
    'services.html',
    'contact.html',
    'faqs.html',
    'memory-vault-demo.html'
];

files.forEach(file => {
    const filePath = path.join('C:/reelifeweddingsAG', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing title
        content = content.replace(/<title>.*?<\/title>\s*/i, '');
        // Remove existing description
        content = content.replace(/<meta name="description".*?>\s*/i, '');
        // Remove existing keywords
        content = content.replace(/<meta name="keywords".*?>\s*/i, '');
        // Remove existing icon
        content = content.replace(/<link rel="icon".*?>\s*/i, '');

        // Inject new SEO meta just after <head>
        content = content.replace(/<head>/i, `<head>\n${seoMeta}`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated SEO for ${file}`);
    }
});
