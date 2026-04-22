/**
 * Header Scroll Effect
 *
 * Adds .card--header--scrolled class when user scrolls past 50px.
 * Used on all public pages via core.ts.
 *
 * @module @lib/header-scroll
 */

/**
 * Initialize header scroll effect
 */
export function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('.card--header');

  if (!header) {
    console.log('[HeaderScroll] Header not found');
    return;
  }

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('card--header--scrolled');
    } else {
      header.classList.remove('card--header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  console.info('[HeaderScroll] Initialized ✓');
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderScroll);
} else {
  initHeaderScroll();
}
