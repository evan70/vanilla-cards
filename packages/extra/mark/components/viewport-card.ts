import { escapeHtml } from '@vc/core/lib/escape-html';

/**
 * Viewport Card Web Component
 * Full-viewport hero/presentation card
 *
 * Usage:
 *   <viewport-card theme="dark" title="..." subtitle="...">
 *     <p>Custom content goes here</p>
 *   </viewport-card>
 *
 * @attr {string} theme - Card theme: 'dark' | 'light' | 'gradient'
 * @attr {string} title - Main title (h1)
 * @attr {string} subtitle - Subtitle text
 * @attr {string} description - Description text
 * @attr {string} background - Background image URL
 * @attr {boolean} overlay - Show overlay
 * @attr {string} overlay-theme - Overlay theme: 'dark' | 'light'
 * @attr {string} content-align - Content alignment: 'center' | 'start' | 'end'
 * @attr {boolean} scroll-indicator - Show scroll indicator
 * @attr {string} loading - Loading strategy: 'eager' | 'lazy' (default: 'lazy')
 */
export default class ViewportCard extends HTMLElement {
  static get observedAttributes(): string[] {
    return [
      'theme',
      'title',
      'subtitle',
      'description',
      'content-align',
      'background',
      'overlay',
      'overlay-theme',
      'loading',
    ];
  }

  private backgroundElement: HTMLDivElement | null = null;
  private overlayElement: HTMLDivElement | null = null;
  private contentElement: HTMLDivElement | null = null;
  private backgroundObserver: IntersectionObserver | null = null;
  private backgroundLoaded: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();

    // Lazy load background by default (performance optimization)
    const loading = this.getAttribute('loading') || 'lazy';
    if (loading === 'eager') {
      this.setupBackground();
    } else {
      this.lazyLoadBackground();
    }
  }

  disconnectedCallback(): void {
    // Cleanup observer
    if (this.backgroundObserver) {
      this.backgroundObserver.disconnect();
      this.backgroundObserver = null;
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (oldValue === newValue) return;

    if (name === 'theme') {
      this.updateTheme();
    } else if (name === 'title' || name === 'subtitle' || name === 'description') {
      this.updateContent();
    }
  }

  /**
   * Render the viewport card
   */
  private render(): void {
    const theme = this.getAttribute('theme') || 'dark';
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const description = this.getAttribute('description') || '';
    const contentAlign = this.getAttribute('content-align') || 'center';
    const hasBackground = this.hasAttribute('background');
    const hasOverlay = this.hasAttribute('overlay');

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
          overflow: hidden;
        }

        .viewport-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 3vw, 3rem);
          text-align: center;
        }

        .viewport-card--center {
          text-align: center;
          align-items: center;
        }

        .viewport-card--start {
          text-align: left;
          align-items: flex-start;
        }

        .viewport-card--end {
          text-align: right;
          align-items: flex-end;
        }

        /* Background */
        .viewport-card__background {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: scroll; /* Better mobile performance */
          z-index: 0;
          /* Loading state */
          background-color: var(--neutral-900, #1a1a1a);
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .viewport-card__background--loaded {
          opacity: 1;
        }

        .viewport-card__background--error {
          background: linear-gradient(
            135deg,
            var(--neutral-800, #2a2a2a) 0%,
            var(--neutral-900, #1a1a1a) 100%
          );
        }

        /* Overlay */
        .viewport-card__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .viewport-card__overlay--dark {
          background: rgba(0, 0, 0, 0.6);
        }

        .viewport-card__overlay--light {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Content */
        .viewport-card__content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .viewport-card__subtitle {
          display: block;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .viewport-card__title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 1.5rem;
        }

        .viewport-card__description {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          line-height: 1.6;
          opacity: 0.9;
          margin: 0 0 2.5rem;
        }

        /* Buttons */
        .viewport-card__buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .viewport-card__button {
          display: inline-block;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .viewport-card__button--primary {
          background: var(--brand-gold, #d4af37);
          color: var(--neutral-900, #1a1a1a);
        }

        .viewport-card__button--primary:hover {
          background: var(--brand-gold-dark, #b89628);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .viewport-card__button--secondary {
          background: transparent;
          color: var(--color-text, #ffffff);
          border-color: currentColor;
        }

        .viewport-card__button--secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .viewport-card__scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          animation: bounce 2s infinite;
        }

        .viewport-card__scroll-indicator svg {
          width: 2rem;
          height: 2rem;
          opacity: 0.7;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        /* Theme variants */
        .viewport-card--dark {
          color: #ffffff;
        }

        .viewport-card--light {
          color: #1a1a1a;
        }

        .viewport-card--gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
        }

        /* Custom content slot */
        .viewport-card__custom {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin-top: 3rem;
        }

        ::slotted(*) {
          margin: 0;
        }
      </style>

      <div class="viewport-card viewport-card--${theme} viewport-card--${contentAlign}">
        ${hasBackground ? `
          <div class="viewport-card__background"></div>
        ` : ''}
        
        ${hasOverlay ? `
          <div class="viewport-card__overlay viewport-card__overlay--${this.getAttribute('overlay-theme') || 'dark'}"></div>
        ` : ''}

        <div class="viewport-card__content">
          ${subtitle ? `
            <span class="viewport-card__subtitle">${escapeHtml(subtitle)}</span>
          ` : ''}
          
          ${title ? `
            <h1 class="viewport-card__title">${escapeHtml(title)}</h1>
          ` : ''}
          
          ${description ? `
            <p class="viewport-card__description">${escapeHtml(description)}</p>
          ` : ''}

          <slot name="buttons"></slot>
        </div>

        <slot name="custom"></slot>

        ${this.hasAttribute('scroll-indicator') ? `
          <div class="viewport-card__scroll-indicator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        ` : ''}
      </div>
    `;

    this.backgroundElement = this.shadowRoot!.querySelector('.viewport-card__background');
    this.overlayElement = this.shadowRoot!.querySelector('.viewport-card__overlay');
    this.contentElement = this.shadowRoot!.querySelector('.viewport-card__content');
  }

  /**
   * Lazy load background image using IntersectionObserver
   */
  private lazyLoadBackground(): void {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      this.setupBackground();
      return;
    }

    this.backgroundObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.backgroundLoaded) {
            this.backgroundLoaded = true;
            this.setupBackground();
            this.backgroundObserver?.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Load 200px before visible
        threshold: 0,
      }
    );

    this.backgroundObserver.observe(this);
  }

  /**
   * Setup background image
   */
  private setupBackground(): void {
    const background = this.getAttribute('background');
    if (background && this.backgroundElement) {
      // Create image to preload
      const img = new Image();
      img.onload = () => {
        this.backgroundElement!.style.backgroundImage = `url(${background})`;
        this.backgroundElement!.classList.add('viewport-card__background--loaded');
      };
      img.onerror = () => {
        console.warn('[ViewportCard] Failed to load background:', background);
        this.backgroundElement!.classList.add('viewport-card__background--error');
      };
      img.src = background;
    }
  }

  /**
   * Update theme classes
   */
  private updateTheme(): void {
    const card = this.shadowRoot!.querySelector('.viewport-card');
    if (card) {
      card.className = `viewport-card viewport-card--${this.getAttribute('theme') || 'dark'} viewport-card--${this.getAttribute('content-align') || 'center'}`;
    }
  }

  /**
   * Update text content
   */
  private updateContent(): void {
    const subtitleEl = this.shadowRoot!.querySelector('.viewport-card__subtitle') as HTMLElement;
    const titleEl = this.shadowRoot!.querySelector('.viewport-card__title') as HTMLElement;
    const descriptionEl = this.shadowRoot!.querySelector('.viewport-card__description') as HTMLElement;

    const subtitle = this.getAttribute('subtitle') || '';
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';

    if (subtitleEl) {
      subtitleEl.textContent = subtitle;
      subtitleEl.style.display = subtitle ? 'block' : 'none';
    }

    if (titleEl) {
      titleEl.textContent = title;
    }

    if (descriptionEl) {
      descriptionEl.textContent = description;
      descriptionEl.style.display = description ? 'block' : 'none';
    }
  }

}

// Register custom element
if (!customElements.get('viewport-card')) {
  customElements.define('viewport-card', ViewportCard);
}
