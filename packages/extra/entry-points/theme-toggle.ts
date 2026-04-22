/**
 * Theme Toggle - Vanilla Cards Entry Point
 *
 * Dark/light theme switcher with server persistence via AJAX
 */

/**
 * Theme toggle functionality
 */
const ThemeToggle = {
  /**
   * Initialize theme toggle
   */
  init(): void {
    this.bindEvents();
    console.info('[ThemeToggle] Initialized ✓');
  },

  /**
   * Bind event listeners
   */
  bindEvents(): void {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => this.toggleTheme());
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' && e.altKey) {
        this.toggleTheme();
      }
    });
  },

  /**
   * Toggle theme via server API
   */
  async toggleTheme(): Promise<void> {
    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/api/theme/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken || '',
        },
        credentials: 'same-origin', // Send cookies
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();

      // Update DOM with new theme
      document.documentElement.setAttribute('data-theme', data.theme);

      // Set cookie client-side (server can't set cookies reliably with session)
      if (data.cookie) {
        const cookieValue = `${data.cookie.name}=${data.cookie.value}; Path=${data.cookie.path}; Max-Age=${data.cookie.maxAge}; SameSite=${data.cookie.sameSite}`;
        document.cookie = cookieValue;
      }

      // Update all toggle buttons
      document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        const icon = button.querySelector('.theme-toggle__icon');
        if (icon) {
          icon.setAttribute('data-theme', data.theme);
        }
      });

      console.log('[ThemeToggle] Switched to', data.theme);
    } catch (error) {
      console.error('[ThemeToggle] Error toggling theme:', error);
    }
  },

  /**
   * Get current theme
   */
  getTheme(): 'light' | 'dark' {
    return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'dark';
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeToggle.init());
} else {
  ThemeToggle.init();
}

// Export for external use
export { ThemeToggle };
