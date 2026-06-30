const fs = require('fs');
const { execSync } = require('child_process');

try {
    const oldHtml = execSync('git show c0c70eb:index.html', {encoding: 'utf8'});
    let currentHtml = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

    const startIndex = oldHtml.indexOf('<!-- ── Hero Coverflow Carousel ── -->');
    const endIndex = oldHtml.indexOf('<!-- ── Pricing Section ── -->');

    if (startIndex !== -1 && endIndex !== -1) {
        let oldHeroSection = oldHtml.substring(startIndex, endIndex);

        // Modify the old hero section to use video in the swiper slides!
        // We will replace all 10 images with 10 video tags using our assets/video.mp4
        oldHeroSection = oldHeroSection.replace(
            /<div class="swiper-slide">\s*<img src="https:\/\/images\.unsplash\.com\/photo-[^>]+>\s*<\/div>/g,
            `<div class="swiper-slide">
                <video src="./assets/video.mp4" autoPlay loop muted playsInline style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;"></video>
            </div>`
        );

        // Current html uses react hero
        const currentStartIndex = currentHtml.indexOf('<div id="react-hero-root"></div>');
        // Let's just find where react hero div ends, or we just replace the whole thing.
        // Wait, the current html structure around React Hero is:
        /*
        <!-- ── React Hero Section ── -->
        <div id="react-hero-root"></div>
        */
        
        const reactHeroStart = currentHtml.indexOf('<!-- ── React Hero Section ── -->');
        const reactHeroEnd = currentHtml.indexOf('<!-- ── Pricing Section ── -->');

        if (reactHeroStart !== -1 && reactHeroEnd !== -1) {
            currentHtml = currentHtml.substring(0, reactHeroStart) + oldHeroSection + currentHtml.substring(reactHeroEnd);
            
            // We also need to remove the react-main script from the bottom
            currentHtml = currentHtml.replace(/<script type="module" src="\/js\/react-main\.jsx"><\/script>\s*/, '');

            fs.writeFileSync('C:/reelifeweddingsAG/index.html', currentHtml, 'utf8');
            console.log('Restored and modified old Hero Carousel successfully.');
        } else {
            console.log('Could not find boundaries in current html');
        }
    } else {
        console.log('Could not find boundaries in old html from git');
    }
} catch (e) {
    console.error(e);
}
