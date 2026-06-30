const fs = require('fs');
let css = fs.readFileSync('C:/reelifeweddingsAG/css/components.css', 'utf8');

const newCss = `.quotation-receipt {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 0;
    margin-top: 32px;
    margin-bottom: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
    position: relative;
    overflow: hidden;
}

.ticket-header {
    background: transparent;
    padding: 40px 32px 24px 32px;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,0.04);
}

.ticket-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-family: var(--font-display), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #1d1d1f;
    border: none;
    padding: 0;
}

.ticket-body {
    padding: 32px 32px 40px 32px;
    background: transparent;
    position: relative;
}

.ticket-body::before, .ticket-body::after {
    display: none;
}

.receipt-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1d1d1f;
}

.receipt-label {
    font-weight: 400;
    color: #86868b;
}

.receipt-value {
    font-weight: 500;
    text-align: right;
    color: #1d1d1f;
}

.receipt-divider {
    border-top: 1px solid rgba(0,0,0,0.06);
    margin: 24px 0;
}

.receipt-total-row {
    font-size: 1.25rem;
    color: #1d1d1f;
    font-weight: 600;
    margin-bottom: 24px;
}

.receipt-total-price {
    color: #1d1d1f;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.receipt-disclaimer {
    font-size: 0.8rem;
    color: #86868b;
    text-align: center;
    line-height: 1.4;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}`;

const startIndex = css.lastIndexOf('/*', css.indexOf('.quotation-receipt {'));
const endIndexStr = '.receipt-disclaimer {';
const indexOfDis = css.indexOf(endIndexStr);

if (startIndex !== -1 && indexOfDis !== -1) {
    const endIndex = css.indexOf('}', indexOfDis) + 1;
    css = css.substring(0, startIndex) + "/* Premium Quotation */\n" + newCss + css.substring(endIndex);
    fs.writeFileSync('C:/reelifeweddingsAG/css/components.css', css, 'utf8');
    console.log("Updated components.css successfully.");
} else {
    console.log("Failed to find bounds.");
}
