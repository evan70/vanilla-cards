/**
 * ListCard Component
 *
 * Cardboard list card for displaying items like recent articles, comments, etc.
 * Extends vanilla-card with list-specific functionality.
 *
 * @element list-card
 *
 * @attr {string} title - Card title
 * @attr {string} items - JSON array of items: [{title, meta, href}, ...]
 * @attr {string} view-all-url - URL for "View All" link
 * @attr {string} data-endpoint - API endpoint to fetch items
 * @attr {number} limit - Maximum number of items to display (default: 5)
 * @attr {boolean} loading - Loading state
 *
 * @example
 * ```html
 * <list-card
 *   title="Recent Articles"
 *   items='[{"title":"Article 1","meta":"1,234 views","href":"/article/1"}]'
 *   view-all-url="/articles"
 *   limit="5"
 * ></list-card>
 * ```
 */

import { VanillaCard } from '@vc/core';
import { escapeHtml } from '@vc/core/lib/escape-html';

export class ListCard extends VanillaCard {
  /**
   * Observed attributes
   */
  static get observedAttributes(): string[] {
    return [
      ...super.observedAttributes,
      'title',
      'items',
      'view-all-url',
      'data-endpoint',
      'limit',
      'loading'
    ];
  }

  /**
   * Card title
   */
  get title(): string {
    return this.getAttribute('title') || '';
  }

  set title(val: string) {
    this.setAttribute('title', val);
  }

  /**
   * Items as JSON string
   */
  get items(): Array<{ title: string; meta: string; href: string }> {
    const itemsAttr = this.getAttribute('items');
    if (!itemsAttr) return [];

    try {
      return JSON.parse(itemsAttr);
    } catch (e) {
      console.error('[ListCard] Invalid JSON for items', { error: e });
      return [];
    }
  }

  set items(val: Array<{ title: string; meta: string; href: string }>) {
    this.setAttribute('items', JSON.stringify(val));
  }

  /**
   * View All URL
   */
  get viewAllUrl(): string {
    return this.getAttribute('view-all-url') || '';
  }

  set viewAllUrl(val: string) {
    this.setAttribute('view-all-url', val);
  }

  /**
   * Data endpoint
   */
  get dataEndpoint(): string {
    return this.getAttribute('data-endpoint') || '';
  }

  set dataEndpoint(val: string) {
    this.setAttribute('data-endpoint', val);
  }

  /**
   * Item limit
   */
  get limit(): number {
    return parseInt(this.getAttribute('limit') || '5', 10);
  }

  set limit(val: number) {
    this.setAttribute('limit', String(val));
  }

  /**
   * Loading state
   */
  get loading(): boolean {
    return this.hasAttribute('loading');
  }

  set loading(val: boolean) {
    val ? this.setAttribute('loading', '') : this.removeAttribute('loading');
  }

  /**
   * Called when connected to DOM
   */
  connectedCallback(): void {
    // Set variant to list
    this.setAttribute('variant', 'list');

    // Call parent connectedCallback
    super.connectedCallback();

    // Fetch data if endpoint provided
    if (this.dataEndpoint) {
      this.fetchData();
    } else {
      // Render with provided items
      this.render();
    }

    console.info('[ListCard] Initialized', {
      title: this.title,
      itemCount: this.items.length
    });
  }

  /**
   * Called when attributes change
   */
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (oldValue === newValue) return;

    // Re-render on title, items, limit changes
    if (['title', 'items', 'limit'].includes(name)) {
      this.render();
    }

    // Handle data endpoint changes
    if (name === 'data-endpoint' && this.dataEndpoint) {
      this.fetchData();
    }
  }

  /**
   * Render the list card
   */
  render(): void {
    const items = this.items.slice(0, this.limit);
    const itemsHtml = items.map(item => this.renderItem(item)).join('');
    const escapedTitle = escapeHtml(this.title);
    const escapedViewAllUrl = this.escapeAttribute(this.viewAllUrl);
    const viewAllHtml = this.viewAllUrl
      ? `<a href="${escapedViewAllUrl}" class="card__header-link">View All</a>`
      : '';

    this.innerHTML = `
      <div class="card__header">
        <h2 class="card__title">${escapedTitle}</h2>
        ${viewAllHtml}
      </div>
      <ul class="card--list">
        ${itemsHtml}
      </ul>
    `;
  }

  /**
   * Render single list item
   */
  private renderItem(item: { title: string; meta: string; href: string }): string {
    const title = escapeHtml(item.title);
    const meta = escapeHtml(item.meta);
    const href = this.escapeAttribute(item.href || '#');

    return `
      <li class="card--list__item">
        <a href="${href}" class="card__list-link">
          <div class="card__list-item-content">
            <h3 class="card--list__item-title">${title}</h3>
            <div class="card--list__item-meta">
              <span class="card--list__item-meta-item">${meta}</span>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  /**
   * Fetch data from API
   */
  async fetchData(): Promise<void> {
    if (!this.dataEndpoint) {
      return;
    }

    this.loading = true;
    this.showLoading();

    try {
      const response = await fetch(this.dataEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.items = data.items || data;

      this.loading = false;
      this.hideLoading();
      this.render();

      this.dispatchEvent(new CustomEvent('list:loaded', {
        bubbles: true,
        detail: { data }
      }));

      console.info('[ListCard] Data loaded', { itemCount: this.items.length });
    } catch (error) {
      console.error('[ListCard] Fetch failed', { error });
      this.loading = false;
      this.hideLoading();

      this.dispatchEvent(new CustomEvent('list:error', {
        bubbles: true,
        detail: { error }
      }));
    }
  }

  /**
   * Show loading state
   */
  public showLoading(): void {
    this.innerHTML = `
      <div class="cardboard__loading-spinner" aria-label="Loading">
        <svg class="cardboard__spinner" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-dasharray="80"
            stroke-dashoffset="60"
          />
        </svg>
      </div>
    `;
  }

  /**
   * Hide loading state
   */
  public hideLoading(): void {
    // Content will be re-rendered
  }

  /**
   * Escape HTML attribute
   */
  private escapeAttribute(text: string): string {
    return escapeHtml(text)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Update items from external source
   */
  updateItems(items: Array<{ title: string; meta: string; href: string }>): void {
    this.items = items;
    this.render();
  }
}

// Register custom element
if (!customElements.get('list-card')) {
  customElements.define('list-card', ListCard);
}

// Export for programmatic use
export default ListCard;

// Declare global TypeScript types
declare global {
  interface HTMLElementTagNameMap {
    'list-card': ListCard;
  }

  interface HTMLElementEventMap {
    'list:loaded': CustomEvent<{ data: any }>;
    'list:error': CustomEvent<{ error: Error }>;
  }
}
