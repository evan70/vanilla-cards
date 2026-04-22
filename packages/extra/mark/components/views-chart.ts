/**
 * ViewsChart Component
 * Simple line chart for cardboard views trend
 * Uses SVG for rendering - no external dependencies
 */

export interface ChartDataPoint {
  date: string;
  views: number;
}

export interface ViewsChartOptions {
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  showGrid?: boolean;
  showLabels?: boolean;
}

const ViewsChart = {
  /**
   * Default options
   */
  defaults: {
    width: 400,
    height: 200,
    color: '#D4AF37', // Gold
    fillColor: 'rgba(212, 175, 55, 0.1)',
    showGrid: true,
    showLabels: true,
  } as ViewsChartOptions,

  /**
   * Render chart to container
   */
  render(container: HTMLElement, data: ChartDataPoint[], options: ViewsChartOptions = {}): void {
    const config = { ...this.defaults, ...options } as Required<ViewsChartOptions>;

    if (!container) {
      console.error('[ViewsChart] Container not found');
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = this.renderEmpty(config);
      return;
    }

    console.log('[ViewsChart] Rendering chart with', data.length, 'data points');

    const svg = this.createChart(data, config);
    container.innerHTML = svg;
  },

  /**
   * Render empty state
   */
  renderEmpty(config: ViewsChartOptions): string {
    const height = config.height ?? this.defaults.height;
    return `
      <div class="views-chart views-chart--empty" style="
        width: 100%;
        height: ${height}px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-muted);
        font-size: var(--text-sm);
      ">
        No data available
      </div>
    `;
  },

  /**
   * Create SVG chart
   */
  createChart(data: ChartDataPoint[], config: ViewsChartOptions): string {
    const width = config.width ?? this.defaults.width!;
    const height = config.height ?? this.defaults.height!;
    const color = config.color ?? this.defaults.color!;
    const fillColor = config.fillColor ?? this.defaults.fillColor!;
    const showGrid = config.showGrid ?? this.defaults.showGrid;
    const showLabels = config.showLabels ?? this.defaults.showLabels;

    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate min/max values
    const values = data.map(d => d.views);
    const maxValue = Math.max(...values, 1);
    const minValue = 0;

    // Create scales
    const xScale = (index: number) => (index / (data.length - 1)) * chartWidth;
    const yScale = (value: number) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

    // Generate path for line
    const linePath = data.map((d, i) => {
      const x = padding.left + xScale(i);
      const y = padding.top + yScale(d.views);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Generate path for area (filled)
    const areaPath = `${linePath} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;

    // Generate grid lines
    const gridLines = showGrid ? this.generateGridLines(padding, chartWidth, chartHeight, maxValue) : '';

    // Generate X-axis labels
    const xLabels = showLabels ? this.generateXLabels(data, padding, chartWidth, chartHeight) : '';

    // Generate Y-axis labels
    const yLabels = showLabels ? this.generateYLabels(padding, chartHeight, maxValue) : '';

    return `
      <svg class="views-chart" width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines -->
        ${gridLines}

        <!-- Y-axis labels -->
        ${yLabels}

        <!-- Area fill -->
        <path d="${areaPath}" fill="${fillColor}" stroke="none" />

        <!-- Line -->
        <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Data points -->
        ${this.generateDataPoints(data, padding, xScale, yScale, color)}

        <!-- X-axis labels -->
        ${xLabels}
      </svg>
    `;
  },

  /**
   * Generate grid lines
   */
  generateGridLines(padding: any, chartWidth: number, chartHeight: number, maxValue: number): string {
    const lines = [];
    const steps = 5;

    for (let i = 0; i <= steps; i++) {
      const y = padding.top + (chartHeight / steps) * i;
      const value = Math.round(maxValue - (maxValue / steps) * i);

      lines.push(`
        <line x1="${padding.left}" y1="${y}" x2="${padding.left + chartWidth}" y2="${y}"
              stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4,4" opacity="0.5" />
        <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end"
              fill="var(--color-text-muted)" font-size="10">${value}</text>
      `);
    }

    return lines.join('');
  },

  /**
   * Generate X-axis labels
   */
  generateXLabels(data: ChartDataPoint[], padding: any, chartWidth: number, chartHeight: number): string {
    const labels: string[] = [];
    const step = Math.ceil(data.length / 7); // Show max 7 labels

    data.forEach((d, i) => {
      if (i % step === 0 || i === data.length - 1) {
        const x = padding.left + (i / (data.length - 1)) * chartWidth;
        const date = new Date(d.date);
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        labels.push(`
          <text x="${x}" y="${padding.top + chartHeight + 20}" text-anchor="middle"
                fill="var(--color-text-muted)" font-size="10">${label}</text>
        `);
      }
    });

    return labels.join('');
  },

  /**
   * Generate Y-axis labels
   */
  generateYLabels(padding: any, chartHeight: number, maxValue: number): string {
    const labels = [];
    const steps = 5;

    for (let i = 0; i <= steps; i++) {
      const y = padding.top + (chartHeight / steps) * i;
      const value = Math.round(maxValue - (maxValue / steps) * i);

      labels.push(`
        <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end"
              fill="var(--color-text-muted)" font-size="10">${value}</text>
      `);
    }

    return labels.join('');
  },

  /**
   * Generate data points
   */
  generateDataPoints(data: ChartDataPoint[], padding: any, xScale: (i: number) => number, yScale: (v: number) => number, color: string): string {
    return data.map((d, i) => {
      const x = padding.left + xScale(i);
      const y = padding.top + yScale(d.views);

      return `
        <circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="var(--card-bg)" stroke-width="2" />
      `;
    }).join('');
  },

  /**
   * Update chart with new data
   */
  update(container: HTMLElement, data: ChartDataPoint[], options: ViewsChartOptions = {}): void {
    this.render(container, data, options);
    console.log('[ViewsChart] Chart updated');
  },

  /**
   * Destroy chart (cleanup)
   */
  destroy(container: HTMLElement): void {
    if (container) {
      container.innerHTML = '';
      console.log('[ViewsChart] Chart destroyed');
    }
  },
};

export { ViewsChart };
