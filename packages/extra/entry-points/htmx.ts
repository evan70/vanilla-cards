/**
 * HTMX Library Entry Point
 *
 * Bundles HTMX from node_modules for local serving
 * No CDN dependency
 */

// Import HTMX from node_modules and attach to window
import htmx from 'htmx.org';

declare global {
  interface Window {
    htmx: any;
  }
}

// Export for external use
if (typeof window !== 'undefined') {
  (window as any).htmx = htmx;
  console.log('[HTMX] Loaded locally v' + htmx.version);
} else {
  console.warn('[HTMX] Failed to initialize - window not available');
}
