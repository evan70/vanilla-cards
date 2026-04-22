/**
 * Ripple Effect
 * 
 * Lightweight Material Design-style ripple effect for clickable elements.
 * No dependencies, ~1kB gzipped.
 * 
 * @example
 * ```typescript
 * import { RippleEffect } from './lib/ripple-effect';
 * 
 * // Attach to element
 * RippleEffect.attach(buttonElement);
 * 
 * // Or auto-attach via data attribute
 * <button data-ripple>Click Me</button>
 * RippleEffect.attachAll();
 * ```
 */

export class RippleEffect {
  /**
   * CSS for ripple animation (injected once)
   */
  private static readonly STYLES = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .vanilla-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      overflow: hidden;
    }

    [data-theme="dark"] .vanilla-ripple {
      background: rgba(255, 255, 255, 0.2);
    }
  `;

  /**
   * Track if styles have been injected
   */
  private static stylesInjected = false;

  /**
   * Inject ripple styles into document head
   */
  private static injectStyles(): void {
    if (this.stylesInjected) return;

    const style = document.createElement('style');
    style.id = 'vanilla-ripple-styles';
    style.textContent = this.STYLES;
    document.head.appendChild(style);
    this.stylesInjected = true;
  }

  /**
   * Attach ripple effect to an element
   * 
   * @param element - The element to attach ripple to
   * @param options - Ripple options
   * 
   * @example
   * ```typescript
   * const button = document.querySelector('button');
   * RippleEffect.attach(button);
   * ```
   */
  static attach(element: HTMLElement, _options: RippleOptions = {}): void {
    // Inject styles if not already done
    this.injectStyles();

    // Store cleanup function
    const cleanup = () => {
      element.removeEventListener('click', this.createRipple);
      element.removeEventListener('keydown', this.handleKeydown);
    };

    // Store cleanup on element for later removal
    (element as any).__rippleCleanup = cleanup;

    // Attach click handler
    element.addEventListener('click', this.createRipple);

    // Attach keyboard handler (ripple on Enter/Space)
    element.addEventListener('keydown', this.handleKeydown);

    // Handle element removal
    const observer = new MutationObserver((mutations) => {
      for (const _mutation of mutations) {
        if (!document.contains(element)) {
          cleanup();
          observer.disconnect();
          break;
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * Attach ripple to all elements with [data-ripple] attribute
   * 
   * @example
   * ```typescript
   * RippleEffect.attachAll();
   * 
   * // HTML
   * <button data-ripple>Click Me</button>
   * ```
   */
  static attachAll(): void {
    document.querySelectorAll('[data-ripple]').forEach((element) => {
      if (element instanceof HTMLElement) {
        this.attach(element);
      }
    });
  }

  /**
   * Remove ripple effect from an element
   * 
   * @param element - The element to remove ripple from
   */
  static detach(element: HTMLElement): void {
    const cleanup = (element as any).__rippleCleanup;
    if (cleanup) {
      cleanup();
      delete (element as any).__rippleCleanup;
    }
  }

  /**
   * Create ripple effect on click
   */
  private static createRipple = (event: MouseEvent): void => {
    const element = event.currentTarget as HTMLElement;
    if (!element) return;

    // Check for custom color from data attribute or options
    const customColor = element.dataset.rippleColor;
    const customDuration = element.dataset.rippleDuration;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'vanilla-ripple';

    // Calculate size and position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Apply styles
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      ${customColor ? `background: ${customColor} !important;` : ''}
      ${customDuration ? `animation-duration: ${customDuration}ms;` : ''}
    `;

    // Ensure element has relative positioning
    const position = getComputedStyle(element).position;
    if (position === 'static') {
      element.style.position = 'relative';
    }

    // Ensure overflow is hidden
    const overflow = getComputedStyle(element).overflow;
    if (overflow === 'visible') {
      element.style.overflow = 'hidden';
    }

    // Append ripple
    element.appendChild(ripple);

    // Remove ripple after animation
    const duration = customDuration ? parseInt(customDuration, 10) : 600;
    setTimeout(() => {
      ripple.remove();
    }, duration);
  };

  /**
   * Handle keyboard events (trigger ripple on Enter/Space)
   */
  private static handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      const element = event.currentTarget as HTMLElement;
      if (!element) return;

      // Simulate click to trigger ripple
      element.click();
    }
  };
}

/**
 * Ripple effect options
 */
export interface RippleOptions {
  /**
   * Color of the ripple (default: auto-detect from theme)
   */
  color?: string;

  /**
   * Duration of the ripple animation in ms (default: 600)
   */
  duration?: number;

  /**
   * Scale factor for the ripple (default: 4)
   */
  scale?: number;
}

// Auto-attach on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      RippleEffect.attachAll();
    });
  } else {
    RippleEffect.attachAll();
  }
}

export default RippleEffect;
