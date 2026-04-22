/**
 * Navigation - Vanilla Cards Entry Point
 *
 * Mobile menu, header scroll effects, and navigation enhancements
 */

// Import header-footer module using alias
import '@vc/core/lib/header-footer.js';

/**
 * Navigation enhancements
 */
const Navigation = {
  /**
   * Initialize navigation modules
   */
  init(): void {
    console.info('[Navigation] Initialized ✓');
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
  Navigation.init();
}

// Export for external use
export { Navigation };
