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

const new_header_content = `    <!-- ── Flawless Fixed Header ── -->
    <div class="header-wrapper">
        <header class="header-main" id="mainHeader">
            <nav class="nav-group left" style="flex:1;">
                <a href="index.html" class="nav-link">Home</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
            </nav>
            
            <div class="nav-logo-container" style="flex:1; text-align:center;">
                <a href="index.html">
                    <img src="/assets/logo.png" alt="Reelife Weddings" class="nav-logo">
                </a>
            </div>

            <nav class="nav-group right" style="flex:1; justify-content:flex-end;">
                <a href="faqs.html" class="nav-link">Pricing & FAQs</a>
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
        <img src="/assets/logo.png" alt="Reelife Weddings" style="height: 50px; margin-bottom: 20px; filter: brightness(0);">
        <a href="index.html" class="nav-link">Home</a>
        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="faqs.html" class="nav-link">Pricing & FAQs</a>
        <a href="contact.html" class="nav-link" style="color: var(--color-primary);">Book Now</a>
    </div>`;

const new_footer_content = `    <!-- ── Solid Red Footer ── -->
    <footer class="footer-solid">
        <div class="footer-grid">
            <div class="footer-links-left">
                <div class="footer-links">
                    <a href="faqs.html">FAQ</a>
                    <a href="#">Policy</a>
                    <a href="#">Return Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>
            </div>
            
            <div class="footer-brand">
                <h2>India's Best</h2>
                <p>Wedding Content Creators</p>
                <div style="margin-top: 16px;">
                    <a href="https://www.instagram.com/reelifeweddings" target="_blank" style="color:white; font-size:1.5rem;"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            
            <div class="footer-contact">
                <p>Email us at: reelifeweddings@gmail.com</p>
                <p>Phone No.: +91 91481 32417</p>
                <p>Based in Bangalore • Available across India</p>
                
                <a href="https://wa.me/919148132417" target="_blank"><i class="fab fa-whatsapp"></i></a>
                
                <div style="margin-top: 20px;">
                    <a href="memory-vault-demo.html" style="display:inline-block; padding:10px 20px; border:1px solid rgba(255,255,255,0.5); border-radius:30px; color:#fff; text-decoration:none; font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; background: rgba(255,255,255,0.1);">✨ View Memory Vault Demo ✨</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script type="module" src="/js/main.js"></script>
</body>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    if (['index.html', 'faqs.html'].includes(f)) return; // skip index and faqs

    let content = fs.readFileSync(path.join(__dirname, f), 'utf8');

    // 1. Replace head
    content = content.replace(/<!-- Core CSS -->[\s\S]*?<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+">/, new_head_content);
    
    // Ensure Swiper CSS is in head
    if (!content.includes('swiper-bundle.min.css')) {
        content = content.replace(/<\/head>/, '    <!-- Swiper CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');
    }

    // 2. Replace Header
    content = content.replace(/<!-- ── .*?Header ── -->[\s\S]*?<\/div>\s*<\/div>/, new_header_content);
    // sometimes it matches wrong if mobile menu is outside. better regex:
    content = content.replace(/<!-- ── .*?Header ── -->[\s\S]*?<!-- Mobile Menu -->[\s\S]*?<\/div>/, new_header_content);

    // 3. Replace Footer
    content = content.replace(/<!-- ── .*?Footer ── -->[\s\S]*?<\/body>/, new_footer_content);

    // 4. Force body padding for subpages so header clears (120px for the new tall static header)
    content = content.replace(/<body[^>]*>/, '<body style="padding-top: 140px;">');

    fs.writeFileSync(path.join(__dirname, f), content, 'utf8');
    console.log(`Updated ${f}`);
});
