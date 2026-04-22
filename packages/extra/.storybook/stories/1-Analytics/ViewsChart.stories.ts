import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/views-chart.css';

/**
 * ViewsChart Component
 * 
 * Line chart showing article views over time.
 * Simple SVG-based chart with gradient fill.
 * 
 * @see views-chart.css for implementation
 */
const meta = {
  title: 'Analytics/ViewsChart',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'views-chart-card';
    container.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px;';
    
    const title = document.createElement('h2');
    title.textContent = 'Views Trend';
    title.style.cssText = 'color: var(--color-text, #ffffff); font-size: 18px; margin-bottom: 16px;';
    container.appendChild(title);
    
    const chartContainer = document.createElement('div');
    chartContainer.className = 'views-chart';
    chartContainer.style.cssText = 'position: relative; height: 200px;';
    
    // Create SVG chart
    const svg = createViewsChart(args.data);
    chartContainer.appendChild(svg);
    
    container.appendChild(chartContainer);
    return container;
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of { date: string, views: number } objects'
    }
  },
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  }
} satisfies Meta<typeof ViewsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create SVG chart
function createViewsChart(data: Array<{ date: string; views: number }>): SVGSVGElement {
  const width = 600;
  const height = 200;
  const padding = 20;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  
  if (data.length === 0) {
    return svg;
  }
  
  const maxViews = Math.max(...data.map(d => d.views), 1);
  const xStep = (width - padding * 2) / (data.length - 1 || 1);
  
  // Create gradient definition
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', 'viewsGradient');
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '0%');
  gradient.setAttribute('y2', '100%');
  
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#D4AF37');
  stop1.setAttribute('stop-opacity', '0.3');
  
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#D4AF37');
  stop2.setAttribute('stop-opacity', '0');
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
  
  // Generate path points
  const points = data.map((d, i) => {
    const x = padding + i * xStep;
    const y = height - padding - (d.views / maxViews) * (height - padding * 2);
    return `${x},${y}`;
  });
  
  // Create area path
  const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const areaD = `M ${padding},${height - padding} L ${points.join(' L ')} L ${padding + (data.length - 1) * xStep},${height - padding} Z`;
  areaPath.setAttribute('d', areaD);
  areaPath.setAttribute('fill', 'url(#viewsGradient)');
  svg.appendChild(areaPath);
  
  // Create line path
  const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const lineD = `M ${points[0]} L ${points.slice(1).join(' L ')}`;
  linePath.setAttribute('d', lineD);
  linePath.setAttribute('fill', 'none');
  linePath.setAttribute('stroke', '#D4AF37');
  linePath.setAttribute('stroke-width', '2');
  svg.appendChild(linePath);
  
  // Add data points
  points.forEach((point, i) => {
    const [x, y] = point.split(',').map(Number);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x.toString());
    circle.setAttribute('cy', y.toString());
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', '#D4AF37');
    svg.appendChild(circle);
  });
  
  // Add X-axis labels
  data.forEach((d, i) => {
    const x = padding + i * xStep;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x.toString());
    text.setAttribute('y', (height - 5).toString());
    text.setAttribute('fill', 'currentColor');
    text.setAttribute('font-size', '10');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = d.date;
    svg.appendChild(text);
  });
  
  return svg;
}

// Default data
const defaultData = [
  { date: 'Mar 19', views: 150 },
  { date: 'Mar 20', views: 230 },
  { date: 'Mar 21', views: 180 },
  { date: 'Mar 22', views: 320 }
];

/**
 * Default Views Chart
 * 
 * Shows 4 days of view data with upward trend
 */
export const Default: Story = {
  args: {
    data: defaultData
  }
};

/**
 * Empty State
 * 
 * No data available
 */
export const EmptyState: Story = {
  args: {
    data: []
  }
};

/**
 * High Traffic
 * 
 * Chart with high view counts
 */
export const HighTraffic: Story = {
  args: {
    data: [
      { date: 'Mar 17', views: 850 },
      { date: 'Mar 18', views: 920 },
      { date: 'Mar 19', views: 1100 },
      { date: 'Mar 20', views: 1250 },
      { date: 'Mar 21', views: 1180 },
      { date: 'Mar 22', views: 1450 }
    ]
  }
};

/**
 * Low Traffic
 * 
 * Chart with low view counts
 */
export const LowTraffic: Story = {
  args: {
    data: [
      { date: 'Mar 19', views: 5 },
      { date: 'Mar 20', views: 12 },
      { date: 'Mar 21', views: 8 },
      { date: 'Mar 22', views: 15 }
    ]
  }
};

/**
 * Declining Trend
 * 
 * Shows decreasing views
 */
export const DecliningTrend: Story = {
  args: {
    data: [
      { date: 'Mar 17', views: 500 },
      { date: 'Mar 18', views: 420 },
      { date: 'Mar 19', views: 380 },
      { date: 'Mar 20', views: 290 },
      { date: 'Mar 21', views: 250 },
      { date: 'Mar 22', views: 180 }
    ]
  }
};
