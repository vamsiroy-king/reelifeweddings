import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const new_head_content = `    <!-- Core CSS -->
    <link rel="stylesheet" href="/css/variables.css">
    <link rel="stylesheet" href="/css/global.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/sections.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`;

const new_header_content = `    <!-- ── Header ── -->
    <div class="header-wrapper">
        <header class="header-main" id="mainHeader">
            <nav class="nav-group left" style="flex:1;">
                <a href="index.html" class="nav-link active">Home</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
            </nav>
            
            <div class="nav-logo-container" style="flex:1; text-align:center;">
                <a href="index.html">
                    <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" class="nav-logo">
                </a>
            </div>

            <nav class="nav-group right" style="flex:1; justify-content:flex-end;">
                <a href="faqs.html" class="nav-link">Pricing</a>
                <a href="contact.html" class="nav-link">Book Now</a>
            </nav>
            
            <button class="mobile-toggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" style="height: 50px; margin-bottom: 20px;">
        <a href="index.html" class="nav-link active">Home</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="faqs.html" class="nav-link">Pricing</a>
        <a href="contact.html" class="nav-link">Book Now</a>
    </div>`;

const new_footer_content = `    <!-- ── ReelOnGo Style Footer ── -->
    <footer class="footer-solid">
        <div class="footer-watermark">Reelife</div>
        
        <div class="footer-grid">
            <div class="footer-brand">
                <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" class="footer-logo" style="filter: brightness(0) invert(1);">
                <p>Instant content, zero hassle. Shot. Edited. Delivered - before your event ends.</p>
                <div style="margin-bottom: 24px;">
                    <strong style="display:block; margin-bottom:8px; font-size:0.9rem;">Follow Us</strong>
                    <div class="footer-socials">
                        <a href="https://www.instagram.com/reelifeweddings" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="footer-heading">Quick Links</h4>
                <div class="footer-links">
                    <a href="faqs.html">Pricing</a>
                    <a href="services.html">Services</a>
                    <a href="#">Process</a>
                    <a href="#">Testimonials</a>
                    <a href="faqs.html">FAQs</a>
                </div>
            </div>
            
            <div>
                <h4 class="footer-heading">Learn More</h4>
                <div class="footer-links">
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Cancellations & Refund</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
            
            <div class="footer-contact">
                <h4 class="footer-heading">Contact</h4>
                <p><i class="far fa-envelope"></i> reelifeweddings@gmail.com</p>
                <p><i class="fas fa-phone-alt"></i> +91 91481 32417</p>
                <p><i class="fas fa-map-marker-alt"></i> Based in Bangalore<br>Available across India</p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <span>© 2026 Reelife Weddings. All rights reserved.</span>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script type="module" src="/js/main.js"></script>
</body>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    if (['index.html'].includes(f)) return; // skip index

    let content = fs.readFileSync(path.join(__dirname, f), 'utf8');

    // 1. Replace head
    content = content.replace(/<!-- Core CSS -->[\s\S]*?<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+">/, new_head_content);
    
    // Ensure Swiper CSS is in head
    if (!content.includes('swiper-bundle.min.css')) {
        content = content.replace(/<\/head>/, '    <!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');
    }

    // 2. Replace Header
    content = content.replace(/<!-- ── Header .*?<\/div>\s*<\/div>/, new_header_content);
    
    // 3. Replace Footer
    content = content.replace(/<!-- ── .*?Footer ── -->[\s\S]*?<\/body>/, new_footer_content);

    // 4. Force body padding for subpages so header clears (120px for the new tall static header)
    content = content.replace(/<body[^>]*>/, '<body style="padding-top: 120px;">');

    fs.writeFileSync(path.join(__dirname, f), content, 'utf8');
    console.log(`Updated ${f}`);
});
