const fs = require('fs');

// 1. Update contact.html
const htmlPath = 'C:/reelifeweddingsAG/contact.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

htmlContent = htmlContent.replace(
    /<h3>Live Quotation Ticket<\/h3>/,
    '<h3>Your Wedding Details</h3>'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');


// 2. Update components.css
const cssPath = 'C:/reelifeweddingsAG/css/components.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const invitationCSS = `
/* ── Live Quotation Invitation Design ── */
.quotation-receipt {
    background: #c3e2dc;
    border: 8px solid #c3e2dc;
    outline: 1.5px solid #D4AF37;
    outline-offset: -8px;
    border-radius: 4px;
    padding: 0;
    margin-top: 32px;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
}

.ticket-header {
    background: transparent;
    padding: 40px 24px 20px 24px;
    text-align: center;
    border-bottom: none;
}

.ticket-header h3 {
    margin: 0;
    font-size: 2.2rem;
    font-family: "Georgia", "Times New Roman", serif;
    font-style: italic;
    color: #3b5062;
    border: none;
    padding: 0;
}

.ticket-body {
    padding: 0 32px 40px 32px;
    background: transparent;
    position: relative;
}

/* Remove cutout circles */
.ticket-body::before, .ticket-body::after {
    display: none;
}

.receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 1.05rem;
    color: #2b3945;
}

.receipt-label {
    font-weight: 500;
    font-family: "Georgia", serif;
}

.receipt-value {
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.receipt-divider {
    height: 0;
    border-top: 1.5px solid rgba(212, 175, 55, 0.5);
    margin: 24px 0;
}

.receipt-total-row {
    margin-bottom: 0;
    background: rgba(255, 255, 255, 0.4);
    padding: 16px 20px;
    border-radius: 4px;
    border: 1px solid rgba(212, 175, 55, 0.4);
}

.receipt-total-row .receipt-label {
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
    font-family: -apple-system, sans-serif;
    color: #111;
    font-style: normal;
}

.receipt-total-price {
    font-size: 1.8rem;
    color: #d1304d;
    font-weight: 900;
}

.receipt-disclaimer {
    font-size: 0.85rem;
    color: #4a5c6a;
    line-height: 1.5;
    margin-top: 24px;
    font-style: italic;
    text-align: center;
    font-family: "Georgia", serif;
}
`;

// Replace the old Ticket CSS block with the new Invitation CSS block
cssContent = cssContent.replace(/\/\* ── Live Quotation Ticket Design ── \*\/[\s\S]*?(?=\/\* Custom Event Chip Delete Button \*\/)/, invitationCSS);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Successfully applied Invitation UI design.');
