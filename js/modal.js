/* ═══════════════════════════════════════════════════
   Modal — Booking Form
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initModal();
});

function initModal() {
    const modalBackdrop = document.getElementById('bookingModal');
    if (!modalBackdrop) return;

    const modal = modalBackdrop.querySelector('.modal');
    const closeBtns = modalBackdrop.querySelectorAll('[data-modal-close]');
    const openBtns = document.querySelectorAll('[data-modal-open="booking"]');
    const form = modalBackdrop.querySelector('#bookingForm');

    // Open
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalBackdrop.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close on X button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => closeModal());
    });

    // Close on backdrop click
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error)';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--border)';
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate submission
                setTimeout(() => {
                    submitBtn.textContent = '✓ Sent Successfully!';
                    submitBtn.style.background = 'var(--success)';

                    setTimeout(() => {
                        closeModal();
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 2000);
                }, 1500);
            }
        });
    }

    function closeModal() {
        modalBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
    }
}
