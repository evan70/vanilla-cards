/**
 * BaseSection — Abstract base class for all page sections.
 *
 * Provides common patterns:
 * - Element reference and lifecycle (init)
 * - IntersectionObserver helper for scroll-triggered animations
 * - HTMX re-observation support via SectionLoader
 *
 * All section classes should extend this and implement `init()`.
 *
 * @example
 *   export class HeroSection extends BaseSection {
 *     init(): void {
 *       this.observe('.hero-title', { threshold: 0.3 }, (el) => {
 *         el.classList.add('is-visible');
 *       });
 *     }
 *   }
 */

export abstract class BaseSection {
  constructor(protected element: HTMLElement) {}

  /**
   * Initialize the section. Called by SectionLoader after dynamic import.
   * Subclasses must implement their setup logic here.
   */
  abstract init(): void;

  /**
   * Check if an element is currently visible in the viewport.
   * Uses a simple bounding-box check — no ratio calculation, no NaN risk.
   */
  protected isInViewport(el: Element, threshold = 0): boolean {
    const rect = el.getBoundingClientRect();
    const height = rect.height || (el as HTMLElement).offsetHeight || 0;
    if (height === 0) return false; // Element not rendered yet

    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const ratio = visibleHeight / height;

    return ratio >= threshold && rect.bottom > 0 && rect.top < window.innerHeight;
  }

  /**
   * Create an IntersectionObserver for one or more elements within this section.
   * Automatically stops observing after the callback fires once per element.
   *
   * Checks visibility synchronously (before hiding) to avoid flash of hidden content.
   * Falls back to IntersectionObserver for elements that enter later.
   *
   * @param selector - CSS selector for elements to observe
   * @param options - IntersectionObserver options
   * @param callback - Function called when element enters viewport
   * @param immediate - If true, trigger immediately for elements already visible
   */
  protected observe(
    selector: string,
    options: IntersectionObserverInit,
    callback: (element: Element, entry: IntersectionObserverEntry) => void,
    immediate = true
  ): void {
    const elements = this.element.querySelectorAll(selector);
    if (elements.length === 0) return;

    const threshold = 'threshold' in options ? (options.threshold as number) : 0;

    elements.forEach((el) => {
      // Check visibility NOW (before any hiding happens)
      if (immediate && this.isInViewport(el, threshold)) {
        callback(el, {} as IntersectionObserverEntry);
        return;
      }

      // Not visible yet — observe for later
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target, entry);
            observer.unobserve(entry.target);
          }
        });
      }, options);

      requestAnimationFrame(() => {
        observer.observe(el);
      });
    });
  }

  /**
   * Observe the section element itself (not children).
   *
   * @param options - IntersectionObserver options
   * @param callback - Function called when section enters viewport
   */
  protected observeSelf(
    options: IntersectionObserverInit,
    callback: (element: HTMLElement, entry: IntersectionObserverEntry) => void
  ): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(this.element, entry);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    requestAnimationFrame(() => {
      observer.observe(this.element);
    });
  }

  /**
   * Trigger callback immediately if element is in viewport, otherwise observe.
   *
   * @param options - IntersectionObserver options
   * @param callback - Function called when section is/was in viewport
   */
  protected observeSelfImmediate(
    options: IntersectionObserverInit,
    callback: (element: HTMLElement, entry: IntersectionObserverEntry) => void
  ): void {
    requestAnimationFrame(() => {
      if (this.isInViewport(this.element, 0)) {
        callback(this.element, {} as IntersectionObserverEntry);
        return;
      }

      this.observeSelf(options, callback);
    });
  }
}
