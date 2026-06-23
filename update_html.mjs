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

const new_header_content = `    <!-- ── Header (Pill Shaped Glass) ── -->
    <div class="header-wrapper">
        <header class="header-main" id="mainHeader">
            <a href="index.html">
                <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" class="nav-logo">
            </a>
            
            <nav class="nav-desktop">
                <a href="index.html" class="nav-link">Home</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
                <a href="index.html#pricing" class="nav-link">Pricing</a>
                <a href="contact.html" class="nav-link">Book Now</a>
            </nav>
            
            <a href="contact.html" class="btn btn-primary" style="padding: 10px 24px; font-size: 0.85rem; display: none;">Let's Talk</a>
            
            <button class="mobile-toggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu">
        <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" style="height: 40px; margin-bottom: 20px;">
        <a href="index.html" class="nav-link">Home</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="index.html#pricing" class="nav-link">Pricing</a>
        <a href="contact.html" class="nav-link">Book Now</a>
    </div>`;

const new_footer_content = `    <!-- ── Footer ── -->
    <footer class="footer">
        <div class="footer-watermark" style="color: var(--color-offwhite);">reelife</div>
        
        <div class="footer-content">
            <img src="/assets/logo-optimized.webp" alt="Reelife Weddings" class="footer-logo">
            
            <div class="footer-socials">
                <a href="https://www.instagram.com/reelifeweddings" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="mailto:reelifeweddings@gmail.com"><i class="fas fa-envelope"></i></a>
            </div>
            
            <div class="footer-bottom">
                <span>© 2026 Reelife Weddings. All rights reserved.</span>
                <span>Based in Bangalore. Available Worldwide.</span>
            </div>
        </div>
    </footer>

    <!-- WhatsApp CTA -->
    <a href="https://wa.me/919148132417" target="_blank" class="wa-float">
        <i class="fab fa-whatsapp"></i>
    </a>

    <!-- Scripts -->
    <script type="module" src="/js/main.js"></script>
</body>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    if (['index.html'].includes(f)) return; // skip index since I already did it completely

    let content = fs.readFileSync(path.join(__dirname, f), 'utf8');

    // 1. Replace head
    content = content.replace(/<!-- Core CSS -->[\s\S]*?<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+">/, new_head_content);

    // 2. Replace Header and mobile menu overlay
    content = content.replace(/<!-- ── Header .*?<\/div>\s*<\/div>/, new_header_content);
    
    // 3. Replace Footer and everything after to </body>
    content = content.replace(/<!-- ── Footer ── -->[\s\S]*?<\/body>/, new_footer_content);

    // 4. Force body style for subpages (padding top for the pill header to clear)
    content = content.replace(/<body[^>]*>/, '<body style="background-color: var(--color-offwhite); color: var(--text-main); padding-top: 100px;">');

    fs.writeFileSync(path.join(__dirname, f), content, 'utf8');
    console.log(`Updated ${f}`);
});
