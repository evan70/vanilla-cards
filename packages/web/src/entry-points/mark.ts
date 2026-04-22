/**
 * Mark Entry Point
 * Shared core + mark context + cardboard components + mark web components.
 *
 * Usage: Import this in mark/admin page templates for consistent styling.
 * For page-specific styles, use dedicated entry points (mark-cardboard, mark-header, etc.).
 */

// Mark bundle CSS (tokens + context + components + utilities)
import '@mark-styles/index.css';

// Base web component
import '@components/vanilla-card';

// Mark-specific web components
import '@mark-components/cardboard';
import '@mark-components/stats-card';
import '@mark-components/list-card';
import '@mark-components/table-card';
import '@mark-components/chart-card';
import '@mark-components/viewport-card';

// Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
