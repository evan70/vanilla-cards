/**
 * Blog entry point — Optimized bundle following the 40kb + 15kb rule.
 * 
 * Core (40kb): AppKernel, VanillaCard base logic.
 * Page Specific (15kb): Blog-specific logic, styles, and elements.
 */

import './blog-styles.css';
import '@vc/theme-nativa';
import { AppKernel, VanillaCard } from '@vc/core';
import './pages/blog'; // Registers the 'blog' page with kernel
import './pages/blog-detail'; // Registers the 'blog-detail' page with kernel

// Register only the main web component
if (!customElements.get('vanilla-card')) {
  customElements.define('vanilla-card', VanillaCard);
}

// Initialize and boot kernel
const kernel = AppKernel.init();

// Configure only what's needed for this page
// (No withHttp, withAuth, or withNotifications if not needed)

kernel.boot();

// Header Scroll Effect (Page specific)
const header = document.querySelector('vanilla-card[variant="header"]');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('card--header--scrolled');
    } else {
      header.classList.remove('card--header--scrolled');
    }
  }, { passive: true });
}

// Theme Switching Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    kernel.theme.toggle();
  });
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.card--header__mobile-toggle');
const mobileOverlay = document.getElementById('mobile-nav-overlay');

if (mobileToggle && mobileOverlay) {
  mobileToggle.addEventListener('click', () => {
    const headerEl = document.querySelector('vanilla-card[variant="header"]');
    headerEl?.classList.toggle('card--header--mobile-open');
    mobileOverlay.hidden = !mobileOverlay.hidden;
  });
  
  mobileOverlay.addEventListener('click', () => {
    const headerEl = document.querySelector('vanilla-card[variant="header"]');
    headerEl?.classList.remove('card--header--mobile-open');
    mobileOverlay.hidden = true;
  });
}

console.log('[Blog] Optimized page loaded.');
