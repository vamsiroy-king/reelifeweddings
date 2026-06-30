const fs = require('fs');
let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

let c = 1;
// we use split and join to safely replace
let parts = html.split('src="./assets/video.mp4"');
if (parts.length > 1) {
    let newHtml = parts[0];
    for (let i = 1; i < parts.length; i++) {
        newHtml += `src="./assets/videos/reel${c}.mp4"` + parts[i];
        c = (c % 5) + 1;
    }
    fs.writeFileSync('C:/reelifeweddingsAG/index.html', newHtml, 'utf8');
    console.log('Updated html!');
} else {
    console.log('No matches found.');
}
