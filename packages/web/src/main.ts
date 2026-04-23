import './styles.css';
import '../index.css';
import { AppKernel, VanillaCard, VanillaNavbar, VanillaThemeToggle } from '@vc/core';
import { NativaThemeManager } from '@vc/theme-nativa';

// Initialize App with custom Theme Manager
const themeManager = new NativaThemeManager();
AppKernel.init()
  .withTheme(themeManager)
  .boot();

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

// Form Handlers
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

console.log('[OK] Vanilla Cards Core Architecture Loaded');
