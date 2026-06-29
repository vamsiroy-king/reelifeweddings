const fs = require('fs');

const cssPath = 'C:/reelifeweddingsAG/css/sections.css';
let content = fs.readFileSync(cssPath, 'utf8');

const newCSS = `.pricing-section {
    padding: 100px 24px;
    background: #FDF8F4;
}

.pricing-section .section-header {
    margin-bottom: 60px;
}

.pricing-section .section-title {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
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
    gap: 0;
}

@media (max-width: 900px) {
    .pricing-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}

.pricing-card {
    background: transparent;
    padding: 20px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    border: none;
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
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
    color: #111;
}

.pricing-subtitle {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
}

.pricing-price {
    margin-top: 24px;
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

.pricing-features {
    list-style: none;
    margin-bottom: 40px;
    flex-grow: 1;
}

.pricing-features li {
    padding: 10px 0;
    font-size: 0.95rem;
    text-align: left;
    color: #222;
    display: block;
    position: relative;
    padding-left: 36px;
    line-height: 1.5;
}

.pricing-features li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 22px;
    height: 22px;
    min-width: 22px;
    border-radius: 50%;
    background: #ff3b5c;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='14' height='14'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px;
}

.pricing-btn {
    width: 100%;
    margin-top: auto;
    font-weight: 600;
    padding: 16px;
    border-radius: 40px;
    font-size: 1rem;
    background: #111;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

.pricing-btn:hover {
    transform: scale(1.02);
    opacity: 0.9;
}

`;

// We'll replace everything between `.pricing-section {` and `.pricing-notes {`
const startIdx = content.indexOf('.pricing-section {');
const endIdx = content.indexOf('.pricing-notes {');

if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx);
    content = before + newCSS + after;
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully applied minimal Apple theme.');
} else {
    console.log('Could not find boundaries.');
}
