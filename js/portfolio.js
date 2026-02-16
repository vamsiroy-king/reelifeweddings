/* ═══════════════════════════════════════════════════
   Portfolio — Category Filter & Scroll
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioTabs();
    initHorizontalScroll();
});

function initPortfolioTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.portfolio-category');

    if (!tabs.length || !categories.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            // Update active tab
            tabs.forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');

            // Filter categories
            if (filter === 'all') {
                categories.forEach(cat => {
                    cat.style.display = '';
                    cat.style.opacity = '0';
                    requestAnimationFrame(() => {
                        cat.style.transition = 'opacity 0.4s ease';
                        cat.style.opacity = '1';
                    });
                });
            } else {
                categories.forEach(cat => {
                    if (cat.dataset.category === filter) {
                        cat.style.display = '';
                        cat.style.opacity = '0';
                        requestAnimationFrame(() => {
                            cat.style.transition = 'opacity 0.4s ease';
                            cat.style.opacity = '1';
                        });
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });
}

function initHorizontalScroll() {
    const scrollRows = document.querySelectorAll('.portfolio-scroll-row');

    scrollRows.forEach(row => {
        let isDown = false;
        let startX;
        let scrollLeft;

        row.addEventListener('mousedown', (e) => {
            isDown = true;
            row.style.cursor = 'grabbing';
            startX = e.pageX - row.offsetLeft;
            scrollLeft = row.scrollLeft;
        });

        row.addEventListener('mouseleave', () => {
            isDown = false;
            row.style.cursor = 'grab';
        });

        row.addEventListener('mouseup', () => {
            isDown = false;
            row.style.cursor = 'grab';
        });

        row.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - row.offsetLeft;
            const walk = (x - startX) * 2;
            row.scrollLeft = scrollLeft - walk;
        });
    });
}
