/**
 * SectionLoader — Lazy-load sections via IntersectionObserver.
 *
 * Singleton that observes [data-section] elements with rootMargin: '200px'.
 * When a section enters the margin, dynamically imports the module,
 * instantiates the class (default export), calls .init(), and stops observing.
 *
 * Also subscribes to htmx:afterSwap for future-proof HTMX support.
 *
 * @example
 *   // In page init:
 *   const loader = SectionLoader.getInstance();
 *   loader.register('[data-section="hero"]', () => import('../sections/hero'));
 */

type SectionModule = { default: new (element: HTMLElement) => { init(): void } };
type LoaderFn = () => Promise<SectionModule>;

interface Registration {
  selector: string;
  loader: LoaderFn;
}

export class SectionLoader {
  private static instance: SectionLoader | null = null;
  private observer: IntersectionObserver | null = null;
  private registrations: Registration[] = [];
  private initializedElements = new WeakSet<HTMLElement>();

  static getInstance(): SectionLoader {
    if (!this.instance) {
      this.instance = new SectionLoader();
    }
    return this.instance;
  }

  private constructor() {
    // Subscribe to HTMX swaps (future-proof)
    if (typeof window !== 'undefined') {
      document.addEventListener('htmx:afterSwap', () => {
        this.observeAll();
      });
    }
  }

  /**
   * Register a section selector with its dynamic import loader.
   */
  register(selector: string, loader: LoaderFn): void {
    this.registrations.push({ selector, loader });
    this.observeAll();
  }

  /**
   * Create IntersectionObserver and observe all registered selectors.
   */
  private observeAll(): void {
    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const reg = this.registrations.find(
                (r) => element.matches(r.selector)
              );

              if (reg && !this.initializedElements.has(element)) {
                console.log(`[SectionLoader] Intersected ${reg.selector}, loading...`);
                this.initializedElements.add(element);
                reg.loader().then((module) => {
                  const SectionClass = module.default;
                  const section = new SectionClass(element);
                  section.init();
                  console.log(`[SectionLoader] ✓ ${reg.selector} initialized`);
                  this.observer?.unobserve(element);
                }).catch((err) => {
                  console.error(`[SectionLoader] Failed to load section for ${reg.selector}:`, err);
                });
              }
            }
          });
        },
        { rootMargin: '200px' }
      );
    }

    // Defer observation by one frame so CSS layout is complete
    requestAnimationFrame(() => {
      for (const reg of this.registrations) {
        const elements = document.querySelectorAll<HTMLElement>(reg.selector);
        console.log(`[SectionLoader] observeAll: ${reg.selector} → ${elements.length} element(s)`);
        elements.forEach((el) => {
          if (!this.initializedElements.has(el)) {
            this.observer?.observe(el);
            console.log(`[SectionLoader] Observing`, el.tagName, el.id || el.className?.split(' ').slice(0, 3).join(' '));
          }
        });
      }
    });
  }
}
