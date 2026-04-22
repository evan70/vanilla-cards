/**
 * mobile-menu.ts — Auto-init Mobile Menu
 *
 * Works on any page with .card--header__mobile-toggle + .card--nav-mobile.
 * Uses Dual Toggle Pattern for maximum compatibility (Android 8.10, etc.)
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

function init(): void {
  console.log('[Mobile Menu] Initializing...');
  const btn = document.querySelector<HTMLButtonElement>('.card--header__mobile-toggle');
  const menu = document.querySelector<HTMLElement>('.card--nav-mobile');
  const overlay = document.querySelector<HTMLElement>('.mobile-nav-overlay');

  if (!btn || !menu) {
    console.log('[Mobile Menu] Button or menu not found', { btn: !!btn, menu: !!menu });
    return;
  }

  // Initial inline styles for maximum compatibility (Dual Toggle Pattern)
  const initStyles = () => {
    // Menu styles
    menu.style.display = 'none';
    menu.style.position = 'fixed';
    menu.style.top = '45px';
    menu.style.right = '0';
    menu.style.bottom = '0';
    menu.style.width = '280px';
    menu.style.maxWidth = '85vw';
    menu.style.background = 'rgba(11, 15, 23, 0.98)'; // Dark background from guide
    menu.style.zIndex = '10000';
    menu.style.overflowY = 'auto';
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'none'; // Avoid CSS transforms for compatibility
    menu.style.transition = 'none'; // Avoid CSS transitions for compatibility

    // Overlay styles
    if (overlay) {
      overlay.style.display = 'none';
      overlay.style.position = 'fixed';
      overlay.style.top = '45px';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.background = 'rgba(0, 0, 0, 0.6)';
      overlay.style.zIndex = '9998';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.transition = 'none';
    }
  };

  initStyles();

  const open = () => {
    console.log('[Mobile Menu] Opening...');
    menu.removeAttribute('hidden');
    if (overlay) overlay.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('card--header__mobile-toggle--open');
    document.body.classList.add('mobile-menu-open');

    // Dual Toggle: Toggle BOTH class and inline style
    menu.classList.add('card--nav-mobile--open');
    menu.style.display = 'flex';
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';

    if (overlay) {
      overlay.style.display = 'block';
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    }

    document.body.style.overflow = 'hidden';
    console.log('[Mobile Menu] Opened');
  };

  const close = () => {
    console.log('[Mobile Menu] Closing...');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('card--header__mobile-toggle--open');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';

    // Dual Toggle: Toggle BOTH class and inline style
    menu.classList.remove('card--nav-mobile--open');
    menu.style.display = 'none';
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';

    if (overlay) {
      overlay.style.display = 'none';
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }

    menu.setAttribute('hidden', '');
    if (overlay) overlay.setAttribute('hidden', '');
    console.log('[Mobile Menu] Closed');
  };

  const toggle = () => {
    const isOpen = menu.style.display === 'flex';
    isOpen ? close() : open();
  };

  // Event Listeners: Dual events (click + touchend) for maximum compatibility
  btn.addEventListener('click', (e) => {
    console.log('[Mobile Menu] Button click');
    toggle();
  });
  btn.addEventListener('touchend', (e) => {
    console.log('[Mobile Menu] Button touchend');
    e.preventDefault();
    toggle();
  });

  if (overlay) {
    overlay.addEventListener('click', close);
    overlay.addEventListener('touchend', (e) => {
      e.preventDefault();
      close();
    });
  }

  // Links: Don't use preventDefault to allow navigation
  menu.querySelectorAll('.card--nav-mobile__link').forEach((link) => {
    link.addEventListener('click', () => {
      console.log('[Mobile Menu] Link click');
      close();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.style.display !== 'none') {
      close();
    }
  });

  console.log('[Mobile Menu] Initialized with dual toggle pattern ✓');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
