const fs = require('fs');

const htmlPath = 'C:/reelifeweddingsAG/contact.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const newReceiptHTML = `
                <!-- Live Quotation Receipt -->
                <div class="quotation-receipt" id="quotationReceipt" style="display: none;">
                    <div class="ticket-header">
                        <h3>Live Quotation Ticket</h3>
                    </div>
                    <div class="ticket-body">
                        <div class="receipt-row">
                            <span class="receipt-label">Selected Package:</span>
                            <span class="receipt-value" id="receiptPackageName">-</span>
                        </div>
                        <div class="receipt-row">
                            <span class="receipt-label">Base Price / Event:</span>
                            <span class="receipt-value" id="receiptBasePrice">₹0</span>
                        </div>
                        <div class="receipt-row">
                            <span class="receipt-label">Total Events:</span>
                            <span class="receipt-value" id="receiptEventCount">0</span>
                        </div>
                        
                        <div class="receipt-divider"></div>
                        
                        <div class="receipt-row receipt-total-row">
                            <span class="receipt-label">Total Quotation</span>
                            <span class="receipt-value receipt-total-price" id="receiptTotalPrice">₹0</span>
                        </div>
                        <p class="receipt-disclaimer">
                            *Note: Additional professionally edited reels and any customisations will be at an additional cost.
                        </p>
                    </div>
                </div>
`;

// Replace the old quotation-receipt div
htmlContent = htmlContent.replace(
    /<!-- Live Quotation Receipt -->[\s\S]*?<\/div>\s+<button type="submit"/,
    newReceiptHTML + '\n                <button type="submit"'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully updated contact.html ticket HTML');
