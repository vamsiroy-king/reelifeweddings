import React from 'react';
import { createRoot } from 'react-dom/client';
import PricingSection from './components/Pricing.jsx';

// Import Tailwind CSS
import '../css/tailwind.css';

document.addEventListener('DOMContentLoaded', () => {
  // Mount Pricing
  const pricingContainer = document.getElementById('react-pricing-root');
  if (pricingContainer) {
    const pricingRoot = createRoot(pricingContainer);
    pricingRoot.render(
      <React.StrictMode>
        <PricingSection />
      </React.StrictMode>
    );
  }
});
