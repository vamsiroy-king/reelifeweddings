/* ═══════════════════════════════════════════════════
   Accordion — FAQ Expand/Collapse
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
});

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const trigger = accordion.querySelector('.accordion__trigger');
        const content = accordion.querySelector('.accordion__content');

        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            const isOpen = accordion.classList.contains('is-open');

            // Close all other accordions (single open mode)
            accordions.forEach(other => {
                if (other !== accordion) {
                    other.classList.remove('is-open');
                    const otherContent = other.querySelector('.accordion__content');
                    if (otherContent) otherContent.style.maxHeight = '0';
                }
            });

            // Toggle current
            if (isOpen) {
                accordion.classList.remove('is-open');
                content.style.maxHeight = '0';
            } else {
                accordion.classList.add('is-open');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}
