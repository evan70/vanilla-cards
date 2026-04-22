/**
 * Page Card - Entry Point
 *
 * Bootstrap page card orchestrator from data-* attributes.
 * Auto-initializes on DOM ready.
 */

import {
  PageCardController,
  normalizePageCardPayload,
  type PageCardConfig,
} from '@vc/core/lib/page-card';

/**
 * Find root element and initialize page card
 */
function init(): void {
  const root = document.querySelector<HTMLElement>('[data-page-card]');

  if (!root) {
    console.debug('[PageCard] No root element found, skipping initialization');
    return;
  }

  try {
    // Parse payload from data attribute
    const rawPayload = root.dataset.pagePayload
      ? JSON.parse(root.dataset.pagePayload)
      : {};

    // Normalize payload (handle snake_case, null, defaults)
    const pageData = normalizePageCardPayload(rawPayload);

    // Create configuration
    const config: PageCardConfig = {
      pageData,
    };

    // Initialize controller
    const controller = new PageCardController(root, config);
    controller.init();

    // Expose controller globally for debugging
    if (window.location.hostname === 'localhost') {
      (window as any).__PAGE_CARD__ = controller;
    }
  } catch (error) {
    console.error('[PageCard] Initialization error:', error);
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for external use
export { init, PageCardController };
export default init;
