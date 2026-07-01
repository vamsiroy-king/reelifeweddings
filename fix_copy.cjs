const fs = require('fs');

let html = fs.readFileSync('C:/reelifeweddingsAG/index.html', 'utf8');

// 1. Rewrite the hero text to be unique
html = html.replace("India's Best", "Your Big Day.");
html = html.replace("- WEDDING CONTENT CREATORS -", "- CAPTURED INSTANTLY -");
html = html.replace("We specialize in live social media coverage of your wedding with stunning reels, engaging stories, and curated posts. Our team provides professional editing and personalized content, ensuring your celebration shines online. Let's make every moment shareable, memorable & uniquely yours!", "We transform your wedding into stunning cinematic reels and engaging social media stories delivered within 24 hours. From intimate glances to grand celebrations, our dedicated team ensures every magical moment is beautifully documented and ready to share with the world.");

// 2. Remove strikeouts in pricing
// Moments Package
html = html.replace('<li><del style="color:#aaa; font-size:0.9em;">₹1,999 Raw Footage</del><br>Complimentary - Included in Your Package</li>', '<li>Complimentary Raw Footage Included</li>');

// Signature Package
html = html.replace('<li><del style="color:#aaa; font-size:0.9em;">Up to 5 Hours of Shoot</del><br><strong>Unlimited Event Coverage</strong></li>', '<li><strong>Unlimited Event Coverage</strong></li>');
html = html.replace('<li><del style="color:#aaa; font-size:0.9em;">₹2,999 Raw Footage</del><br>Complimentary - Included in Your Package</li>', '<li>Complimentary Raw Footage Included</li>');

// Legacy Package
// (Notice: it appears a second time for Legacy)
html = html.replace('<li><del style="color:#aaa; font-size:0.9em;">Up to 5 Hours of Shoot</del><br><strong>Unlimited Event Coverage</strong></li>', '<li><strong>Unlimited Event Coverage</strong></li>');
html = html.replace('<li><del style="color:#aaa; font-size:0.9em;">₹4,999 Raw Footage</del><br>Complimentary - Included in Your Package</li>', '<li>Complimentary Raw Footage Included</li>');


fs.writeFileSync('C:/reelifeweddingsAG/index.html', html, 'utf8');
console.log('Fixed copywriting and removed strikeouts!');
