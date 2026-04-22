/**
 * Cardboard - Cardboard Card Container Component
 *
 * Extends vanilla-card with cardboard-specific functionality:
 * - Auto-grid layout management
 * - Auto-refresh from API endpoints
 * - Data binding
 * - Loading states
 * - Error handling
 *
 * @element cardboard-panel
 *
 * @attr {string} type - Cardboard type: 'stats' | 'list' | 'table' | 'chart' | 'actions'
 * @attr {string} refresh-url - URL for auto-refresh API endpoint
 * @attr {number} refresh-interval - Refresh interval in milliseconds (default: 30000)
 * @attr {string} data-endpoint - API endpoint for initial data binding
 * @attr {boolean} auto-refresh - Enable/disable auto-refresh (default: false)
 * @attr {string} loading-state - Loading state display: 'spinner' | 'skeleton' | 'none'
 *
 * @event cardboard:refresh - Fired when card refreshes data
 * @event cardboard:error - Fired when data fetch fails
 * @event cardboard:loaded - Fired when initial data is loaded
 *
 * @example
 * ```html
 * <!-- Stats card with auto-refresh -->
 * <cardboard-panel
 *   type="stats"
 *   refresh-url="/api/stats/views"
 *   refresh-interval="30000"
 *   auto-refresh
 * >
 *   <div class="card--stats__icon">
 *     <svg><!-- Icon --></svg>
 *   </div>
 *   <p class="card--stats__value">--</p>
 *   <p class="card--stats__label">Total Views</p>
 * </cardboard-panel>
 *
 * <!-- List card with data binding -->
 * <cardboard-panel
 *   type="list"
 *   data-endpoint="/api/articles/recent"
 *   loading-state="skeleton"
 * >
 *   <!-- Content will be populated from API -->
 * </cardboard-panel>
 * ```
 */

export class CardboardPanel extends HTMLElement {
  /**
   * Observed attributes for attributeChangedCallback
   */
  static get observedAttributes(): string[] {
    return [
      'type',
      'refresh-url',
      'refresh-interval',
      'data-endpoint',
      'auto-refresh',
      'loading-state'
    ];
  }

  /**
   * Cardboard type
   */
  get type(): 'stats' | 'list' | 'table' | 'chart' | 'actions' {
    const attr = this.getAttribute('type');
    const validTypes = ['stats', 'list', 'table', 'chart', 'actions'];
    if (attr && validTypes.includes(attr)) {
      return attr as any;
    }
    return 'stats';
  }

  set type(val: 'stats' | 'list' | 'table' | 'chart' | 'actions') {
    this.setAttribute('type', val);
  }

  /**
   * Refresh URL for auto-refresh
   */
  get refreshUrl(): string {
    return this.getAttribute('refresh-url') || '';
  }

  set refreshUrl(val: string) {
    val ? this.setAttribute('refresh-url', val) : this.removeAttribute('refresh-url');
  }

  /**
   * Refresh interval in milliseconds
   */
  get refreshInterval(): number {
    return parseInt(this.getAttribute('refresh-interval') || '30000', 10);
  }

  set refreshInterval(val: number) {
    this.setAttribute('refresh-interval', String(val));
  }

  /**
   * Data endpoint for initial binding
   */
  get dataEndpoint(): string {
    return this.getAttribute('data-endpoint') || '';
  }

  set dataEndpoint(val: string) {
    val ? this.setAttribute('data-endpoint', val) : this.removeAttribute('data-endpoint');
  }

  /**
   * Auto-refresh enabled
   */
  get autoRefresh(): boolean {
    return this.hasAttribute('auto-refresh');
  }

  set autoRefresh(val: boolean) {
    val ? this.setAttribute('auto-refresh', '') : this.removeAttribute('auto-refresh');
  }

  /**
   * Loading state display mode
   */
  get loadingState(): 'spinner' | 'skeleton' | 'none' {
    const attr = this.getAttribute('loading-state');
    if (attr === 'skeleton' || attr === 'none') {
      return attr;
    }
    return 'spinner';
  }

  set loadingState(val: 'spinner' | 'skeleton' | 'none') {
    this.setAttribute('loading-state', val);
  }

  /**
   * Refresh interval timer ID
   */
  private refreshTimerId: number | null = null;

  /**
   * Loading state
   */
  private isLoading: boolean = false;

  /**
   * Unique card ID for tracking
   */
  private cardId: string = '';

  /**
   * Called when element is connected to DOM
   */
  connectedCallback(): void {
    // Generate unique ID if not provided
    this.cardId = this.id || `cardboard-${Math.random().toString(36).substr(2, 9)}`;
    if (!this.id) {
      this.id = this.cardId;
    }

    // Apply base classes
    this.classList.add('cardboard', `cardboard--${this.type}`);

    // Setup loading state
    if (this.loadingState !== 'none') {
      this.showLoading();
    }

    // Fetch initial data if endpoint provided
    if (this.dataEndpoint) {
      this.fetchData();
    }

    // Setup auto-refresh
    if (this.autoRefresh && this.refreshUrl) {
      this.startAutoRefresh();
    }

    console.info('[CardboardPanel] Initialized', {
      id: this.cardId,
      type: this.type,
      autoRefresh: this.autoRefresh,
      refreshInterval: this.refreshInterval
    });
  }

  /**
   * Called when element is disconnected from DOM
   */
  disconnectedCallback(): void {
    this.stopAutoRefresh();
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

    // Update type classes
    if (name === 'type') {
      this.classList.remove(
        'cardboard--stats',
        'cardboard--list',
        'cardboard--table',
        'cardboard--chart',
        'cardboard--actions'
      );
      this.classList.add(`cardboard--${this.type}`);
    }

    // Handle auto-refresh changes
    if (name === 'auto-refresh') {
      if (this.autoRefresh && this.refreshUrl) {
        this.startAutoRefresh();
      } else {
        this.stopAutoRefresh();
      }
    }

    // Handle refresh URL changes
    if (name === 'refresh-url') {
      if (this.autoRefresh) {
        this.stopAutoRefresh();
        if (this.refreshUrl) {
          this.startAutoRefresh();
        }
      }
    }
  }

  /**
   * Fetch data from endpoint
   */
  async fetchData(): Promise<void> {
    if (!this.dataEndpoint || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.showLoading();

    try {
      const response = await fetch(this.dataEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.updateContent(data);
      this.hideLoading();

      this.dispatchEvent(new CustomEvent('cardboard:loaded', {
        bubbles: true,
        detail: { data }
      }));

      console.info('[CardboardPanel] Data loaded', { id: this.cardId });
    } catch (error) {
      this.handleError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Refresh data from refresh URL
   */
  async refreshData(): Promise<void> {
    if (!this.refreshUrl || this.isLoading) {
      return;
    }

    this.isLoading = true;

    try {
      const response = await fetch(this.refreshUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.updateContent(data);

      this.dispatchEvent(new CustomEvent('cardboard:refresh', {
        bubbles: true,
        detail: { data }
      }));

      console.debug('[CardboardPanel] Data refreshed', { id: this.cardId });
    } catch (error) {
      this.handleError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Update card content with data
   * Override this method in subclasses for custom rendering
   */
  protected updateContent(data: any): void {
    // Default implementation - override in subclasses
    console.debug('[CardboardPanel] Update content', { id: this.cardId, data });
  }

  /**
   * Handle errors
   */
  protected handleError(error: Error): void {
    console.error('[CardboardPanel] Error', {
      id: this.cardId,
      error: error.message
    });

    this.dispatchEvent(new CustomEvent('cardboard:error', {
      bubbles: true,
      detail: { error }
    }));

    // Show error state
    this.classList.add('cardboard--error');
  }

  /**
   * Show loading indicator
   */
  protected showLoading(): void {
    if (this.loadingState === 'spinner') {
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
    } else if (this.loadingState === 'skeleton') {
      this.innerHTML = `
        <div class="cardboard__loading-skeleton">
          <div class="skeleton__line skeleton__line--wide"></div>
          <div class="skeleton__line"></div>
          <div class="skeleton__line skeleton__line--narrow"></div>
        </div>
      `;
    }
  }

  /**
   * Hide loading indicator
   */
  protected hideLoading(): void {
    const loader = this.querySelector('.cardboard__loading-spinner, .cardboard__loading-skeleton');
    if (loader) {
      loader.remove();
    }
    this.classList.remove('cardboard--error');
  }

  /**
   * Start auto-refresh timer
   */
  private startAutoRefresh(): void {
    if (this.refreshTimerId) {
      return;
    }

    this.refreshTimerId = window.setInterval(() => {
      this.refreshData();
    }, this.refreshInterval);

    console.debug('[CardboardPanel] Auto-refresh started', {
      id: this.cardId,
      interval: this.refreshInterval
    });
  }

  /**
   * Stop auto-refresh timer
   */
  private stopAutoRefresh(): void {
    if (this.refreshTimerId) {
      clearInterval(this.refreshTimerId);
      this.refreshTimerId = null;
      console.debug('[CardboardPanel] Auto-refresh stopped', { id: this.cardId });
    }
  }

  /**
   * Manually trigger refresh
   */
  refresh(): Promise<void> {
    return this.refreshData();
  }
}

// Register custom element
if (!customElements.get('cardboard-panel')) {
  customElements.define('cardboard-panel', CardboardPanel);
}

// Export for programmatic use
export default CardboardPanel;

// Declare global TypeScript types
declare global {
  interface HTMLElementTagNameMap {
    'cardboard-panel': CardboardPanel;
  }

  interface HTMLElementEventMap {
    'cardboard:refresh': CustomEvent<{ data: any }>;
    'cardboard:error': CustomEvent<{ error: Error }>;
    'cardboard:loaded': CustomEvent<{ data: any }>;
  }
}
