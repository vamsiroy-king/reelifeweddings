const fs = require('fs');
const jsPath = 'C:/reelifeweddingsAG/js/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

const newLogic = `
    /* ── New Booking Form Logic (contact.html) ── */
    const packageChips = document.querySelectorAll('#packageChips .event-chip');
    const eventChipsContainer = document.getElementById('eventChips');
    const eventDatesContainer = document.getElementById('eventDatesContainer');
    const customEventInput = document.getElementById('customEventInput');
    const addCustomEventBtn = document.getElementById('addCustomEventBtn');
    
    // Receipt Elements
    const quotationReceipt = document.getElementById('quotationReceipt');
    const receiptPackageName = document.getElementById('receiptPackageName');
    const receiptBasePrice = document.getElementById('receiptBasePrice');
    const receiptEventCount = document.getElementById('receiptEventCount');
    const receiptTotalPrice = document.getElementById('receiptTotalPrice');

    let selectedPackage = null;
    let selectedPackagePrice = 0;
    let selectedEvents = new Set();
    
    const packagePricing = {
        moments: 9999,
        signature: 14999,
        legacy: 24999
    };
    
    const packageDisplayNames = {
        moments: 'Moments',
        signature: 'Signature',
        legacy: 'Legacy'
    };

    function formatCurrency(num) {
        return '₹' + num.toLocaleString('en-IN');
    }

    function updateQuotation() {
        if (!quotationReceipt) return;
        
        if (selectedPackage && selectedEvents.size > 0) {
            quotationReceipt.style.display = 'block';
            
            receiptPackageName.textContent = packageDisplayNames[selectedPackage];
            receiptBasePrice.textContent = formatCurrency(selectedPackagePrice);
            receiptEventCount.textContent = selectedEvents.size;
            
            const total = selectedPackagePrice * selectedEvents.size;
            receiptTotalPrice.textContent = formatCurrency(total);
        } else {
            quotationReceipt.style.display = 'none';
        }
    }

    function renderEventDates() {
        if (!eventDatesContainer) return;
        eventDatesContainer.innerHTML = '';
        
        if (selectedEvents.size === 0) return;

        const title = document.createElement('h4');
        title.textContent = 'Event Dates & Venue Details';
        title.style.marginBottom = '15px';
        title.style.color = 'var(--color-primary)';
        eventDatesContainer.appendChild(title);

        selectedEvents.forEach(ev => {
            const row = document.createElement('div');
            row.className = 'event-date-row';

            const label = document.createElement('label');
            label.textContent = ev + ' Date:';

            const input = document.createElement('input');
            input.type = 'date';
            input.dataset.eventDate = ev;

            row.appendChild(label);
            row.appendChild(input);
            eventDatesContainer.appendChild(row);
        });
        
        updateQuotation();
    }

    // Auto-select package from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedPkg = urlParams.get('package');
    if (preselectedPkg && packageChips.length) {
        packageChips.forEach(chip => {
            if (chip.getAttribute('data-package') === preselectedPkg) {
                chip.classList.add('selected');
                selectedPackage = preselectedPkg;
                selectedPackagePrice = packagePricing[preselectedPkg] || 0;
            }
        });
        updateQuotation();
    }

    // Package Chip Click
    if (packageChips.length) {
        packageChips.forEach(chip => {
            chip.addEventListener('click', () => {
                packageChips.forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
                
                selectedPackage = chip.getAttribute('data-package');
                selectedPackagePrice = packagePricing[selectedPackage] || 0;
                
                updateQuotation();
            });
        });
    }

    // Event Chip Click (Delegated for dynamically added custom events)
    if (eventChipsContainer) {
        eventChipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.event-chip');
            if (!chip) return;
            
            // Handle Delete Button Click
            if (e.target.closest('.chip-delete-btn')) {
                const eventName = chip.getAttribute('data-event');
                selectedEvents.delete(eventName);
                chip.remove();
                renderEventDates();
                return;
            }

            // Handle Standard Toggle
            const eventName = chip.getAttribute('data-event');
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                selectedEvents.delete(eventName);
            } else {
                chip.classList.add('selected');
                selectedEvents.add(eventName);
            }
            renderEventDates();
        });
    }

    // Add custom event
    if (addCustomEventBtn && customEventInput) {
        const addCustom = () => {
            const val = customEventInput.value.trim();
            if (val && !selectedEvents.has(val)) {
                // Create new chip
                const newChip = document.createElement('div');
                newChip.className = 'event-chip custom-chip selected';
                newChip.setAttribute('data-event', val);
                
                newChip.innerHTML = \`\${val} <button type="button" class="chip-delete-btn" aria-label="Delete">&times;</button>\`;
                
                eventChipsContainer.appendChild(newChip);
                
                // Add to set
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

            const totalQuotation = selectedPackagePrice * selectedEvents.size;

            let msg = \`*REELIFE WEDDINGS — NEW BOOKING*%0A%0A\`;
            msg += \`*Package:* \${packageDisplayNames[selectedPackage]} (\${formatCurrency(selectedPackagePrice)}/event)%0A\`;
            msg += \`*Total Events:* \${selectedEvents.size}%0A\`;
            msg += \`*Estimated Quotation:* \${formatCurrency(totalQuotation)}%0A%0A\`;
            
            msg += \`*Client Details*%0A\`;
            msg += \`Name: \${name}%0A\`;
            msg += \`Phone: \${mobile}%0A\`;
            msg += \`Email: \${email}%0A\`;
            msg += \`Venue / City: \${venue}%0A%0A\`;

            msg += \`*Selected Events & Dates*%0A\`;
            let idx = 1;
            selectedEvents.forEach(ev => {
                const dateInput = document.querySelector(\`input[data-event-date="\${ev}"]\`);
                const dateVal = dateInput?.value || 'TBD';
                msg += \`\${idx}. \${ev} — \${dateVal}%0A\`;
                idx++;
            });

            if (notes) {
                msg += \`%0A*Additional Notes:* \${notes}\`;
            }

            const url = \`https://wa.me/919148132417?text=\${msg.replace(/ /g, '%20')}\`;
            window.open(url, '_blank');
        });
    }
});
`;

// regex to replace from "const packageChips" to the end of the file.
jsContent = jsContent.replace(/const packageChips = document\.querySelectorAll\('#packageChips \.event-chip'\);.*/s, newLogic.trim());

fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log('Successfully updated main.js');
