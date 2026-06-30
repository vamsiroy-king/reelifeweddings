const fs = require('fs');
const path = require('path');

const mediaDir = 'C:/Users/vamsi/.gemini/antigravity/brain/5095dde7-6a7b-468d-9c63-dc22bcf2d683/.tempmediaStorage';

const files = fs.readdirSync(mediaDir)
    .filter(f => f.endsWith('.png'));

function getPngDimensions(filePath) {
    const data = fs.readFileSync(filePath);
    if (data.toString('ascii', 12, 16) === 'IHDR') {
        return {
            width: data.readUInt32BE(16),
            height: data.readUInt32BE(20)
        };
    }
    return null;
}

let found = false;
files.forEach(f => {
    const dim = getPngDimensions(path.join(mediaDir, f));
    if (dim && Math.abs(dim.width - dim.height) < 100) { // Square-ish
        console.log(`Square image found: ${f} - ${dim.width}x${dim.height} - ${fs.statSync(path.join(mediaDir, f)).size} bytes`);
        found = true;
    }
});

if (!found) console.log("No square images found.");
