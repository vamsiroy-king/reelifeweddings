const fs = require('fs');

// 1. Update contact.html to add Receipt HTML just above the submit button
const htmlPath = 'C:/reelifeweddingsAG/contact.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const receiptHTML = `
                <!-- Live Quotation Receipt -->
                <div class="quotation-receipt" id="quotationReceipt" style="display: none;">
                    <h3 class="receipt-title">Live Quotation Summary</h3>
                    <div class="receipt-row">
                        <span class="receipt-label">Selected Package:</span>
                        <span class="receipt-value" id="receiptPackageName">-</span>
                    </div>
                    <div class="receipt-row">
                        <span class="receipt-label">Base Price (Per Event):</span>
                        <span class="receipt-value" id="receiptBasePrice">₹0</span>
                    </div>
                    <div class="receipt-row">
                        <span class="receipt-label">Total Events Selected:</span>
                        <span class="receipt-value" id="receiptEventCount">0</span>
                    </div>
                    
                    <div class="receipt-divider"></div>
                    
                    <div class="receipt-row receipt-total-row">
                        <span class="receipt-label">Estimated Total Quotation:</span>
                        <span class="receipt-value receipt-total-price" id="receiptTotalPrice">₹0</span>
                    </div>
                    <p class="receipt-disclaimer">
                        *Note: Additional professionally edited reels and any customisations will be at an additional cost.
                    </p>
                </div>
`;

// Insert just before the submit button
htmlContent = htmlContent.replace(
    /<button type="submit" class="booking-submit-btn">/,
    receiptHTML + '\n                <button type="submit" class="booking-submit-btn">'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');


// 2. Add Receipt CSS to components.css
const cssPath = 'C:/reelifeweddingsAG/css/components.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

const receiptCSS = `
/* ── Live Quotation Receipt ── */
.quotation-receipt {
    background: #FDF8F4;
    border: 1px solid #E8E0DA;
    border-radius: 12px;
    padding: 24px;
    margin-top: 32px;
    margin-bottom: 24px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.receipt-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: #111;
    margin-bottom: 16px;
    border-bottom: 1px dashed #CCC;
    padding-bottom: 12px;
}

.receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 0.95rem;
}

.receipt-label {
    color: #555;
    font-weight: 500;
}

.receipt-value {
    color: #111;
    font-weight: 600;
}

.receipt-divider {
    height: 1px;
    background: #E8E0DA;
    margin: 16px 0;
}

.receipt-total-row {
    margin-bottom: 16px;
}

.receipt-total-row .receipt-label {
    font-size: 1.1rem;
    color: #111;
    font-weight: 700;
}

.receipt-total-price {
    font-size: 1.4rem;
    color: #ff3b5c;
    font-weight: 800;
}

.receipt-disclaimer {
    font-size: 0.8rem;
    color: #888;
    line-height: 1.4;
    margin-top: 16px;
    font-style: italic;
}

/* Custom Event Chip Delete Button */
.event-chip.custom-chip {
    padding-right: 12px; /* make room for delete btn */
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.chip-delete-btn {
    background: transparent;
    border: none;
    color: inherit;
    opacity: 0.6;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0 4px;
    transition: opacity 0.2s;
}
.chip-delete-btn:hover {
    opacity: 1;
    color: #ff3b5c;
}
`;

cssContent = cssContent + '\n' + receiptCSS;
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Successfully added Receipt HTML and CSS.');
