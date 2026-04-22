/**
 * Vanilla Cards Design System
 * Entry point for Vite bundling
 *
 * This is a CSS-only design system with optional JavaScript enhancements.
 * This entry point imports the CSS bundle and JS modules for interactivity.
 */

// Import main CSS bundle (all cards for demo page) using alias
import '@vc/theme-nativa/components/cards-all.css';

// Import JavaScript modules using aliases
import '@vc/core/lib/header-footer.js';
import '@vc/core/lib/card-manager.js';
import '@vc/core/lib/htmx-card-extension.js';
import '@vc/core/lib/fullscreen-manager.js';

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}

/**
 * Optional: Expose utility functions for runtime theme switching
 */
export const VanillaCards = {
  /**
   * Set theme (light/dark)
   * @param {'light' | 'dark'} theme
   */
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Set cookie for persistence (server-side theme)
    document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  },

  /**
   * Get current theme from cookie or DOM
   * @returns {'light' | 'dark'}
   */
  getTheme() {
    // Try cookie first
    const themeCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1];
    
    if (themeCookie && (themeCookie === 'light' || themeCookie === 'dark')) {
      return themeCookie;
    }
    
    // Fallback to DOM attribute
    return (
      document.documentElement.getAttribute('data-theme') || 'dark'
    );
  },

  /**
   * Toggle between light and dark themes via API
   */
  async toggleTheme() {
    try {
      const response = await fetch('/api/theme/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error('Theme toggle failed');
      }

      const data = await response.json();
      this.setTheme(data.theme);
    } catch (error) {
      console.error('[VanillaCards] Theme toggle error:', error);
    }
  },

  /**
   * Initialize system preference detection
   */
  initSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only apply if no cookie is set
      const hasCookie = document.cookie.includes('theme=');
      if (!hasCookie) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
  },
};

// Auto-initialize if desired
if (typeof window !== 'undefined') {
  window.VanillaCards = VanillaCards;
}

/**
 * Portfolio Filter - Search and category filtering
 */
const PortfolioFilter = {
  /**
   * Initialize portfolio filter
   */
  init() {
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (!portfolioGrid) return;

    let activeFilter = 'all';
    let searchQuery = '';

    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        this.filterProjects(portfolioGrid, activeFilter, searchQuery);
      });
    }

    // Filter button handlers
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove('portfolio-filter__btn--active'));
        button.classList.add('portfolio-filter__btn--active');

        // Update filter and apply
        activeFilter = button.dataset.filter;
        this.filterProjects(portfolioGrid, activeFilter, searchQuery);
      });
    });

    console.log('[PortfolioFilter] Initialized ✓');
  },

  /**
   * Filter projects by category and search query
   * @param {HTMLElement} grid - Portfolio grid element
   * @param {string} filter - Category filter
   * @param {string} search - Search query
   */
  filterProjects(grid, filter, search) {
    const cards = Array.from(grid.querySelectorAll('.card--project, .card--case-study, .card--client, .card--skill'));

    cards.forEach((card) => {
      const category = card.dataset.category || '';
      const title = card.querySelector('.card--project__title, .card--case-study__title, .card--client__quote, .card--skill__title')?.textContent || '';
      const description = card.querySelector('.card--project__description, .card--case-study__subtitle')?.textContent || '';
      const tech = Array.from(card.querySelectorAll('.card--project__tech-item, .card--skill__tag')).map((el) => el.textContent).join(' ');

      // Check category filter
      const matchesCategory = filter === 'all' ||
        category.toLowerCase().includes(filter) ||
        title.toLowerCase().includes(filter) ||
        tech.toLowerCase().includes(filter);

      // Check search query
      const matchesSearch = !search ||
        title.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search) ||
        tech.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search);

      // Show/hide card
      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        card.classList.remove('portfolio-card--hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('portfolio-card--hidden');
      }
    });
  },
};

// Initialize portfolio filter on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PortfolioFilter.init());
} else {
  PortfolioFilter.init();
}

// Export for external use
if (typeof window !== 'undefined') {
  window.PortfolioFilter = PortfolioFilter;
}
