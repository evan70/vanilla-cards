import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles - using aliases
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-tokens.css';
import '@vanilla-cards/mark/styles/cardboard.css';

// Import icons - using aliases
import eyeIcon from '@vanilla-cards/assets/icons/eye.svg?raw';
import articleIcon from '@vanilla-cards/assets/icons/article.svg?raw';
import commentIcon from '@vanilla-cards/assets/icons/comment.svg?raw';
import userIcon from '@vanilla-cards/assets/icons/user.svg?raw';

/**
 * StatsCard Component
 *
 * Cardboard statistics card with icon, value, label, and optional trend indicator.
 * 
 * @see stats-card.ts for implementation
 */
const meta = {
  title: '0-Core/21-Cardboard/StatsCard',
  tags: ['autodocs'],
  render: (args) => {
    const card = document.createElement('stats-card');
    card.setAttribute('value', args.value);
    card.setAttribute('label', args.label);
    card.setAttribute('color', args.color);
    
    if (args.icon) {
      card.setAttribute('icon', args.icon);
    }
    
    if (args.trend) {
      card.setAttribute('trend', args.trend);
      card.setAttribute('trend-direction', args.trendDirection || 'neutral');
    }
    
    if (args.href) {
      card.setAttribute('clickable', '');
      card.setAttribute('href', args.href);
    }
    
    return card;
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The stat value (e.g., "1,234")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' }
      }
    },
    label: {
      control: { type: 'text' },
      description: 'The stat label (e.g., "Total Views")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Stats' }
      }
    },
    icon: {
      control: { type: 'text' },
      description: 'SVG icon HTML',
      table: {
        type: { summary: 'string' }
      }
    },
    color: {
      control: { type: 'select' },
      options: ['gold', 'emerald', 'sapphire', 'amethyst', 'ruby', 'topaz'],
      description: 'Icon color variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'gold' }
      }
    },
    trend: {
      control: { type: 'text' },
      description: 'Trend text (e.g., "+12.5%")',
      table: {
        type: { summary: 'string' }
      }
    },
    trendDirection: {
      control: { type: 'radio' },
      options: ['up', 'down', 'neutral'],
      description: 'Trend direction',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' }
      }
    },
    href: {
      control: { type: 'text' },
      description: 'Optional URL for clickable card',
      table: {
        type: { summary: 'string' }
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
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default stats data
const defaultArgs = {
  value: '1,234',
  label: 'Total Views',
  icon: eyeIcon,
  color: 'gold' as const
};

/**
 * Default Stats Card
 *
 * Shows a stat value with icon and label
 */
export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

/**
 * With Positive Trend
 *
 * Shows growth indicator (+12.5%)
 */
export const WithPositiveTrend: Story = {
  args: {
    ...defaultArgs,
    trend: '+12.5%',
    trendDirection: 'up'
  }
};

/**
 * With Negative Trend
 *
 * Shows decline indicator (-5.2%)
 */
export const WithNegativeTrend: Story = {
  args: {
    ...defaultArgs,
    trend: '-5.2%',
    trendDirection: 'down'
  }
};

/**
 * All Color Variants
 *
 * Shows all available color options
 */
export const ColorVariants: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;';
    
    const colors = [
      { color: 'gold', value: '1,234', label: 'Total Views', icon: eyeIcon },
      { color: 'emerald', value: '42', label: 'Articles', icon: articleIcon },
      { color: 'sapphire', value: '18', label: 'Comments', icon: commentIcon },
      { color: 'amethyst', value: '8', label: 'Users', icon: userIcon }
    ];
    
    colors.forEach(({ color, value, label, icon }) => {
      const card = document.createElement('stats-card');
      card.setAttribute('value', value);
      card.setAttribute('label', label);
      card.setAttribute('color', color);
      card.setAttribute('icon', icon);
      container.appendChild(card);
    });
    
    return container;
  }
};

/**
 * Clickable Stats Card
 *
 * Card that navigates on click
 */
export const Clickable: Story = {
  args: {
    ...defaultArgs,
    href: '/mark/stats/views'
  }
};

/**
 * With Trend and Clickable
 *
 * Full-featured stats card
 */
export const WithTrendAndClickable: Story = {
  args: {
    ...defaultArgs,
    trend: '+12.5%',
    trendDirection: 'up',
    href: '/mark/stats/views'
  }
};

/**
 * Empty State
 *
 * Zero value (fresh installation)
 */
export const EmptyState: Story = {
  args: {
    value: '0',
    label: 'Total Views',
    icon: eyeIcon,
    color: 'gold'
  }
};

/**
 * Large Numbers
 *
 * Example with very large numbers
 */
export const LargeNumbers: Story = {
  args: {
    value: '1,234,567',
    label: 'Total Views',
    icon: eyeIcon,
    color: 'gold',
    trend: '+125%',
    trendDirection: 'up'
  }
};

// Import StatsCard for TypeScript
import { StatsCard } from '@vanilla-cards/components/stats-card.js';
