/**
 * Vanilla Cards Bootstrap - Basic Card Entry-Point
 * 
 * Minimal entry-point for basic card examples.
 * Imports only the core vanilla-card component and essential utilities.
 */

// Import core component
import { VanillaCard } from '@vc/core';

// Import utilities
import { RippleEffect } from '@vc/core/lib/ripple-effect';
import { onDomReady } from '@vc/core/lib/dom-ready';

/**
 * Initialize Vanilla Cards
 * Registers custom elements when DOM is ready
 */
function init(): void {
    // Register vanilla-card custom element
    if (!customElements.get('vanilla-card')) {
        customElements.define('vanilla-card', VanillaCard);
    }
    
    console.log('✅ Vanilla Cards Bootstrap initialized');
}

// Auto-initialize on DOM ready
onDomReady(init);

// Export for programmatic usage
export { VanillaCard, RippleEffect, init };
