const fs = require('fs');
const path = require('path');

const mediaDir = 'C:/Users/vamsi/.gemini/antigravity/brain/5095dde7-6a7b-468d-9c63-dc22bcf2d683/.tempmediaStorage';
const dest = 'C:/reelifeweddingsAG/assets/favicon.png';

const files = fs.readdirSync(mediaDir)
    .filter(f => f.endsWith('.png'))
    .map(f => ({ name: f, time: fs.statSync(path.join(mediaDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);

if (files.length > 0) {
    fs.copyFileSync(path.join(mediaDir, files[0].name), dest);
    console.log('Successfully copied latest image to favicon.png');
} else {
    console.error('No images found');
}
