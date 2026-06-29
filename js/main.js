import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Swiper is loaded globally via CDN in head for simplicity, but we can access it here.

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // 2. Swiper Coverflow Initialization
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper-container-hero', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1.5,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                }
            },
            loop: true,
            initialSlide: 0,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            on: {
                init: function () {
                    playActiveVideo(this);
                },
                slideChangeTransitionEnd: function () {
                    playActiveVideo(this);
                },
            }
        });

        function playActiveVideo(swiperInstance) {
            // Pause all videos
            document.querySelectorAll('.reel-video').forEach(video => {
                video.pause();
                video.currentTime = 0; // reset
                    });
            // Play active slide video
            const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
            const activeVideo = activeSlide.querySelector('video');
            if (activeVideo) {
                activeVideo.play().catch(e => console.log("Autoplay prevented"));
            }
        }
    }

    // 3. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // 4. Removed Floating Header Scroll Effect as per minimal static design

    // 5. Contact Form WhatsApp Submission (The Sky Form)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const venue = document.getElementById('venue').value;
            
            let source = 'Not specified';
            const sourceEl = document.querySelector('input[name="source"]:checked');
            if (sourceEl) {
                source = sourceEl.value;
            }

            if (!name || !mobile || !email || !date) {
                alert("Please fill all required fields.");
                return;
            }

            let message = `*New Booking Inquiry!*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Phone:* ${mobile}%0A`;
            message += `*Email:* ${email}%0A`;
            message += `*Event Date:* ${date}%0A`;
            if (venue) message += `*Venue:* ${venue}%0A`;
            message += `*Source:* ${source}`;

            window.open(`https://wa.me/919148132417?text=${message}`, '_blank');
        });
    }

    // 6. FAQs Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const card = question.parentElement;
            
            // Close others
            document.querySelectorAll('.faq-card').forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            
            // Toggle current
            card.classList.toggle('active');
        });
    });

    /* ── New Booking Form Logic (contact.html) ── */
    const packageChips = document.querySelectorAll('#packageChips .event-chip');
    const eventChips = document.querySelectorAll('#eventChips .event-chip');
    const eventDatesContainer = document.getElementById('eventDatesContainer');
    const customEventInput = document.getElementById('customEventInput');
    const addCustomEventBtn = document.getElementById('addCustomEventBtn');
    const packageBanner = document.getElementById('packageBanner');
    const pkgNameEl = document.getElementById('pkgName');
    const pkgPriceEl = document.getElementById('pkgPrice');

    let selectedPackage = null;
    let selectedEvents = new Set();

    // Auto-select package from URL params (redirected from pricing table)
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedPkg = urlParams.get('package');
    if (preselectedPkg && packageChips.length) {
        packageChips.forEach(chip => {
            if (chip.getAttribute('data-package') === preselectedPkg) {
                chip.classList.add('selected');
                selectedPackage = preselectedPkg;
                if (packageBanner && pkgNameEl && pkgPriceEl) {
                    const names = { moments: 'Moments', signature: 'Signature', legacy: 'Legacy' };
                    pkgNameEl.textContent = names[preselectedPkg] || preselectedPkg;
                    pkgPriceEl.textContent = chip.getAttribute('data-price') + ' / event';
                    packageBanner.style.display = 'flex';
                }
            }
        });
    }

    // Package chip selection
    packageChips.forEach(chip => {
        chip.addEventListener('click', () => {
            packageChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedPackage = chip.getAttribute('data-package');
            if (packageBanner && pkgNameEl && pkgPriceEl) {
                const names = { moments: 'Moments', signature: 'Signature', legacy: 'Legacy' };
                pkgNameEl.textContent = names[selectedPackage] || selectedPackage;
                pkgPriceEl.textContent = chip.getAttribute('data-price') + ' / event';
                packageBanner.style.display = 'flex';
            }
        });
    });

    // Render date pickers for selected events
    function renderEventDates() {
        if (!eventDatesContainer) return;
        eventDatesContainer.innerHTML = '';
        selectedEvents.forEach(eventName => {
            const row = document.createElement('div');
            row.className = 'event-date-row';
            row.innerHTML = `
                <label>${eventName}</label>
                <input type="date" data-event-date="${eventName}">
                <button type="button" style="background:none; border:none; color:#999; cursor:pointer; font-size:1.1rem;" onclick="this.parentElement.remove(); document.querySelectorAll('.event-chip[data-event=\\'${eventName}\\']').forEach(c => c.classList.remove('selected'));">✕</button>
            `;
            eventDatesContainer.appendChild(row);
        });
    }

    // Event chip toggle
    eventChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const eventName = chip.getAttribute('data-event');
            if (selectedEvents.has(eventName)) {
                selectedEvents.delete(eventName);
                chip.classList.remove('selected');
            } else {
                selectedEvents.add(eventName);
                chip.classList.add('selected');
            }
            renderEventDates();
        });
    });

    // Add custom event
    if (addCustomEventBtn && customEventInput) {
        const addCustom = () => {
            const val = customEventInput.value.trim();
            if (val && !selectedEvents.has(val)) {
                selectedEvents.add(val);
                customEventInput.value = '';
                renderEventDates();
            }
        };
        addCustomEventBtn.addEventListener('click', addCustom);
        customEventInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
        });
    }

    // Booking form submission
    const dynamicBookingForm = document.getElementById('dynamicBookingForm');
    if (dynamicBookingForm) {
        dynamicBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!selectedPackage) {
                alert('Please select a package.');
                return;
            }
            if (selectedEvents.size === 0) {
                alert('Please select at least one event.');
                return;
            }

            const name = document.getElementById('b_name').value.trim();
            const mobile = document.getElementById('b_mobile').value.trim();
            const email = document.getElementById('b_email').value.trim();
            const venue = document.getElementById('b_venue').value.trim();
            const notes = document.getElementById('b_notes')?.value.trim() || '';

            if (!name || !mobile || !email || !venue) {
                alert('Please fill all required fields.');
                return;
            }

            const pkgNames = { moments: 'Moments (₹9,999/event)', signature: 'Signature (₹14,999/event)', legacy: 'Legacy (₹24,999/event)' };

            let msg = `*REELIFE WEDDINGS — NEW BOOKING*%0A%0A`;
            msg += `*Package:* ${pkgNames[selectedPackage] || selectedPackage}%0A%0A`;
            msg += `*Client Details*%0A`;
            msg += `Name: ${name}%0A`;
            msg += `Phone: ${mobile}%0A`;
            msg += `Email: ${email}%0A`;
            msg += `Venue: ${venue}%0A%0A`;

            msg += `*Events & Dates*%0A`;
            let idx = 1;
            selectedEvents.forEach(ev => {
                const dateInput = document.querySelector(`input[data-event-date="${ev}"]`);
                const dateVal = dateInput?.value || 'TBD';
                msg += `${idx}. ${ev} — ${dateVal}%0A`;
                idx++;
            });

            if (notes) {
                msg += `%0A*Notes:* ${notes}`;
            }

            const url = `https://wa.me/919148132417?text=${msg.replace(/ /g, '%20')}`;
            window.open(url, '_blank');
        });
    }
});
