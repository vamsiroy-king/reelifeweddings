const fs = require('fs');
const files = fs.readdirSync('C:/reelifeweddingsAG').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const path = `C:/reelifeweddingsAG/${file}`;
    let content = fs.readFileSync(path, 'utf8');
    if (content.includes('./assets/logo.png')) {
        content = content.replace(/\.\/assets\/logo\.png/g, './assets/favicon.png');
        fs.writeFileSync(path, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
