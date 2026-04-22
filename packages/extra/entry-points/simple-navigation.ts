/**
 * Navigation - Simple Interactivity
 * 
 * Handles mobile menu toggle and theme toggle.
 * Does NOT render header/footer - those are PHP-rendered.
 */

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.card--header__mobile-toggle');
  const mobileNav = document.querySelector('.card--nav-mobile');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!mobileToggle || !mobileNav) {
    console.debug('[Navigation] Mobile menu elements not found');
    return;
  }

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileNav.removeAttribute('hidden');
    mobileNav.classList.add('card--nav-mobile--open');
    
    if (overlay) {
      overlay.removeAttribute('hidden');
      overlay.classList.add('mobile-nav-overlay--open');
    }

    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    isOpen = false;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('hidden', '');
    mobileNav.classList.remove('card--nav-mobile--open');
    
    if (overlay) {
      overlay.setAttribute('hidden', '');
      overlay.classList.remove('mobile-nav-overlay--open');
    }

    document.body.style.overflow = '';
  };

  // Toggle on button click
  mobileToggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on link click
  mobileNav.querySelectorAll('.card--nav-mobile__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  console.info('[Navigation] Mobile menu initialized ✓');
}

/**
 * Theme Toggle
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.card--header__theme-toggle');

  if (!themeToggle) {
    console.debug('[Navigation] Theme toggle not found');
    return;
  }

  const toggleTheme = async () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Toggle locally immediately
    document.documentElement.setAttribute('data-theme', newTheme);
    console.info('[Navigation] Theme toggled to:', newTheme);

    // Try to sync with server (optional)
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      if (!csrfToken) {
        console.debug('[Navigation] Theme sync skipped (no CSRF token)');
        return;
      }

      const response = await fetch('/api/theme/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'same-origin',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cookie) {
          document.cookie = `${data.cookie.name}=${data.cookie.value}; Path=${data.cookie.path}; Max-Age=${data.cookie.maxAge}; SameSite=${data.cookie.sameSite}`;
        }
      }
    } catch (error) {
      console.debug('[Navigation] Theme sync failed (network error)');
    }
  };

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleTheme();
  });

  console.info('[Navigation] Theme toggle initialized ✓');
}

/**
 * Initialize all navigation modules
 */
function init() {
  initMobileMenu();
  initThemeToggle();
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for external use
export { init, initMobileMenu, initThemeToggle };
export default init;
