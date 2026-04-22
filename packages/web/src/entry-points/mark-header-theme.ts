/**
 * Mark Demo Theme & Mobile Navigation
 * Theme toggle and mobile menu for frontend demo pages.
 * Imports unified core CSS.
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// SVG Icons
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

/**
 * Mark Demo Manager
 */
const Header = {
  themeToggle: null as HTMLElement | null,
  mobileMenuToggle: null as HTMLElement | null,
  mobileNav: null as HTMLElement | null,
  mobileNavOverlay: null as HTMLElement | null,

  /**
   * Initialize
   */
  init(): void {
    console.log('[Header] Initializing...');

    this.themeToggle = document.getElementById('theme-toggle');
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    this.mobileNav = document.getElementById('mobile-nav');
    this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');

    console.log('[Header] Elements found:', {
      themeToggle: !!this.themeToggle,
      mobileMenuToggle: !!this.mobileMenuToggle,
      mobileNav: !!this.mobileNav,
      mobileNavOverlay: !!this.mobileNavOverlay,
    });

    if (!this.themeToggle) {
      console.error('[Header] Theme toggle button not found!');
    }
    if (!this.mobileMenuToggle) {
      console.error('[Header] Mobile menu toggle button not found!');
    }

    this.bindEvents();
    this.updateThemeIcon();
    this.initMobileNavStyles();
    console.info('[Header] Initialized ✓');
  },

  /**
   * Initialize mobile nav inline styles (critical for animation)
   * Uses Dual Toggle Pattern: class + inline styles for max compatibility
   */
  initMobileNavStyles(): void {
    // CRITICAL: Set initial inline style for maximum browser compatibility
    if (this.mobileNav) {
      this.mobileNav.style.display = 'none';
      this.mobileNav.style.position = 'fixed';
      this.mobileNav.style.top = '50px'; // Match header height
      this.mobileNav.style.right = '0';
      this.mobileNav.style.bottom = '0';
      this.mobileNav.style.width = '280px';
      this.mobileNav.style.maxWidth = '80vw';
      // Background and border are controlled by CSS vars for theme support
      this.mobileNav.style.borderLeft = '1px solid var(--glass-border)';
      // No box-shadow (clean look, doesn't interfere with header)
      this.mobileNav.style.zIndex = '10001'; // HIGHER than header (10000)
      this.mobileNav.style.overflowY = 'auto';
      this.mobileNav.style.opacity = '0';
      this.mobileNav.style.visibility = 'hidden';
      this.mobileNav.style.transform = 'translateX(100%)';
      this.mobileNav.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease';
      console.log('[Header] Mobile nav inline styles initialized');
    }

    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.style.display = 'none';
      this.mobileNavOverlay.style.position = 'fixed';
      this.mobileNavOverlay.style.top = '50px'; // Match header height
      this.mobileNavOverlay.style.left = '0';
      this.mobileNavOverlay.style.right = '0';
      this.mobileNavOverlay.style.bottom = '0';
      // Background is controlled by CSS var(--glass-bg) for theme support
      this.mobileNavOverlay.style.backdropFilter = 'blur(4px)';
      this.mobileNavOverlay.style.zIndex = '10000'; // Same as header, below menu (10001)
      this.mobileNavOverlay.style.opacity = '0';
      this.mobileNavOverlay.style.visibility = 'hidden';
      this.mobileNavOverlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
      console.log('[Header] Mobile nav overlay inline styles initialized');
    }
  },

  /**
   * Bind event listeners
   */
  bindEvents(): void {
    console.log('[Header] Binding events...');

    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        console.log('[Header] Theme toggle clicked!');
        this.toggleTheme();
      });
      console.log('[Header] Theme toggle event listener attached');
    }

    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => {
        console.log('[Header] Mobile menu toggle clicked!');
        this.toggleMobileMenu();
      });
      console.log('[Header] Mobile menu toggle event listener attached');
    }

    // Nav links - close menu on click
    const navLinks = document.querySelectorAll('.card--nav-mobile__link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        console.log('[Header] Nav link clicked, closing menu...');
        this.closeMobileMenu();
      });
    });
    console.log('[Header] Nav link close listeners attached');

    // Overlay click to close
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener('click', () => {
        console.log('[Header] Overlay clicked!');
        this.closeMobileMenu();
      });
      console.log('[Header] Overlay event listener attached');
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        console.log('[Header] Escape key pressed!');
        this.closeMobileMenu();
      }
    });
    console.log('[Header] Escape key event listener attached');

    console.log('[Header] All events bound');
  },

  /**
   * Toggle theme
   */
  async toggleTheme(): Promise<void> {
    const html = document.documentElement;

    // Get CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    console.log('[Header] CSRF token:', csrfToken ? 'found' : 'NOT FOUND');

    // Toggle via server API (sets cookie)
    try {
      const response = await fetch('/api/theme/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken || '',
        },
        credentials: 'same-origin',
      });

      console.log('[Header] API response status:', response.status);

      if (!response.ok) {
        throw new Error('Theme toggle failed');
      }

      const data = await response.json() as any;
      console.log('[Header] API response data:', data);

      // Update DOM with new theme FROM API RESPONSE
      html.setAttribute('data-theme', data.theme);

      // Set cookie client-side (for development server compatibility)
      if (data.cookie) {
        document.cookie = `${data.cookie.name}=${data.cookie.value}; Path=${data.cookie.path}; Max-Age=${data.cookie.maxAge}; SameSite=${data.cookie.sameSite}`;
      }

      // Update icon AFTER we know the new theme
      this.updateThemeIcon();
      console.log('[Header] Theme toggled to:', data.theme);
    } catch (error) {
      console.error('[Header] Theme toggle error:', error);
    }
  },

  /**
   * Update theme icon
   */
  updateThemeIcon(): void {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';

    if (!this.themeToggle) return;

    // Update theme toggle button content with appropriate SVG
    if (currentTheme === 'dark') {
      // Dark mode: show sun icon (to switch to light)
      this.themeToggle.innerHTML = sunIcon;
    } else {
      // Light mode: show moon icon (to switch to dark)
      this.themeToggle.innerHTML = moonIcon;
    }

    console.log('[Header] Theme icon updated for:', currentTheme);
  },

  /**
   * Toggle mobile menu open/close
   * Uses Dual Toggle Pattern: class + inline styles
   */
  toggleMobileMenu(): void {
    if (!this.mobileNav || !this.mobileNavOverlay) {
      console.error('[Header] Mobile nav elements not found');
      return;
    }

    // Check if menu is currently open
    const isOpen = this.mobileNav.style.display === 'flex' && 
                   this.mobileNav.style.opacity === '1';

    if (isOpen) {
      console.log('[Header] Menu is open, closing...');
      this.closeMobileMenu();
    } else {
      console.log('[Header] Menu is closed, opening...');
      this.openMobileMenu();
    }
  },

  /**
   * Open mobile menu
   * Uses Dual Toggle Pattern: class + inline styles
   */
  openMobileMenu(): void {
    const mobileNav = this.mobileNav;
    const mobileNavOverlay = this.mobileNavOverlay;

    if (!mobileNav || !mobileNavOverlay) {
      console.error('[Header] Mobile nav elements not found');
      return;
    }

    console.log('[Header] Opening mobile menu...');
    console.log('[Header] Mobile nav styles before:', {
      display: mobileNav.style.display,
      opacity: mobileNav.style.opacity,
      transform: mobileNav.style.transform,
      zIndex: mobileNav.style.zIndex,
    });

    // CRITICAL: Toggle BOTH class AND inline style
    mobileNavOverlay.style.display = 'block';
    mobileNav.style.display = 'flex';

    // Force reflow
    void mobileNav.offsetHeight;

    // Trigger animation with requestAnimationFrame
    requestAnimationFrame(() => {
      mobileNavOverlay.style.opacity = '1';
      mobileNavOverlay.style.visibility = 'visible';
      mobileNav.style.opacity = '1';
      mobileNav.style.visibility = 'visible';
      mobileNav.style.transform = 'translateX(0)';
      
      console.log('[Header] Mobile menu styles after:', {
        display: mobileNav.style.display,
        opacity: mobileNav.style.opacity,
        transform: mobileNav.style.transform,
      });
    });

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    console.log('[Header] Mobile menu opened');
  },

  /**
   * Close mobile menu
   * Uses Dual Toggle Pattern: class + inline styles
   */
  closeMobileMenu(): void {
    const mobileNav = this.mobileNav;
    const mobileNavOverlay = this.mobileNavOverlay;

    if (!mobileNav || !mobileNavOverlay) return;

    // CRITICAL: Toggle BOTH class AND inline style
    mobileNavOverlay.style.opacity = '0';
    mobileNavOverlay.style.visibility = 'hidden';
    mobileNav.style.opacity = '0';
    mobileNav.style.visibility = 'hidden';
    mobileNav.style.transform = 'translateX(100%)';

    // Hide after animation
    setTimeout(() => {
      mobileNavOverlay.style.display = 'none';
      mobileNav.style.display = 'none';
    }, 300);

    // Unlock body scroll
    document.body.style.overflow = '';

    console.log('[Header] Mobile menu closed');
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Header.init());
} else {
  Header.init();
}

// Export for external use
export { Header };
