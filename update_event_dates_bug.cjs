const fs = require('fs');
const jsPath = 'C:/reelifeweddingsAG/js/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

const oldRenderEventDates = `    function renderEventDates() {
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
    }`;

const newRenderEventDates = `    function renderEventDates() {
        if (!eventDatesContainer) return;
        
        // Store current date values before re-rendering to prevent clearing them
        const currentDates = {};
        const existingInputs = eventDatesContainer.querySelectorAll('input[type="date"]');
        existingInputs.forEach(input => {
            if (input.value) {
                currentDates[input.dataset.eventDate] = input.value;
            }
        });

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
            
            // Restore previously entered value
            if (currentDates[ev]) {
                input.value = currentDates[ev];
            }

            row.appendChild(label);
            row.appendChild(input);
            eventDatesContainer.appendChild(row);
        });
        
        updateQuotation();
    }`;

jsContent = jsContent.replace(oldRenderEventDates, newRenderEventDates);
fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log('Successfully updated renderEventDates');
