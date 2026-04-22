/**
 * Public Entry Point
 * Shared core CSS + base web components for public/frontend pages.
 *
 * Usage: Import this in public page templates for consistent styling.
 * For page-specific styles, use dedicated entry points (home, blog, etc.).
 */

// Shared core CSS (tokens + context + base cards + utilities)
import '@vc/core/kernel/base/core.css';

// Base web component
import '@components/vanilla-card';

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
