const fs = require('fs');
const filePath = 'C:/reelifeweddingsAG/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Mobile Menu Logo Fix
content = content.replace(
    /<img src="\.\/assets\/logo\.png" alt="Reelife Weddings" style="height: 50px; margin-bottom: 20px; filter: brightness\(0\);">/,
    '<img src="./assets/logo.png" alt="Reelife Weddings" style="height: 50px; margin-bottom: 20px; border-radius: 4px;">'
);

// 2. Hero Section Typography and CTA Redesign
content = content.replace(
    /<h1>Your Wedding\.<br>Captured Instantly\.<\/h1>\s*<p style="margin-bottom: 24px;">We seamlessly capture the authentic joy, tears, and celebrations of your big day, delivering stunning vertical videos and reels within 24 hours\. Be fully present while we handle the memories\.<\/p>\s*<a href="#pricing" class="btn btn-primary" style="background: transparent; border: 1px solid var\(--color-primary\); color: var\(--color-primary\);">VIEW PACKAGES <i class="fas fa-arrow-right" style="margin-left: 8px;"><\/i><\/a>/,
    `<h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; font-size: clamp(3rem, 6vw, 5rem); letter-spacing: -2px; margin-bottom: 16px; line-height: 1.1;">Your Wedding.<br>Captured Instantly.</h1>
            <p style="margin-bottom: 32px; font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">We capture the authentic joy, tears, and celebrations of your big day, delivering stunning cinematic reels within 24 hours.</p>
            <a href="#pricing" class="btn btn-primary" style="background: #FFFFFF; border: none; color: #111; padding: 16px 40px; font-weight: 700; font-size: 1.05rem; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">VIEW PACKAGES <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></a>`
);

// 3. Pricing - Moments
const momentsOld = `<div class="pricing-card">
                <div class="pricing-header">
                    <h2>Moments</h2>
                    <p class="pricing-subtitle">Perfect for intimate celebrations.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹14,999</span>
                        <span class="price-current">₹9,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <ul class="pricing-features">
                    <li>Up to 5 Hours of Shoot</li>
                    <li><del style="color:#aaa; font-size:0.9em;">₹1,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                    <li>2 Professionally Edited Reels / Event</li>
                    <li>1 Same-Day Instant Reel / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(Ready to Post &amp; Share)</em></li>
                    <li>1 Dedicated Reelife Content Creator</li>
                    <li>Apple iPhone Cinematic Filmmaking</li>
                    <li>Complimentary Mobile Portraits</li>
                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,499/Reel</span></li>
                </ul>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=moments'">Select Package</button>
                </div>
            </div>`;

const momentsNew = `<div class="pricing-card">
                <div class="pricing-header">
                    <h2>Moments</h2>
                    <p class="pricing-subtitle">Perfect for intimate celebrations.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹14,999</span>
                        <span class="price-current">₹9,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=moments'">Select Package</button>
                </div>
                <div class="pricing-features-box">
                    <p class="whats-included">What's included</p>
                    <ul class="pricing-features">
                        <li>Up to 5 Hours of Shoot</li>
                        <li><del style="color:#aaa; font-size:0.9em;">₹1,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                        <li>2 Professionally Edited Reels / Event</li>
                        <li>1 Same-Day Instant Reel / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(upto 60 seconds of edit)</em></li>
                        <li>1 Dedicated Reelife Content Creator</li>
                        <li>Apple iPhone Cinematic Filmmaking</li>
                        <li>Complimentary Mobile Portraits</li>
                        <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                        <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                        <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,499/Reel</span></li>
                    </ul>
                </div>
            </div>`;

content = content.replace(momentsOld, momentsNew);

// 4. Pricing - Signature
const sigOld = `<div class="pricing-card popular">
                <div class="pricing-header">
                    <h2>Signature</h2>
                    <p class="pricing-subtitle">Crafted for elegant wedding storytelling.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹19,999</span>
                        <span class="price-current">₹14,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <ul class="pricing-features">
                    <li>Up to 5 Hours of Shoot<br><strong>Unlimited Event Coverage</strong></li>
                    <li><del style="color:#aaa; font-size:0.9em;">₹2,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                    <li>3 Professionally Edited Reels / Event</li>
                    <li>2 Same-Day Instant Reels / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(Ready to Post &amp; Share)</em></li>
                    <li>1 Dedicated Reelife Content Creator</li>
                    <li>Apple iPhone Cinematic Filmmaking</li>
                    <li>Complimentary Mobile Portraits</li>
                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,299/Reel</span></li>
                </ul>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=signature'">Select Package</button>
                </div>
            </div>`;

const sigNew = `<div class="pricing-card popular">
                <div class="pricing-badge" style="display:block; position:absolute; top:-12px; right:20px; background:#111; color:#fff; font-size:0.75rem; padding:4px 12px; border-radius:20px; font-weight:bold;">★ Bestseller</div>
                <div class="pricing-header">
                    <h2>Signature</h2>
                    <p class="pricing-subtitle">Crafted for elegant wedding storytelling.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹19,999</span>
                        <span class="price-current">₹14,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=signature'">Select Package</button>
                </div>
                <div class="pricing-features-box">
                    <p class="whats-included">What's included</p>
                    <ul class="pricing-features">
                        <li>Up to 5 Hours of Shoot<br><strong>Unlimited Event Coverage</strong></li>
                        <li><del style="color:#aaa; font-size:0.9em;">₹2,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                        <li>3 Professionally Edited Reels / Event</li>
                        <li>2 Same-Day Instant Reels / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(upto 60 seconds of edit)</em></li>
                        <li>1 Dedicated Reelife Content Creator</li>
                        <li>Apple iPhone Cinematic Filmmaking</li>
                        <li>Complimentary Mobile Portraits</li>
                        <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                        <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                        <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,299/Reel</span></li>
                    </ul>
                </div>
            </div>`;

content = content.replace(sigOld, sigNew);


// 5. Pricing - Legacy
const legOld = `<div class="pricing-card">
                <div class="pricing-header">
                    <h2>Legacy</h2>
                    <p class="pricing-subtitle">Our most complete wedding content experience.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹29,999</span>
                        <span class="price-current">₹24,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <ul class="pricing-features">
                    <li><del style="color:#aaa; font-size:0.9em;">Up to 5 Hours of Shoot</del><br><strong>Unlimited Event Coverage</strong></li>
                    <li><del style="color:#aaa; font-size:0.9em;">₹4,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                    <li>6 Professionally Edited Reels / Event</li>
                    <li>3 Same-Day Instant Reels / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(Ready to Post &amp; Share)</em></li>
                    <li>2 Dedicated Reelife Content Creators</li>
                    <li>Latest Apple iPhone Pro Series Cinematic Filmmaking<br><em style="font-size:0.85em; color:var(--color-text-muted);">(iPhone 16 Pro • iPhone 16 Pro Max • iPhone 17 Promax)</em></li>
                    <li>Advanced Drone Coverage</li>
                    <li>Complimentary Mobile Portraits</li>
                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹999/Reel</span></li>
                </ul>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=legacy'">Select Package</button>
                </div>
            </div>`;

const legNew = `<div class="pricing-card">
                <div class="pricing-header">
                    <h2>Legacy</h2>
                    <p class="pricing-subtitle">Our most complete wedding content experience.</p>
                    <div class="pricing-price">
                        <span class="price-strikethrough">₹29,999</span>
                        <span class="price-current">₹24,999</span>
                        <span class="price-unit">/ EVENT</span>
                    </div>
                </div>
                <div class="pricing-action">
                    <button type="button" class="pricing-btn" onclick="window.location.href='contact.html?package=legacy'">Select Package</button>
                </div>
                <div class="pricing-features-box">
                    <p class="whats-included">What's included</p>
                    <ul class="pricing-features">
                        <li><del style="color:#aaa; font-size:0.9em;">Up to 5 Hours of Shoot</del><br><strong>Unlimited Event Coverage</strong></li>
                        <li><del style="color:#aaa; font-size:0.9em;">₹4,999 Raw Footage</del><br>Complimentary – Included in Your Package</li>
                        <li>6 Professionally Edited Reels / Event</li>
                        <li>3 Same-Day Instant Reels / Event<br><em style="font-size:0.85em; color:var(--color-text-muted);">(upto 60 seconds of edit)</em></li>
                        <li>2 Dedicated Reelife Content Creators</li>
                        <li>Latest Apple iPhone Pro Series Cinematic Filmmaking<br><em style="font-size:0.85em; color:var(--color-text-muted);">(iPhone 16 Pro • iPhone 16 Pro Max • iPhone 17 Promax)</em></li>
                        <li>Advanced Drone Coverage</li>
                        <li>Complimentary Mobile Portraits</li>
                        <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>
                        <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>
                        <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹999/Reel</span></li>
                    </ul>
                </div>
            </div>`;

content = content.replace(legOld, legNew);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated index.html layouts');
