/**
 * Core Entry Point — Public Pages (frontend)
 *
 * Shared dependencies for ALL public pages.
 * - Core CSS (tokens, base cards, header, nav, footer, buttons, states)
 * - Card manager (lifecycle management)
 * - Theme toggle (light/dark, local mode, touch+click)
 * - Header scroll (scrolled state on scroll > 50px)
 *
 * Loaded via AssetHelper::js('core', 'vanilla-cards') in PHP templates.
 */

// Import core CSS
import '@vc/core/kernel/base/core.css';

// Import shared JS modules using aliases
import '@vc/core/lib/card-manager.js';
import '@vc/core/lib/theme-toggle';
import '@vc/core/lib/header-scroll';

// Mobile menu (auto-init on DOM ready)
import './mobile-menu';

console.info('[Core] Initialized ✓');

// Export for external use
export {};
