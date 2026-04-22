/**
 * ChartCard Component
 *
 * Cardboard chart card for displaying data visualizations.
 * Extends vanilla-card with chart-specific functionality.
 * Supports Chart.js, ApexCharts, or custom canvas/SVG charts.
 *
 * @element chart-card
 *
 * @attr {string} title - Card title
 * @attr {string} type - Chart type: 'line', 'bar', 'pie', 'doughnut', 'area'
 * @attr {string} data - Chart data as JSON
 * @attr {string} options - Chart options as JSON
 * @attr {string} data-endpoint - API endpoint to fetch chart data
 * @attr {number} refresh-interval - Auto-refresh interval in ms
 * @attr {boolean} animated - Enable animations (default: true)
 * @attr {boolean} loading - Loading state
 *
 * @example
 * ```html
 * <chart-card
 *   title="Views Trend"
 *   type="line"
 *   data='{"labels":["Jan","Feb"],"datasets":[{"label":"Views","data":[100,200]}]}'
 *   refresh-interval="60000"
 * ></chart-card>
 * ```
 */

import { VanillaCard } from '@vc/core';
import { escapeHtml } from '@vc/core/lib/escape-html';

interface ChartData {
  labels?: string[];
  datasets: Array<{
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    [key: string]: any;
  }>;
  [key: string]: any;
}

export class ChartCard extends VanillaCard {
  /**
   * Observed attributes
   */
  static get observedAttributes(): string[] {
    return [
      ...super.observedAttributes,
      'title',
      'type',
      'data',
      'options',
      'data-endpoint',
      'refresh-interval',
      'animated',
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
   * Chart type
   */
  get type(): 'line' | 'bar' | 'pie' | 'doughnut' | 'area' {
    const attr = this.getAttribute('type');
    const validTypes = ['line', 'bar', 'pie', 'doughnut', 'area'];
    if (attr && validTypes.includes(attr)) {
      return attr as any;
    }
    return 'line';
  }

  set type(val: 'line' | 'bar' | 'pie' | 'doughnut' | 'area') {
    this.setAttribute('type', val);
  }

  /**
   * Chart data
   */
  get data(): ChartData {
    const dataAttr = this.getAttribute('data');
    if (!dataAttr) {
      return { labels: [], datasets: [] };
    }

    try {
      return JSON.parse(dataAttr);
    } catch (e) {
      console.error('[ChartCard] Invalid JSON for data', { error: e });
      return { labels: [], datasets: [] };
    }
  }

  set data(val: ChartData) {
    this.setAttribute('data', JSON.stringify(val));
  }

  /**
   * Chart options
   */
  get options(): any {
    const optionsAttr = this.getAttribute('options');
    if (!optionsAttr) return {};

    try {
      return JSON.parse(optionsAttr);
    } catch (e) {
      console.error('[ChartCard] Invalid JSON for options', { error: e });
      return {};
    }
  }

  set options(val: any) {
    this.setAttribute('options', JSON.stringify(val));
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
   * Refresh interval
   */
  get refreshInterval(): number {
    return parseInt(this.getAttribute('refresh-interval') || '60000', 10);
  }

  set refreshInterval(val: number) {
    this.setAttribute('refresh-interval', String(val));
  }

  /**
   * Animated
   */
  get animated(): boolean {
    return !this.hasAttribute('animated') || this.getAttribute('animated') !== 'false';
  }

  set animated(val: boolean) {
    val ? this.removeAttribute('animated') : this.setAttribute('animated', 'false');
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
   * Chart instance (Chart.js or ApexCharts)
   */
  private chartInstance: any = null;

  /**
   * Canvas element
   */
  private canvas: HTMLCanvasElement | null = null;

  /**
   * Refresh timer
   */
  private refreshTimerId: number | null = null;

  /**
   * Called when connected to DOM
   */
  connectedCallback(): void {
    // Set variant to chart
    this.setAttribute('variant', 'chart');

    // Call parent connectedCallback
    super.connectedCallback();

    // Render chart
    this.render();

    // Fetch data if endpoint provided
    if (this.dataEndpoint) {
      this.fetchData();
    }

    // Setup auto-refresh
    if (this.refreshInterval > 0) {
      this.startAutoRefresh();
    }

    console.info('[ChartCard] Initialized', {
      title: this.title,
      type: this.type
    });
  }

  /**
   * Called when disconnected from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.destroyChart();
    this.stopAutoRefresh();
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

    // Re-render on data changes
    if (['title', 'type', 'data', 'options'].includes(name)) {
      this.render();
    }

    // Handle data endpoint changes
    if (name === 'data-endpoint' && this.dataEndpoint) {
      this.fetchData();
    }
  }

  /**
   * Render the chart card
   */
  render(): void {
    const canvasId = `chart-${this.id || Math.random().toString(36).substr(2, 9)}`;

    const escapedTitle = escapeHtml(this.title);

    this.innerHTML = `
      <div class="card__header">
        <h2 class="card__title">${escapedTitle}</h2>
      </div>
      <div class="card__content">
        <div class="card--chart__container">
          <canvas id="${canvasId}"></canvas>
        </div>
      </div>
    `;

    // Initialize chart after DOM is updated
    setTimeout(() => {
      this.canvas = this.querySelector('canvas');
      console.debug('[ChartCard] Canvas found:', !!this.canvas);
      if (this.canvas) {
        this.initChart();
      }
    }, 50);
  }

  /**
   * Initialize chart
   */
  private initChart(): void {
    if (!this.canvas) return;

    // Destroy existing chart
    this.destroyChart();

    // Wait for Chart.js to be available
    const tryInitChart = () => {
      // Try to use Chart.js if available
      if (typeof (window as any).Chart !== 'undefined') {
        this.initChartJs();
      }
      // Try ApexCharts if available
      else if (typeof (window as any).ApexCharts !== 'undefined') {
        this.initApexCharts();
      }
      // Fallback to simple canvas drawing
      else {
        this.initFallbackChart();
      }
    };

    // Try immediately
    tryInitChart();

    // If still no chart, try again after a short delay
    if (!this.chartInstance) {
      setTimeout(tryInitChart, 100);
    }
  }

  /**
   * Initialize Chart.js chart
   */
  private initChartJs(): void {
    const Chart = (window as any).Chart;

    console.debug('[ChartCard] initChartJs called', { 
      hasChart: !!Chart,
      hasCanvas: !!this.canvas,
      hasData: !!this.data 
    });

    if (!Chart || !this.canvas) {
      console.warn('[ChartCard] Chart.js or canvas not available');
      return;
    }

    const config = {
      type: this.type === 'area' ? 'line' : this.type,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          enabled: this.animated
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        ...this.options
      }
    };

    // Special handling for area chart
    if (this.type === 'area') {
      config.options.scales = {
        y: {
          beginAtZero: true,
          ...config.options.scales
        }
      };

      // Add fill to datasets
      config.data.datasets.forEach((dataset: any) => {
        dataset.fill = true;
        dataset.backgroundColor = dataset.backgroundColor || 'rgba(212, 175, 55, 0.1)';
      });
    }

    this.chartInstance = new Chart(this.canvas, config);

    console.debug('[ChartCard] Chart.js initialized');
  }

  /**
   * Initialize ApexCharts chart
   */
  private initApexCharts(): void {
    const ApexCharts = (window as any).ApexCharts;

    const options = {
      chart: {
        type: this.type === 'area' ? 'area' : this.type,
        animations: {
          enabled: this.animated
        }
      },
      series: this.data.datasets,
      labels: this.data.labels,
      ...this.options
    };

    const chart = new ApexCharts(this.canvas, options);
    chart.render();

    this.chartInstance = chart;

    console.debug('[ChartCard] ApexCharts initialized');
  }

  /**
   * Initialize fallback chart (simple canvas drawing)
   */
  private initFallbackChart(): void {
    const canvas = this.canvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw simple bar chart as fallback
    if (this.data.datasets && this.data.datasets.length > 0) {
      const dataset = this.data.datasets[0];
      const data = dataset.data;
      const max = Math.max(...data);
      const barWidth = (canvas.width - 40) / data.length;

      data.forEach((value: number, index: number) => {
        const barHeight = (value / max) * (canvas.height - 40);
        const x = 20 + index * barWidth;
        const y = canvas.height - 20 - barHeight;

        // Draw bar
        ctx.fillStyle = 'rgba(212, 175, 55, 0.8)';
        ctx.fillRect(x, y, barWidth - 4, barHeight);

        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          this.data.labels?.[index] || String(index),
          x + (barWidth - 4) / 2,
          canvas.height - 5
        );
      });
    }

    console.debug('[ChartCard] Fallback chart rendered');
  }

  /**
   * Destroy chart instance
   */
  private destroyChart(): void {
    if (this.chartInstance) {
      // Chart.js
      if (typeof this.chartInstance.destroy === 'function') {
        this.chartInstance.destroy();
      }
      // ApexCharts
      else if (typeof this.chartInstance.destroy === 'function') {
        this.chartInstance.destroy();
      }

      this.chartInstance = null;
    }

    this.canvas = null;
  }

  /**
   * Fetch data from API
   */
  async fetchData(): Promise<void> {
    if (!this.dataEndpoint) {
      return;
    }

    this.loading = true;

    try {
      const response = await fetch(this.dataEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.data = data;

      this.loading = false;
      this.render();

      this.dispatchEvent(new CustomEvent('chart:loaded', {
        bubbles: true,
        detail: { data }
      }));

      console.info('[ChartCard] Data loaded');
    } catch (error) {
      console.error('[ChartCard] Fetch failed', { error });
      this.loading = false;

      this.dispatchEvent(new CustomEvent('chart:error', {
        bubbles: true,
        detail: { error }
      }));
    }
  }

  /**
   * Start auto-refresh
   */
  private startAutoRefresh(): void {
    if (this.refreshTimerId) {
      return;
    }

    this.refreshTimerId = window.setInterval(() => {
      this.fetchData();
    }, this.refreshInterval);

    console.debug('[ChartCard] Auto-refresh started', {
      interval: this.refreshInterval
    });
  }

  /**
   * Stop auto-refresh
   */
  private stopAutoRefresh(): void {
    if (this.refreshTimerId) {
      clearInterval(this.refreshTimerId);
      this.refreshTimerId = null;
      console.debug('[ChartCard] Auto-refresh stopped');
    }
  }

  /**
   * Update chart data
   */
  updateData(data: ChartData): void {
    this.data = data;

    if (this.chartInstance && typeof this.chartInstance.update === 'function') {
      this.chartInstance.data = data;
      this.chartInstance.update();
    } else {
      this.render();
    }
  }

  /**
   * Get chart instance (for advanced usage)
   */
  getChart(): any {
    return this.chartInstance;
  }
}

// Register custom element
if (!customElements.get('chart-card')) {
  customElements.define('chart-card', ChartCard);
}

// Export for programmatic use
export default ChartCard;

// Declare global TypeScript types
declare global {
  interface HTMLElementTagNameMap {
    'chart-card': ChartCard;
  }

  interface HTMLElementEventMap {
    'chart:loaded': CustomEvent<{ data: any }>;
    'chart:error': CustomEvent<{ error: Error }>;
  }
}
