const fs = require('fs');

// 1. Fix JS WhatsApp Encoding and Text
const jsPath = 'C:/reelifeweddingsAG/js/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

jsContent = jsContent.replace(/msg \+= `\*Client Details\*%0A`;/g, 'msg += `*Couple Details*%0A`;');
jsContent = jsContent.replace(/msg \+= `\*Selected Events & Dates\*%0A`;/g, 'msg += `*Selected Events and Dates*%0A`;');

// Fix the URL encoding which broke on the '&' symbol
jsContent = jsContent.replace(
    /const url = `https:\/\/wa\.me\/919148132417\?text=\$\{msg\.replace\(\/ \/g, '%20'\)\}`;/,
    'const url = `https://wa.me/919148132417?text=${encodeURIComponent(msg)}`;'
);

fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Update contact.html to add the contact text below the button
const htmlPath = 'C:/reelifeweddingsAG/contact.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const contactInfoHTML = `
                <button type="submit" class="booking-submit-btn">
                    Send Booking via WhatsApp <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>
                </button>
                <div style="text-align: center; margin-top: 16px; font-size: 0.9rem; color: #666; line-height: 1.5;">
                    <p>Send the details and our team will reach out to you soon!</p>
                    <p style="margin-top: 4px;">For any urgency, feel free to call or WhatsApp us at <a href="tel:+919148132417" style="color: #ff3b5c; font-weight: 600; text-decoration: none;">+91 91481 32417</a></p>
                </div>
`;

htmlContent = htmlContent.replace(
    /<button type="submit" class="booking-submit-btn">[\s\S]*?<\/button>/,
    contactInfoHTML
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');

// 3. Update CSS to make the receipt look like a Ticket
const cssPath = 'C:/reelifeweddingsAG/css/components.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const ticketCSS = `
/* ── Live Quotation Ticket Design ── */
.quotation-receipt {
    background: #fff;
    border-radius: 12px;
    padding: 0;
    margin-top: 32px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
    /* Ticket cutout effect using mask or radial gradient */
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.05));
}

.ticket-header {
    background: #111;
    color: #fff;
    padding: 20px 24px;
    text-align: center;
    border-bottom: 2px dashed #444;
}

.ticket-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-family: var(--font-display);
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #fff;
    border: none;
    padding: 0;
}

.ticket-body {
    padding: 24px;
    background: #fff;
    position: relative;
}

/* The cutout circles on the sides for the ticket look */
.ticket-body::before, .ticket-body::after {
    content: '';
    position: absolute;
    top: -12px;
    width: 24px;
    height: 24px;
    background: #FDF8F4; /* Matches form background to look like a cutout */
    border-radius: 50%;
}
.ticket-body::before {
    left: -12px;
}
.ticket-body::after {
    right: -12px;
}

.receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 1rem;
}

.receipt-label {
    color: #555;
    font-weight: 500;
}

.receipt-value {
    color: #111;
    font-weight: 700;
}

.receipt-divider {
    height: 0;
    border-top: 2px dashed #eee;
    margin: 20px 0;
}

.receipt-total-row {
    margin-bottom: 0;
    background: #FFF8F9;
    padding: 16px;
    border-radius: 8px;
}

.receipt-total-row .receipt-label {
    font-size: 1.1rem;
    color: #111;
    font-weight: 800;
    text-transform: uppercase;
}

.receipt-total-price {
    font-size: 1.6rem;
    color: #ff3b5c;
    font-weight: 900;
}

.receipt-disclaimer {
    font-size: 0.8rem;
    color: #888;
    line-height: 1.5;
    margin-top: 20px;
    font-style: italic;
    text-align: center;
}
`;

// Replace the old CSS
cssContent = cssContent.replace(/\/\* ── Live Quotation Receipt ── \*\/[\s\S]*?(?=\/\* Custom Event Chip Delete Button \*\/)/, ticketCSS);
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Successfully applied fixes.');
