import '../index.css';
import { VanillaCard } from '@vc/core';
import { initTheme, toggleTheme } from './kernel/theme';

if (!customElements.get('vanilla-card')) {
    customElements.define('vanilla-card', VanillaCard);
}

// Initialize Theme
initTheme();

// --- Theme Switching Logic ---
const themeToggle = document.getElementById('theme-toggle');

const handleThemeToggle = () => {
    toggleTheme();
};

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}

// --- Header Scroll Effect ---
const header = document.querySelector('vanilla-card[variant="header"]');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('card--header--scrolled');
        } else {
            header.classList.remove('card--header--scrolled');
        }
    });
}

// --- Mobile Menu Toggle ---
const mobileToggle = document.querySelector('.card--header__mobile-toggle');
const mobileOverlay = document.getElementById('mobile-nav-overlay');

if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
        const header = document.querySelector('vanilla-card[variant="header"]');
        header?.classList.toggle('card--header--mobile-open');
        mobileToggle.classList.toggle('card--header__mobile-toggle--open');
        mobileOverlay.hidden = !mobileOverlay.hidden;
    });
    
    mobileOverlay.addEventListener('click', () => {
        const header = document.querySelector('vanilla-card[variant="header"]');
        header?.classList.remove('card--header--mobile-open');
        mobileToggle.classList.remove('card--header__mobile-toggle--open');
        mobileOverlay.hidden = true;
    });
}

// Form Handlers
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

console.log('[OK] Vanilla Cards demo loaded with enhanced theme switching!');
