const fs = require('fs');
const { execSync } = require('child_process');

try {
    const oldHtml = execSync('git show c0c70eb:index.html', {encoding: 'utf8'});
    let currentHtml = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

    const startIndex = oldHtml.indexOf('<!-- ── Pricing Section ── -->');
    const endIndex = oldHtml.indexOf('<!-- ── Solid Red Footer ── -->');

    if (startIndex !== -1 && endIndex !== -1) {
        const oldSections = oldHtml.substring(startIndex, endIndex);

        const currentStartIndex = currentHtml.indexOf('<!-- ── React Pricing Section ── -->');
        const currentEndIndex = currentHtml.indexOf('<!-- ── Solid Red Footer ── -->');

        if (currentStartIndex !== -1 && currentEndIndex !== -1) {
            currentHtml = currentHtml.substring(0, currentStartIndex) + oldSections + currentHtml.substring(currentEndIndex);
            fs.writeFileSync('C:/reelifeweddingsAG/index.html', currentHtml, 'utf8');
            console.log('Restored old HTML pricing successfully.');
        } else {
            console.log('Could not find boundaries in current html');
        }
    } else {
        console.log('Could not find boundaries in old html from git');
    }
} catch (e) {
    console.error(e);
}
