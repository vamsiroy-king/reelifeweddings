const fs = require('fs');
const path = require('path');

const newFooter = `<footer class="footer-solid" style="background:#FAFAFA; color: #111; padding: 60px 24px; border-top: 1px solid #eaeaea;">
    <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto;">
        
        <!-- Brand & About -->
        <div class="footer-brand" style="text-align: left;">
            <img src="./assets/logo.png" alt="Reelife Weddings" style="height: 40px; margin-bottom: 20px;">
            <p style="color: #555; font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">
                India's Best Wedding Content Creators. We seamlessly capture the authentic joy, tears, and celebrations of your big day.
            </p>
            <div class="social-links" style="display: flex; gap: 15px;">
                <a href="https://www.instagram.com/reelifeweddings" target="_blank" style="color:#111; font-size: 1.2rem; transition: color 0.3s;"><i class="fab fa-instagram"></i></a>
                <a href="#" style="color:#111; font-size: 1.2rem; transition: color 0.3s;"><i class="fab fa-facebook-f"></i></a>
                <a href="#" style="color:#111; font-size: 1.2rem; transition: color 0.3s;"><i class="fab fa-youtube"></i></a>
            </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links-col" style="text-align: left;">
            <h4 style="font-size: 1.1rem; margin-bottom: 20px; font-weight: 600; font-family: var(--font-display);">Quick Links</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="index.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">Home</a>
                <a href="about.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">About Us</a>
                <a href="services.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">Services</a>
                <a href="portfolio.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">Portfolio</a>
                <a href="faqs.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">Pricing & FAQs</a>
                <a href="contact.html" style="color: #555; text-decoration: none; font-size: 0.9rem; transition: color 0.3s;">Book Now</a>
            </div>
        </div>

        <!-- Contact Details -->
        <div class="footer-contact-col" style="text-align: left;">
            <h4 style="font-size: 1.1rem; margin-bottom: 20px; font-weight: 600; font-family: var(--font-display);">Contact Us</h4>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <p style="color: #555; font-size: 0.9rem; display: flex; align-items: flex-start; gap: 10px; margin: 0;">
                    <i class="fas fa-map-marker-alt" style="margin-top: 4px; color: var(--color-primary);"></i>
                    <span>Based in Bangalore<br>Available across India & Globally</span>
                </p>
                <p style="color: #555; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; margin: 0;">
                    <i class="fas fa-phone-alt" style="color: var(--color-primary);"></i>
                    <a href="tel:+919148132417" style="color: #555; text-decoration: none;">+91 91481 32417</a>
                </p>
                <p style="color: #555; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; margin: 0;">
                    <i class="fas fa-envelope" style="color: var(--color-primary);"></i>
                    <a href="mailto:reelifeweddings@gmail.com" style="color: #555; text-decoration: none;">reelifeweddings@gmail.com</a>
                </p>
                <a href="https://wa.me/919148132417" target="_blank" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; text-decoration: none; text-align: center; margin-top: 10px; font-size: 0.9rem; width: fit-content;">
                    <i class="fab fa-whatsapp" style="margin-right: 8px;"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    </div>
    
    <div class="footer-bottom" style="max-width: 1200px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #888; font-size: 0.85rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <p style="margin:0;">&copy; 2026 Reelife Weddings. All Rights Reserved.</p>
        <div style="display: flex; gap: 15px;">
            <a href="#" style="color: #888; text-decoration: none;">Privacy Policy</a>
            <a href="#" style="color: #888; text-decoration: none;">Terms of Service</a>
        </div>
    </div>
</footer>`;

const dir = 'C:/reelifeweddingsAG';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let updated = content.replace(/<footer class="footer-solid"[\s\S]*?<\/footer>/, newFooter);
        updated = updated.replace(/<footer class="vault-footer"[\s\S]*?<\/footer>/, newFooter);
        
        if (updated !== content) {
            fs.writeFileSync(filePath, updated, 'utf8');
            console.log('Updated', file);
        }
    }
});
