import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles - using aliases
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-tokens.css';
import '@vanilla-cards/mark/styles/cardboard.css';

/**
 * ChartCard Component
 *
 * Cardboard chart card for displaying data visualizations.
 * Supports Chart.js, ApexCharts, or fallback canvas rendering.
 * 
 * @see chart-card.ts for implementation
 */
const meta = {
  title: '0-Core/21-Cardboard/ChartCard',
  tags: ['autodocs'],
  render: (args) => {
    const card = document.createElement('chart-card');
    card.setAttribute('title', args.title);
    card.setAttribute('type', args.type);
    card.setAttribute('data', JSON.stringify(args.data));
    
    if (args.options) {
      card.setAttribute('options', JSON.stringify(args.options));
    }
    
    if (args.animated === false) {
      card.setAttribute('animated', 'false');
    }
    
    return card;
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Chart' }
      }
    },
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'pie', 'doughnut', 'area'],
      description: 'Chart type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'line' }
      }
    },
    data: {
      control: { type: 'object' },
      description: 'Chart data: {labels, datasets}',
      table: {
        type: { summary: 'object' }
      }
    },
    options: {
      control: { type: 'object' },
      description: 'Chart options',
      table: {
        type: { summary: 'object' }
      }
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Enable animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
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
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for line chart
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Views',
    data: [120, 190, 300, 500, 200, 300],
    borderColor: 'rgb(212, 175, 55)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    tension: 0.4
  }]
};

// Sample data for bar chart
const barData = {
  labels: ['Articles', 'Pages', 'Forms', 'Users', 'Comments'],
  datasets: [{
    label: 'Content',
    data: [42, 15, 8, 23, 156],
    backgroundColor: [
      'rgba(212, 175, 55, 0.8)',
      'rgba(80, 200, 120, 0.8)',
      'rgba(15, 82, 186, 0.8)',
      'rgba(153, 102, 204, 0.8)',
      'rgba(224, 17, 95, 0.8)'
    ],
    borderColor: [
      'rgb(212, 175, 55)',
      'rgb(80, 200, 120)',
      'rgb(15, 82, 186)',
      'rgb(153, 102, 204)',
      'rgb(224, 17, 95)'
    ],
    borderWidth: 1
  }]
};

// Sample data for pie chart
const pieData = {
  labels: ['Published', 'Draft', 'Archived'],
  datasets: [{
    data: [35, 5, 2],
    backgroundColor: [
      'rgba(80, 200, 120, 0.8)',
      'rgba(212, 175, 55, 0.8)',
      'rgba(150, 150, 150, 0.8)'
    ],
    borderColor: [
      'rgb(80, 200, 120)',
      'rgb(212, 175, 55)',
      'rgb(150, 150, 150)'
    ],
    borderWidth: 2
  }]
};

// Sample data for area chart
const areaData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Weekly Views',
    data: [100, 250, 180, 320, 280, 400, 350],
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: 'rgb(212, 175, 55)',
    tension: 0.4,
    fill: true
  }]
};

/**
 * Default Line Chart
 *
 * Shows views trend over time
 */
export const LineChart: Story = {
  args: {
    title: 'Views Trend',
    type: 'line',
    data: lineData
  }
};

/**
 * Bar Chart
 *
 * Content distribution by type
 */
export const BarChart: Story = {
  args: {
    title: 'Content Overview',
    type: 'bar',
    data: barData
  }
};

/**
 * Pie Chart
 *
 * Article status distribution
 */
export const PieChart: Story = {
  args: {
    title: 'Article Status',
    type: 'pie',
    data: pieData
  }
};

/**
 * Area Chart
 *
 * Weekly views with filled area
 */
export const AreaChart: Story = {
  args: {
    title: 'Weekly Analytics',
    type: 'area',
    data: areaData
  }
};

/**
 * Doughnut Chart
 *
 * Similar to pie but with hole
 */
export const DoughnutChart: Story = {
  args: {
    title: 'User Roles',
    type: 'doughnut',
    data: {
      labels: ['Admin', 'Editor', 'Author', 'Subscriber'],
      datasets: [{
        data: [5, 12, 18, 150],
        backgroundColor: [
          'rgba(212, 175, 55, 0.8)',
          'rgba(80, 200, 120, 0.8)',
          'rgba(15, 82, 186, 0.8)',
          'rgba(153, 102, 204, 0.8)'
        ],
        borderWidth: 2
      }]
    }
  }
};

/**
 * Without Animation
 *
 * Chart with animations disabled
 */
export const WithoutAnimation: Story = {
  args: {
    title: 'Views (No Animation)',
    type: 'line',
    data: lineData,
    animated: false
  }
};

/**
 * Multi-Dataset Line Chart
 *
 * Multiple lines on same chart
 */
export const MultiDataset: Story = {
  args: {
    title: 'Views vs Articles',
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Views',
          data: [120, 190, 300, 500, 200, 300],
          borderColor: 'rgb(212, 175, 55)',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          tension: 0.4
        },
        {
          label: 'Articles',
          data: [10, 15, 22, 28, 35, 42],
          borderColor: 'rgb(80, 200, 120)',
          backgroundColor: 'rgba(80, 200, 120, 0.1)',
          tension: 0.4
        }
      ]
    }
  }
};

/**
 * Empty State
 *
 * Chart with no data
 */
export const EmptyState: Story = {
  args: {
    title: 'No Data Available',
    type: 'line',
    data: {
      labels: [],
      datasets: []
    }
  }
};

// Import ChartCard for TypeScript
import { ChartCard } from '@vanilla-cards/components/chart-card.js';
