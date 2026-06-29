const fs = require('fs');

const filePath = 'C:/reelifeweddingsAG/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replace Moments
content = content.replace(
    '<li>Complimentary Mobile Portraits</li>\r\n                </ul>\r\n                <div class="pricing-action">\r\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=moments\'">Select Package</button>',
    '<li>Complimentary Mobile Portraits</li>\n                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>\n                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>\n                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,499/Reel</span></li>\n                </ul>\n                <div class="pricing-action">\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=moments\'">Select Package</button>'
);

// Replace Signature
content = content.replace(
    '<li>Custom Couple Hashtag</li>\r\n                </ul>\r\n                <div class="pricing-action">\r\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=signature\'">Select Package</button>',
    '<li>Custom Couple Hashtag</li>\n                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>\n                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>\n                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹1,299/Reel</span></li>\n                </ul>\n                <div class="pricing-action">\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=signature\'">Select Package</button>'
);

// Replace Legacy
content = content.replace(
    '<li>Unlimited Instagram Highlights</li>\r\n                </ul>\r\n                <div class="pricing-action">\r\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=legacy\'">Select Package</button>',
    '<li>Unlimited Instagram Highlights</li>\n                    <li><strong>Raw Footage Delivered to Your SSD / External Drive</strong><br><em style="font-size:0.85em; color:var(--color-text-muted);">(Please provide an SSD or external storage device to receive all raw content.)</em></li>\n                    <li><strong>Official Reelife Weddings Logo is Mandatory</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">on All Delivered Content</span></li>\n                    <li><strong>Additional Professionally Edited Reels</strong><br><span style="font-size:0.85em; color:var(--color-text-muted);">Can be added at an additional cost: ₹999/Reel</span></li>\n                </ul>\n                <div class="pricing-action">\n                    <button type="button" class="pricing-btn" onclick="window.location.href=\'contact.html?package=legacy\'">Select Package</button>'
);

// Remove the standalone notes box
content = content.replace(
    /<div class="pricing-notes"[\s\S]*?<\/div>\s*<\/div>/,
    '<!-- Pricing notes moved to cards -->'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated index.html');
