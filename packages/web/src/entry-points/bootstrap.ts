/**
 * Vanilla Cards Bootstrap Entry-Point
 *
 * Minimal entry-point for quick project setup.
 * Includes only essential components for getting started.
 *
 * @package vanilla-cards/bootstrap
 * @version 1.0.0
 */

// Import core component
import { VanillaCard } from '@vc/core';

// Import essential utilities
import { RippleEffect } from '@vc/core/lib/ripple-effect';
import { onDomReady } from '@vc/core/lib/dom-ready';
import { escapeHtml } from '@vc/core/lib/escape-html';

/**
 * Initialize Vanilla Cards Bootstrap
 * Registers all bootstrap components when DOM is ready
 */
function init(): void {
    // Register vanilla-card custom element
    if (!customElements.get('vanilla-card')) {
        customElements.define('vanilla-card', VanillaCard);
    }

    console.log('Vanilla Cards Bootstrap initialized');
    console.log('Documentation: BOOTSTRAP_GUIDE.md');
    console.log('Examples: examples/bootstrap/');
}

// Auto-initialize on DOM ready
onDomReady(init);

// Export for programmatic usage
export {
    VanillaCard,
    RippleEffect,
    escapeHtml,
    onDomReady,
    init
};

// Export types for TypeScript users
export type { VanillaCardVariant } from '@vc/core';
