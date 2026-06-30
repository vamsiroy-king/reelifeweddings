const { Jimp } = require('jimp');

async function createFavicon() {
    try {
        console.log("Loading logo.png...");
        const logo = await Jimp.read('C:/reelifeweddingsAG/assets/logo.png');
        
        console.log("Resizing logo to 512x512...");
        logo.resize({ w: 512, h: 512 });

        console.log("Creating red background...");
        // Use a solid red color, similar to the one in the user's screenshot
        const bg = new Jimp({ width: 512, height: 512, color: '#f73444' });

        console.log("Compositing...");
        bg.composite(logo, 0, 0);

        console.log("Saving to favicon.png...");
        await bg.write('C:/reelifeweddingsAG/assets/favicon.png');
        console.log("Favicon created successfully!");
    } catch (err) {
        console.error("Error creating favicon:", err);
    }
}

createFavicon();
