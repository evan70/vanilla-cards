import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/views-chart.css';

/**
 * ReactionsBreakdown Component
 * 
 * Horizontal bar chart showing article reactions by type.
 * 5 reaction types with distinct colors.
 * 
 * Color mapping:
 * - like → gold (#D4AF37)
 * - love → emerald (#10B981)
 * - insightful → sapphire (#0891B2)
 * - funny → amethyst (#7C5CFF)
 * - celebrate → ruby (#DC2626)
 */
const meta = {
  title: '0-Core/19-Charts/ReactionsBreakdown',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'reactions-breakdown-card';
    container.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto;';
    
    const title = document.createElement('h2');
    title.textContent = 'Reactions Breakdown';
    title.style.cssText = 'color: var(--color-text, #ffffff); font-size: 18px; margin-bottom: 20px;';
    container.appendChild(title);
    
    const chartContainer = document.createElement('div');
    chartContainer.className = 'reactions-breakdown';
    chartContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
    
    const reactions = Object.entries(args.reactions);
    const maxValue = Math.max(...reactions.map(([, value]) => value), 1);
    
    reactions.forEach(([type, value]) => {
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; gap: 12px;';
      
      // Label
      const label = document.createElement('div');
      label.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      label.style.cssText = 'width: 80px; color: var(--color-text, #ffffff); font-size: 14px; text-transform: capitalize;';
      row.appendChild(label);
      
      // Bar container
      const barContainer = document.createElement('div');
      barContainer.style.cssText = 'flex: 1; height: 24px; background: rgba(255,255,255,0.05); border-radius: 6px; overflow: hidden; position: relative;';
      
      // Bar
      const bar = document.createElement('div');
      const percentage = (value / maxValue) * 100;
      bar.style.cssText = `width: ${percentage}%; height: 100%; background: ${getReactionColor(type)}; border-radius: 6px; transition: width 0.3s ease;`;
      barContainer.appendChild(bar);
      
      row.appendChild(barContainer);
      
      // Value
      const valueEl = document.createElement('div');
      valueEl.textContent = value.toString();
      valueEl.style.cssText = 'width: 40px; text-align: right; color: var(--color-text, #ffffff); font-size: 14px; font-weight: 600;';
      row.appendChild(valueEl);
      
      chartContainer.appendChild(row);
    });
    
    container.appendChild(chartContainer);
    return container;
  },
  argTypes: {
    reactions: {
      control: 'object',
      description: 'Object with reaction type counts'
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
} satisfies Meta<typeof ReactionsBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to get reaction color
function getReactionColor(type: string): string {
  const colors: Record<string, string> = {
    like: '#D4AF37',      // gold
    love: '#10B981',      // emerald
    insightful: '#0891B2', // sapphire
    funny: '#7C5CFF',     // amethyst
    celebrate: '#DC2626'  // ruby
  };
  return colors[type] || '#94a3b8';
}

// Default reactions data
const defaultReactions = {
  like: 45,
  love: 32,
  insightful: 28,
  funny: 15,
  celebrate: 12
};

/**
 * Default Reactions Breakdown
 * 
 * Shows all 5 reaction types with realistic data
 */
export const Default: Story = {
  args: {
    reactions: defaultReactions
  }
};

/**
 * Empty State
 * 
 * No reactions yet
 */
export const EmptyState: Story = {
  args: {
    reactions: {
      like: 0,
      love: 0,
      insightful: 0,
      funny: 0,
      celebrate: 0
    }
  }
};

/**
 * High Engagement
 * 
 * Article with many reactions
 */
export const HighEngagement: Story = {
  args: {
    reactions: {
      like: 250,
      love: 180,
      insightful: 145,
      funny: 95,
      celebrate: 88
    }
  }
};

/**
 * Funny Article
 * 
 * Article where "funny" reaction dominates
 */
export const FunnyArticle: Story = {
  args: {
    reactions: {
      like: 120,
      love: 45,
      insightful: 30,
      funny: 380,
      celebrate: 25
    }
  }
};

/**
 * Insightful Content
 * 
 * Technical article with mostly "insightful" reactions
 */
export const InsightfulContent: Story = {
  args: {
    reactions: {
      like: 85,
      love: 40,
      insightful: 220,
      funny: 15,
      celebrate: 35
    }
  }
};

/**
 * Love Reaction Dominant
 * 
 * Heartwarming content
 */
export const LoveDominant: Story = {
  args: {
    reactions: {
      like: 95,
      love: 280,
      insightful: 50,
      funny: 20,
      celebrate: 45
    }
  }
};

/**
 * Single Reaction Type
 * 
 * Only "like" reactions (minimal state)
 */
export const SingleType: Story = {
  args: {
    reactions: {
      like: 50,
      love: 0,
      insightful: 0,
      funny: 0,
      celebrate: 0
    }
  }
};
