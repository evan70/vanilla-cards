/**
 * ObserverPool — shared IntersectionObserver factory and lifecycle manager.
 *
 * Prevents creating dozens of observers; reuses them with tracked targets.
 * Auto-cleans on disconnect.
 *
 * @example
 *   const pool = new ObserverPool();
 *   pool.observe(element, { onReveal: (el) => el.classList.add('in') });
 *   pool.destroy(); // cleans all observers
 */

interface ObserverEntry {
  observer: IntersectionObserver;
  targets: WeakSet<Element>;
}

interface ObserveOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  onReveal: (el: Element) => void;
  once?: boolean;
}

export class ObserverPool {
  private entries: ObserverEntry[] = [];

  /**
   * Observe an element with reveal callback.
   */
  observe(el: Element, options: ObserveOptions): void {
    const config: IntersectionObserverInit = {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.rootMargin ?? '0px',
      root: options.root ?? null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          options.onReveal(entry.target);
          if (options.once) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, config);

    observer.observe(el);

    // Track for cleanup
    const existing = this.entries.find(e => e.observer === observer);
    if (!existing) {
      this.entries.push({ observer, targets: new WeakSet([el]) });
    } else {
      existing.targets.add(el);
    }
  }

  /**
   * Observe multiple elements with the same options.
   */
  observeAll(els: Iterable<Element>, options: ObserveOptions): void {
    for (const el of els) {
      this.observe(el, options);
    }
  }

  /**
   * Stop observing a specific element.
   */
  unobserve(el: Element): void {
    for (const entry of this.entries) {
      if (entry.targets.has(el)) {
        entry.observer.unobserve(el);
        entry.targets.delete(el);
      }
    }
  }

  /**
   * Destroy all observers.
   */
  destroy(): void {
    for (const entry of this.entries) {
      entry.observer.disconnect();
    }
    this.entries = [];
  }

  /**
   * Get count of active observers (debug).
   */
  count(): number {
    return this.entries.length;
  }
}
