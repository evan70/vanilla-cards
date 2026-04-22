import { escapeHtml } from '@vc/core/lib/escape-html';
import { createAutoRefresh, type AutoRefreshable } from '@vc/core/lib/auto-refresh';
import { VanillaCard } from '@vc/core';

/**
 * StatsCard Component
 *
 * Cardboard statistics card with icon, value, label, and optional trend indicator.
 * Extends vanilla-card with stats-specific functionality.
 *
 * @element stats-card
 */
export class StatsCard extends VanillaCard implements AutoRefreshable {
  /**
   * Observed attributes
   */
  static get observedAttributes(): string[] {
    return [
      ...super.observedAttributes,
      'title',
      'value',
      'label',
      'icon',
      'color',
      'trend',
      'trend-value',
      'data-endpoint',
      'refresh-url',
      'refresh-interval',
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
   * Main statistic value
   */
  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  /**
   * Label for the value
   */
  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(val: string) {
    this.setAttribute('label', val);
  }

  /**
   * Icon name or SVG
   */
  get icon(): string {
    return this.getAttribute('icon') || '';
  }

  set icon(val: string) {
    this.setAttribute('icon', val);
  }

  /**
   * Icon color
   */
  get color(): string {
    return this.getAttribute('color') || 'gold';
  }

  set color(val: string) {
    this.setAttribute('color', val);
  }

  /**
   * Trend value (e.g., "+12%")
   */
  get trend(): string {
    return this.getAttribute('trend') || '';
  }

  set trend(val: string) {
    this.setAttribute('trend', val);
  }

  /**
   * Trend direction ('up', 'down', 'neutral')
   */
  get trendDirection(): 'up' | 'down' | 'neutral' | '' {
    const attr = this.getAttribute('trend-direction') || this.getAttribute('trend-value');
    if (attr === 'up' || attr === 'down' || attr === 'neutral') {
      return attr;
    }
    return '';
  }

  set trendDirection(val: 'up' | 'down' | 'neutral' | '') {
    this.setAttribute('trend-direction', val);
  }

  /**
   * API endpoint to fetch data
   */
  get dataEndpoint(): string {
    return this.getAttribute('data-endpoint') || this.getAttribute('refresh-url') || '';
  }

  set dataEndpoint(val: string) {
    this.setAttribute('data-endpoint', val);
  }

  /**
   * Alias for dataEndpoint
   */
  get refreshUrl(): string {
    return this.dataEndpoint;
  }

  set refreshUrl(val: string) {
    this.dataEndpoint = val;
  }

  /**
   * Auto-refresh interval in ms
   */
  get refreshInterval(): number {
    return parseInt(this.getAttribute('refresh-interval') || '0', 10);
  }

  set refreshInterval(val: number) {
    this.setAttribute('refresh-interval', String(val));
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
   * Auto-refresh controller
   */
  private refreshController = createAutoRefresh(() => this.refresh());

  /**
   * Start auto-refresh
   */
  startAutoRefresh(interval: number): void {
    this.refreshController.startAutoRefresh(interval);
  }

  /**
   * Stop auto-refresh
   */
  stopAutoRefresh(): void {
    this.refreshController.stopAutoRefresh();
  }

  /**
   * Called when element is connected to DOM
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('card--stats');
    
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'stats');
    }

    this.render();
    
    if (this.refreshInterval > 0) {
      this.startAutoRefresh(this.refreshInterval);
    }

    this.addEventListener('refresh', () => this.render());
  }

  /**
   * Called when element is disconnected from DOM
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopAutoRefresh();
  }

  /**
   * Called when observed attributes change
   */
  override attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    const renderAttrs = [
      'title', 'value', 'label', 'icon', 'color', 
      'trend', 'trend-direction', 'loading'
    ];
    
    if (renderAttrs.includes(name)) {
      this.render();
    }

    if (name === 'data-endpoint' || name === 'refresh-url' || name === 'refresh-interval') {
      this.stopAutoRefresh();
      if (this.refreshInterval > 0) {
        this.startAutoRefresh(this.refreshInterval);
      }
    }
  }

  /**
   * Update component from data object
   */
  updateFromData(data: any): void {
    if (data.value !== undefined) this.value = String(data.value);
    if (data.label !== undefined) this.label = data.label;
    if (data.trend !== undefined) this.trend = data.trend;
    if (data.trendDirection !== undefined) this.trendDirection = data.trendDirection;
    this.render();
  }

  /**
   * Get CSS class for trend
   */
  private getTrendClass(): string {
    const dir = this.trendDirection;
    if (dir === 'up') return 'card--stats__trend--positive';
    if (dir === 'down') return 'card--stats__trend--negative';
    return 'card--stats__trend--neutral';
  }

  /**
   * Get Icon HTML
   */
  private getIconHtml(): string {
    const icon = this.icon;
    if (icon.trim().startsWith('<svg')) {
      // Add class to SVG if missing
      if (icon.includes('class=')) {
        return icon;
      }
      return icon.replace('<svg', '<svg class="card--stats__icon-svg"');
    }
    return `<i class="icon icon--${icon}"></i>`;
  }

  /**
   * Render the component
   */
  render(): void {
    const { 
      value, label, color, 
      trend, loading 
    } = this;

    const trendClass = this.getTrendClass();
    const iconHtml = this.getIconHtml();

    this.innerHTML = `
      <div class="card--stats__body ${loading ? 'card--stats__body--loading' : ''}">
        <div class="card--stats__icon card--stats__icon--${color}">
          ${iconHtml}
        </div>
        <div class="card--stats__content">
          <div class="card--stats__value">${escapeHtml(value)}</div>
          <div class="card--stats__label">${escapeHtml(label)}</div>
        </div>
        ${trend ? `
          <div class="card--stats__trend ${trendClass}">
            <span class="card--stats__trend-value">${escapeHtml(trend)}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Refresh the data from endpoint
   */
  async refresh(): Promise<void> {
    if (!this.dataEndpoint) return;

    this.loading = true;
    try {
      const response = await fetch(this.dataEndpoint);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      this.updateFromData(data);
      
      this.dispatchEvent(new CustomEvent('stats:refresh', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('stats:error', { detail: error }));
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

// Register custom element
if (!customElements.get('stats-card')) {
  customElements.define('stats-card', StatsCard);
}
