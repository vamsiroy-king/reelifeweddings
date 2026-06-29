const fs = require('fs');

// 1. Fix main.js double encoding issue
const jsPath = 'C:/reelifeweddingsAG/js/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

// The issue: msg contains `%0A`, and then encodeURIComponent encodes the `%` to `%25`
// We need to change all `%0A` to `\n` in the message building string.
jsContent = jsContent.replace(/%0A/g, '\\n');

fs.writeFileSync(jsPath, jsContent, 'utf8');


// 2. Update contact.html contact options below the button
const htmlPath = 'C:/reelifeweddingsAG/contact.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const newContactHTML = `
                <button type="submit" class="booking-submit-btn">
                    Send Booking via WhatsApp <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i>
                </button>

                <div class="booking-contact-options" style="margin-top: 32px; padding: 24px; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); text-align: center;">
                    <h4 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 8px; color: #111;">Send the details, our team will reach out to you soon!</h4>
                    <p style="color: #666; font-size: 0.95rem; margin-bottom: 24px;">For any urgency, feel free to contact us through any of the options below:</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
                        <!-- Phone / WhatsApp -->
                        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
                            <a href="https://wa.me/916303560330" style="display: inline-flex; align-items: center; gap: 8px; color: #25D366; text-decoration: none; font-weight: 600; font-size: 1rem; background: rgba(37, 211, 102, 0.1); padding: 8px 16px; border-radius: 40px;">
                                <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> +91 63035 60330
                            </a>
                            <a href="https://wa.me/919148132417" style="display: inline-flex; align-items: center; gap: 8px; color: #25D366; text-decoration: none; font-weight: 600; font-size: 1rem; background: rgba(37, 211, 102, 0.1); padding: 8px 16px; border-radius: 40px;">
                                <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> +91 91481 32417
                            </a>
                        </div>
                        
                        <!-- Email -->
                        <a href="mailto:helloreelifeweddings@gmail.com" style="display: inline-flex; align-items: center; gap: 8px; color: #EA4335; text-decoration: none; font-weight: 600; font-size: 1rem; background: rgba(234, 67, 53, 0.1); padding: 8px 24px; border-radius: 40px;">
                            <i class="fas fa-envelope" style="font-size: 1.1rem;"></i> helloreelifeweddings@gmail.com
                        </a>
                        
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/reelifeweddings" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #E1306C; text-decoration: none; font-weight: 600; font-size: 1rem; background: rgba(225, 48, 108, 0.1); padding: 8px 32px; border-radius: 40px;">
                            <i class="fab fa-instagram" style="font-size: 1.2rem;"></i> @reelifeweddings
                        </a>
                    </div>
                </div>
`;

// Replace the old button + text
htmlContent = htmlContent.replace(
    /<button type="submit" class="booking-submit-btn">[\s\S]*?<\/div>\s*<\/form>/,
    newContactHTML + '\n            </form>'
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Successfully applied bug fix and contact UI.');
