/* ═══════════════════════════════════════════════════
   Navigation — Mobile Menu & Active State
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    setActiveNavLink();
});

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open');
        document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-open');
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            hamburger.classList.remove('is-open');
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Normalize paths
        const linkPath = href.replace(/\/$/, '') || '/';
        const pagePath = currentPath.replace(/\/$/, '') || '/';

        // Check for index.html or root
        const isHome = linkPath === '/' || linkPath === '/index.html' || linkPath === 'index.html';
        const isCurrentHome = pagePath === '/' || pagePath === '/index.html';

        if ((isHome && isCurrentHome) || linkPath === pagePath || pagePath.endsWith(linkPath)) {
            link.classList.add('is-active');
        }
    });
}
