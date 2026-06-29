import React from 'react';
import { createRoot } from 'react-dom/client';
import IntroAnimation from './components/Hero.jsx';

// Import Tailwind CSS
import '../css/tailwind.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-hero-root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <IntroAnimation />
      </React.StrictMode>
    );
  }
});
