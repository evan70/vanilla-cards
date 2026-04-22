/**
 * Vanilla Cards Web Component
 *
 * Lightweight custom element wrapper over BEM CSS structure.
 * No Shadow DOM for better SEO, accessibility, and CSS customization.
 *
 * @element vanilla-card
 *
 * @attr {string} variant - Card variant: 'elevated' | 'filled' | 'outlined' | 'horizontal' | 'stats' | 'list' | 'table' | 'chart' | 'actions' | 'form' | 'project' | 'header' | 'nav' | 'footer'
 * @attr {boolean} clickable - Whether the card is clickable
 * @attr {boolean} disabled - Whether the card is disabled
 * @attr {string} href - URL to navigate to (makes card a link)
 * @attr {number} tabindex - Tab index for focus order
 *
 * @slot - Default content slot
 * @slot media - Media slot (image, video) for horizontal variant
 * @slot content - Content slot for horizontal variant
 * @slot actions - Actions slot (buttons) for horizontal variant
 *
 * @event click - Fired when card is clicked
 * @event focus - Fired when card receives focus
 * @event blur - Fired when card loses focus
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <vanilla-card variant="elevated">
 *   <h3 class="card__title">Card Title</h3>
 *   <p class="card__description">Content...</p>
 * </vanilla-card>
 *
 * <!-- Cardboard stats card -->
 * <vanilla-card variant="stats">
 *   <div class="card--stats__icon">
 *     <svg><!-- SVG icon --></svg>
 *   </div>
 *   <p class="card--stats__value">1,234</p>
 *   <p class="card--stats__label">Total Views</p>
 * </vanilla-card>
 *
 * <!-- Admin header variant -->
 * <vanilla-card variant="header">
 *   <div class="card--header__inner">
 *     <!-- Header content -->
 *   </div>
 * </vanilla-card>
 *
 * <!-- Admin nav variant (mobile menu) -->
 * <vanilla-card variant="nav">
 *   <div class="card--nav-mobile__nav">
 *     <!-- Nav links -->
 *   </div>
 * </vanilla-card>
 *
 * <!-- Horizontal variant with media -->
 * <vanilla-card variant="horizontal">
 *   <img slot="media" src="image.jpg" alt="..." loading="lazy">
 *   <div slot="content">
 *     <h3>Card Title</h3>
 *     <p>Description...</p>
 *   </div>
 * </vanilla-card>
 *
 * <!-- Clickable with href -->
 * <vanilla-card clickable href="/article">
 *   <h3>Article Title</h3>
 * </vanilla-card>
 *
 * <!-- Tabindex handling (like MDUI) -->
 * <vanilla-card tabindex="-1" clickable>Focus via JS only</vanilla-card>
 * <vanilla-card tabindex="3" clickable>Third in tab order</vanilla-card>
 * ```
 */

import { RippleEffect } from '../lib/ripple-effect';

export type VanillaCardVariant = 
  | 'elevated' 
  | 'filled' 
  | 'outlined' 
  | 'horizontal' 
  | 'stats' 
  | 'list' 
  | 'table' 
  | 'chart' 
  | 'actions' 
  | 'form' 
  | 'project' 
  | 'header' 
  | 'nav' 
  | 'footer';

export class VanillaCard extends HTMLElement {
  /**
   * Observed attributes for attributeChangedCallback
   */
  static get observedAttributes(): string[] {
    return ['variant', 'clickable', 'disabled', 'href', 'tabindex'];
  }

  /**
   * Card variant
   */
  get variant(): VanillaCardVariant {
    const attr = this.getAttribute('variant');
    const validVariants = ['elevated', 'filled', 'outlined', 'horizontal', 'stats', 'list', 'table', 'chart', 'actions', 'form', 'project', 'header', 'nav', 'footer'];
    if (attr && validVariants.includes(attr)) {
      return attr as VanillaCardVariant;
    }
    return 'elevated';
  }

  set variant(val: VanillaCardVariant) {
    val ? this.setAttribute('variant', val) : this.removeAttribute('variant');
  }

  /**
   * Whether the card is clickable
   */
  get clickable(): boolean {
    return this.hasAttribute('clickable');
  }

  set clickable(val: boolean) {
    val ? this.setAttribute('clickable', '') : this.removeAttribute('clickable');
  }

  /**
   * Whether the card is disabled
   */
  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  /**
   * URL to navigate to (makes card a link)
   */
  get href(): string {
    return this.getAttribute('href') || '';
  }

  set href(val: string) {
    val ? this.setAttribute('href', val) : this.removeAttribute('href');
  }

  /**
   * Tab index for focus order
   */
  get tabindex(): number {
    return parseInt(this.getAttribute('tabindex') || '0', 10);
  }

  set tabindex(val: number) {
    this.setAttribute('tabindex', String(val));
  }

  /**
   * Called when element is connected to DOM
   */
  connectedCallback(): void {
    // Apply base classes
    this.classList.add('card', `card--${this.variant}`);

    // Apply state classes
    if (this.clickable) this.classList.add('card--clickable');
    if (this.disabled) this.classList.add('card--disabled');

    // Setup accessibility
    this.setupAccessibility();

    // Setup keyboard navigation
    if (this.clickable && !this.href) {
      this.addEventListener('keydown', this.handleKeydown);
    }

    // Setup ripple effect
    if (this.clickable && !this.disabled) {
      this.addEventListener('click', this.handleClick);
      RippleEffect.attach(this);
    }
  }

  /**
   * Called when element is disconnected from DOM
   */
  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeydown);
    this.removeEventListener('click', this.handleClick);
  }

  /**
   * Called when observed attributes change
   */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (oldValue === newValue) return;

    // Update variant classes
    if (name === 'variant') {
      this.classList.remove(
        'card--elevated',
        'card--filled',
        'card--outlined',
        'card--horizontal',
        'card--stats',
        'card--list',
        'card--table',
        'card--chart',
        'card--actions',
        'card--form',
        'card--project',
        'card--header',
        'card--nav',
        'card--footer'
      );
      this.classList.add(`card--${this.variant}`);
    }

    // Update clickable class
    if (name === 'clickable') {
      if (this.clickable) {
        this.classList.add('card--clickable');
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('click', this.handleClick);
      } else {
        this.classList.remove('card--clickable');
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('click', this.handleClick);
      }
    }

    // Update disabled class
    if (name === 'disabled') {
      if (this.disabled) {
        this.classList.add('card--disabled');
      } else {
        this.classList.remove('card--disabled');
      }
      this.setupAccessibility();
    }

    // Re-setup accessibility for any attribute change
    this.setupAccessibility();
  }

  /**
   * Get the element that should receive focus
   * Like MDUI: focusElement !== this when href exists
   */
  get focusElement(): HTMLElement | null {
    // If href exists and not disabled, focus the anchor
    if (this.href && !this.disabled) {
      const anchor = this.querySelector('a');
      return anchor || this;
    }

    // If tabindex is negative, focus the card itself
    if (this.tabindex < 0) {
      return this;
    }

    // Otherwise, return this (don't try to find focusable children)
    return this;
  }

  /**
   * Override focus to use focusElement
   */
  override focus(options?: FocusOptions): void {
    const target = this.focusElement;
    // Avoid infinite recursion when focusElement is this
    if (target && target !== this) {
      target.focus(options);
    } else {
      // Call native HTMLElement focus directly
      HTMLElement.prototype.focus.call(this, options);
    }
  }

  /**
   * Override blur to use focusElement
   */
  override blur(): void {
    const target = this.focusElement;
    // Avoid infinite recursion when focusElement is this
    if (target && target !== this) {
      target.blur();
    } else {
      // Call native HTMLElement blur directly
      HTMLElement.prototype.blur.call(this);
    }
  }

  /**
   * Setup accessibility attributes
   */
  private setupAccessibility(): void {
    // Set role
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'article');
    }

    // Set tabindex for clickable cards
    if (this.clickable && !this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Set aria-disabled
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  /**
   * Handle keyboard events
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    // Activate on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  };

  /**
   * Handle click events
   */
  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // If href exists, navigate
    if (this.href) {
      window.location.href = this.href;
    }
  };
}

// Register custom element
if (!customElements.get('vanilla-card')) {
  customElements.define('vanilla-card', VanillaCard);
}

// Export for programmatic use
export default VanillaCard;

// Declare global TypeScript types
declare global {
  interface HTMLElementTagNameMap {
    'vanilla-card': VanillaCard;
  }

  interface HTMLElementEventMap {
    'vanilla-card:focus': FocusEvent;
    'vanilla-card:blur': FocusEvent;
  }
}
