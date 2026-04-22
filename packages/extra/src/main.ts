// Register web component (assuming @vc/core is available)
import { VanillaCard } from '@vc/core';

if (!customElements.get('vanilla-card')) {
  customElements.define('vanilla-card', VanillaCard);
}

// Theme Switching Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
    });
}

// Form Handlers
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

console.log('[OK] @vc/extra Main Loaded');
