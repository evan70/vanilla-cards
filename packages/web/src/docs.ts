import '../docs.css';
import { VanillaCard } from '@vc/core';
import { initTheme, toggleTheme } from './kernel/theme';

if (!customElements.get('vanilla-card')) {
    customElements.define('vanilla-card', VanillaCard);
}

// Initialize Theme
initTheme();

// --- Theme Switching Logic ---
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

const handleThemeToggle = () => {
    toggleTheme();
};

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', handleThemeToggle);
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
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-nav-overlay');

if (mobileToggle && mobileMenu && mobileOverlay) {
    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('card--nav-mobile--open');
        mobileToggle.classList.toggle('card--header__mobile-toggle--open');
        mobileOverlay.hidden = !isOpen;
        document.body.classList.toggle('mobile-menu-open', isOpen);
        
        // Body scroll lock
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
}

console.log('Vanilla Cards documentation loaded with enhanced theme switching!');
