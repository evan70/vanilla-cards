/**
 * mobile-menu.ts — Auto-init Mobile Menu
 *
 * Works on any page with .card--header__mobile-toggle + .card--nav-mobile.
 * NOT a kernel page — auto-inits on DOM ready so it works everywhere core.ts loads.
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

function init(): void {
  const btn = document.querySelector<HTMLButtonElement>('.card--header__mobile-toggle');
  const menu = document.querySelector<HTMLElement>('.card--nav-mobile');
  if (!btn || !menu) return;

  const getOverlay = () => document.querySelector<HTMLElement>('.mobile-nav-overlay');

  function open(): void {
    getOverlay()?.removeAttribute('hidden');
    menu!.removeAttribute('hidden');
    btn!.setAttribute('aria-expanded', 'true');
    btn!.classList.add('card--header__mobile-toggle--open');
    document.body.classList.add('mobile-menu-open');
    menu!.classList.add('card--nav-mobile--open');
  }

  function close(): void {
    btn!.setAttribute('aria-expanded', 'false');
    btn!.classList.remove('card--header__mobile-toggle--open');
    document.body.classList.remove('mobile-menu-open');
    menu!.classList.remove('card--nav-mobile--open');
    // Wait for CSS transition (300ms) before hiding
    setTimeout(() => {
      if (!menu!.classList.contains('card--nav-mobile--open')) {
        menu!.setAttribute('hidden', '');
        getOverlay()?.setAttribute('hidden', '');
      }
    }, 350);
  }

  function toggle(): void {
    menu!.classList.contains('card--nav-mobile--open') ? close() : open();
  }

  btn.addEventListener('click', toggle);
  menu!.querySelectorAll('.card--nav-mobile__link').forEach((link) => {
    link.addEventListener('click', close);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu!.hasAttribute('hidden')) close();
  });
  document.addEventListener('click', (e) => {
    const overlay = getOverlay();
    if (overlay && e.target === overlay) close();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
