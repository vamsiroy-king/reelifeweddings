const fs = require('fs');
const cssPath = 'C:/reelifeweddingsAG/css/sections.css';
let content = fs.readFileSync(cssPath, 'utf8');

// The new box-in-box pricing styles
const newCSS = `.pricing-section {
    padding: 100px 24px;
    background: #FFFFFF;
}

.pricing-section .section-header {
    margin-bottom: 60px;
}

.pricing-section .section-title {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    font-style: normal;
    letter-spacing: -1px;
    color: #111;
    text-align: center;
}

.pricing-container {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}

@media (max-width: 900px) {
    .pricing-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}

.pricing-card {
    background: #FCF8F5;
    padding: 32px 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

.pricing-card.popular {
    background: #FDF1EA; /* Slightly warmer for popular */
    box-shadow: 0 15px 40px rgba(0,0,0,0.06);
}

.pricing-badge {
    display: none;
}

.pricing-header {
    text-align: left;
    margin-bottom: 24px;
    padding-bottom: 0px;
    border-bottom: none;
}

.pricing-header h2 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    text-transform: uppercase;
    color: #111;
}

.pricing-subtitle {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
}

.pricing-price {
    margin-top: 16px;
    display: flex;
    align-items: baseline;
    gap: 6px;
}

.price-strikethrough {
    font-size: 1rem;
    color: #999;
    text-decoration: line-through;
    display: block;
    margin-bottom: 2px;
}

.price-current {
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: -1.5px;
    color: #ff3b5c;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
}

.price-unit {
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
}

.pricing-action {
    margin-bottom: 24px;
}

.pricing-btn {
    width: 100%;
    font-weight: 700;
    padding: 16px;
    border-radius: 40px;
    font-size: 1.05rem;
    background: #111;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

.pricing-btn:hover {
    transform: scale(1.02);
    opacity: 0.9;
}

.pricing-card.popular .pricing-btn {
    background: #ff3b5c;
}
.pricing-card.popular .pricing-btn:hover {
    background: #e02f4d;
}

.pricing-features-box {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    flex-grow: 1;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.whats-included {
    font-weight: 700;
    color: #333;
    font-size: 0.95rem;
    margin-bottom: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

.pricing-features {
    list-style: none;
    margin-bottom: 0;
}

.pricing-features li {
    padding: 8px 0;
    font-size: 0.9rem;
    text-align: left;
    color: #444;
    display: block;
    position: relative;
    padding-left: 28px;
    line-height: 1.5;
    min-height: 48px;
}

.pricing-features li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid #ff3b5c;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff3b5c' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' width='10' height='10'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
}
`;

const startIdx = content.indexOf('.pricing-section {');
const endIdx = content.indexOf('.pricing-notes {');

if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    content = before + newCSS + after;
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully applied box-in-box minimal pricing theme.');
} else {
    console.log('Could not find boundaries.');
}
