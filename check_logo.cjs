const fs = require('fs');

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

const dim = getPngDimensions('C:/reelifeweddingsAG/assets/logo.png');
console.log(`logo.png dimensions: ${dim ? dim.width + 'x' + dim.height : 'Unknown'}`);
