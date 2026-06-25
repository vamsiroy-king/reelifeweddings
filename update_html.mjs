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

const new_header_content = `    <!-- ── Header (Floating Split) ── -->
    <div class="header-wrapper">
        <header class="header-main" id="mainHeader">
            <nav class="nav-group left">
                <a href="index.html" class="nav-link">Home</a>
                <a href="faqs.html" class="nav-link">FAQs</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
            </nav>
            
            <div class="nav-logo-container">
                <a href="index.html">
                    <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" class="nav-logo">
                </a>
            </div>

            <nav class="nav-group right">
                <a href="about.html" class="nav-link">About</a>
                <a href="index.html#contact" class="nav-link">Contact</a>
                <a href="contact.html" class="btn btn-primary" style="padding: 10px 24px; font-size: 0.9rem;">Book Now</a>
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
        <a href="index.html" class="nav-link">Home</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="faqs.html" class="nav-link">FAQs</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="contact.html" class="nav-link" style="color: var(--color-primary);">Book Now</a>
    </div>`;

const new_footer_content = `    <!-- ── Solid Red Footer ── -->
    <footer class="footer-solid">
        <div class="footer-brand">
            <h2>India's Best</h2>
            <p>Wedding Content Creators</p>
        </div>
        
        <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="faqs.html">FAQs</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
        
        <div class="footer-socials">
            <a href="https://www.instagram.com/reelifeweddings" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="mailto:reelifeweddings@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
        
        <div class="footer-bottom">
            <span>© 2026 Reelife Weddings. All rights reserved.</span>
            <span>Based in Bangalore. Available Worldwide.</span>
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
    // Remove old swiper link if exists
    content = content.replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/swiper@11\/swiper-bundle\.min\.css" \/>/, '');
    
    // Add new Swiper CSS to head
    content = content.replace(/<\/head>/, '    <!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');

    // 2. Replace Header and mobile menu overlay
    content = content.replace(/<!-- ── Header .*?<\/div>\s*<\/div>/, new_header_content);
    
    // 3. Replace Footer and everything after to </body>
    // It might be labeled <!-- ── Footer ── --> or <!-- ── Solid Red Footer ── -->
    content = content.replace(/<!-- ── (Solid Red )?Footer ── -->[\s\S]*?<\/body>/, new_footer_content);

    // 4. Force body style for subpages (padding top for the floating header to clear)
    content = content.replace(/<body[^>]*>/, '<body style="padding-top: 150px;">');

    fs.writeFileSync(path.join(__dirname, f), content, 'utf8');
    console.log(`Updated ${f}`);
});
