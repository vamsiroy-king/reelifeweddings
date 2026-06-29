import React from 'react';
import { createRoot } from 'react-dom/client';
import IntroAnimation from './components/Hero.jsx';
import PricingSection from './components/Pricing.jsx';

// Import Tailwind CSS
import '../css/tailwind.css';

document.addEventListener('DOMContentLoaded', () => {
  // Mount Hero
  const heroContainer = document.getElementById('react-hero-root');
  if (heroContainer) {
    const heroRoot = createRoot(heroContainer);
    heroRoot.render(
      <React.StrictMode>
        <IntroAnimation />
      </React.StrictMode>
    );
  }

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
