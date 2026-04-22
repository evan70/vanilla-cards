import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Stats Card — Metrics and KPIs display
 *
 * Designed for statistics, metrics, and key performance indicators.
 *
 * ## Color Variants
 *
 * Stats cards feature five distinct color variants for visual categorization:
 * - **Gold** — Revenue, premium metrics
 * - **Emerald** — Growth, success metrics
 * - **Ruby** — Alerts, critical metrics
 * - **Sapphire** — Information, neutral metrics
 * - **Amethyst** — Creative, custom metrics
 *
 * ## Usage
 *
 * ```html
 * <div class="card card--stats">
 *   <div class="card--stats__icon card--stats__icon--gold">
 *     <svg>...</svg>
 *   </div>
 *   <div class="card--stats__body">
 *     <p class="card--stats__value">1,234</p>
 *     <p class="card--stats__label">Total Users</p>
 *     <span class="card--stats__trend card--stats__trend--positive">+12%</span>
 *   </div>
 * </div>
 * ```
 *
 * ## CSS Default
 * Uses filled variant by default
 */

const meta = {
  title: '0-Core/06. Stats Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Stats Card** displays metrics, KPIs, and statistics with optional color coding.

### Structure

\`\`\`
.stats-card (extends .card)
├── .stats-card__icon (optional, with color variant)
├── .stats-card__body
│   ├── .stats-card__value (with color variant)
│   ├── .stats-card__label
│   └── .stats-card__change (.change--positive/.change--negative/.change--neutral)
\`\`\`

### Color Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| Gold | #D4AF37 | Revenue, premium |
| Emerald | #10B981 | Growth, success |
| Ruby | #EF4444 | Alerts, critical |
| Sapphire | #0891B8 | Information |
| Amethyst | #7C3AED | Creative, custom |

### Layout Variants
- **Default** — Centered, vertical layout
- **Compact** — Smaller padding, reduced sizes
- **Horizontal** — Icon left, content right
- **With Chart** — Includes chart area at bottom

### Related
- [Card Variants](/docs/0-core-1-card-variants--docs) - Visual styling
- [Content Card](/docs/0-core-3-content--docs) - Article display
        `,
      },
    },
  },
  argTypes: {
    colorVariant: {
      control: { type: 'select' },
      options: ['gold', 'emerald', 'ruby', 'sapphire', 'amethyst'],
      description: 'Color variant for icon and value',
      table: {
        type: { summary: 'gold | emerald | ruby | sapphire | amethyst' },
        defaultValue: { summary: 'gold' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Stat value (number, percentage, etc.)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1,234' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Stat label/description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Total Users' },
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show icon above value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    changeType: {
      control: { type: 'select' },
      options: ['positive', 'negative', 'neutral', 'none'],
      description: 'Change indicator type',
      table: {
        type: { summary: 'positive | negative | neutral | none' },
        defaultValue: { summary: 'positive' },
      },
    },
    changeValue: {
      control: { type: 'text' },
      description: 'Change percentage/value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '+12%' },
      },
    },
  },
  args: {
    colorVariant: 'gold',
    value: '1,234',
    label: 'Total Users',
    showIcon: true,
    changeType: 'positive',
    changeValue: '+12%',
  },
  render: ({ colorVariant, value, label, showIcon, changeType, changeValue }) => {
    const classes = ['stats-card', 'card'];

    // Icon SVGs for each variant
    const icons: Record<string, string> = {
      gold: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>`,
      emerald: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>`,
      ruby: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      sapphire: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`,
      amethyst: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>`,
    };

    return `
      <div class="${classes.join(' ')}" style="max-width: 280px;">
        ${showIcon ? `
        <div class="stats-card__icon stats-card__icon--${colorVariant}">
          ${icons[colorVariant]}
        </div>
        ` : ''}
        <div class="stats-card__body">
          <p class="stats-card__value stats-card__value--${colorVariant}">${value}</p>
          <p class="stats-card__label">${label}</p>
          ${changeType !== 'none' ? `
          <span class="stats-card__change stats-card__change--${changeType}">
            ${changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→'} ${changeValue}
          </span>
          ` : ''}
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    colorVariant: string;
    value: string;
    label: string;
    showIcon: boolean;
    changeType: string;
    changeValue: string;
  };
};

/**
 * Gold Variant — Revenue and premium metrics
 *
 * Gold color scheme for financial and premium metrics
 */
export const GoldVariant: Story = {
  args: {
    colorVariant: 'gold',
    value: '$45,678',
    label: 'Total Revenue',
    showIcon: true,
    changeType: 'positive',
    changeValue: '+23%',
  },
  parameters: {
    docs: {
      description: {
        story: '**Gold** variant for revenue, premium metrics, and financial data. Associated with value and quality.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--gold">$</div>',
            value: '<p class="stats-card__value stats-card__value--gold">$45,678</p>',
            label: '<p class="stats-card__label">Total Revenue</p>',
            change: '<span class="stats-card__change stats-card__change--positive">+23%</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Emerald Variant — Growth and success metrics
 *
 * Green color scheme for positive growth indicators
 */
export const EmeraldVariant: Story = {
  args: {
    colorVariant: 'emerald',
    value: '+2,456',
    label: 'New Users',
    showIcon: true,
    changeType: 'positive',
    changeValue: '+18%',
  },
  parameters: {
    docs: {
      description: {
        story: '**Emerald** variant for growth, success, and positive metrics. Perfect for user growth, conversions, and achievements.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--emerald">↑</div>',
            value: '<p class="stats-card__value stats-card__value--emerald">+2,456</p>',
            label: '<p class="stats-card__label">New Users</p>',
            change: '<span class="stats-card__change stats-card__change--positive">+18%</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Ruby Variant — Alerts and critical metrics
 *
 * Red color scheme for warnings and critical data
 */
export const RubyVariant: Story = {
  args: {
    colorVariant: 'ruby',
    value: '23',
    label: 'Critical Issues',
    showIcon: true,
    changeType: 'negative',
    changeValue: '-5%',
  },
  parameters: {
    docs: {
      description: {
        story: '**Ruby** variant for alerts, errors, and critical metrics. Use for issues, warnings, or metrics that need attention.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--ruby">!</div>',
            value: '<p class="stats-card__value stats-card__value--ruby">23</p>',
            label: '<p class="stats-card__label">Critical Issues</p>',
            change: '<span class="stats-card__change stats-card__change--negative">-5%</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Sapphire Variant — Information and neutral metrics
 *
 * Blue color scheme for informational data
 */
export const SapphireVariant: Story = {
  args: {
    colorVariant: 'sapphire',
    value: '8,234',
    label: 'Total Views',
    showIcon: true,
    changeType: 'neutral',
    changeValue: '0%',
  },
  parameters: {
    docs: {
      description: {
        story: '**Sapphire** variant for informational and neutral metrics. Good for general statistics that do not imply positive or negative sentiment.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--sapphire">👁</div>',
            value: '<p class="stats-card__value stats-card__value--sapphire">8,234</p>',
            label: '<p class="stats-card__label">Total Views</p>',
            change: '<span class="stats-card__change stats-card__change--neutral">0%</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Amethyst Variant — Creative and custom metrics
 *
 * Purple color scheme for custom or creative metrics
 */
export const AmethystVariant: Story = {
  args: {
    colorVariant: 'amethyst',
    value: '4.9',
    label: 'Avg. Rating',
    showIcon: true,
    changeType: 'positive',
    changeValue: '+0.3',
  },
  parameters: {
    docs: {
      description: {
        story: '**Amethyst** variant for creative, custom, or unique metrics. Great for ratings, scores, or specialized KPIs.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--amethyst">★</div>',
            value: '<p class="stats-card__value stats-card__value--amethyst">4.9</p>',
            label: '<p class="stats-card__label">Avg. Rating</p>',
            change: '<span class="stats-card__change stats-card__change--positive">+0.3</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * All Color Variants — Side-by-side comparison
 *
 * Shows all five color variants together
 */
export const AllColorVariants: Story = {
  render: () => `
    <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      <!-- Gold -->
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <p class="stats-card__value stats-card__value--gold">$45,678</p>
        <p class="stats-card__label">Revenue</p>
        <span class="stats-card__change stats-card__change--positive">↑ +23%</span>
      </div>

      <!-- Emerald -->
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--emerald">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
        </div>
        <p class="stats-card__value stats-card__value--emerald">+2,456</p>
        <p class="stats-card__label">New Users</p>
        <span class="stats-card__change stats-card__change--positive">↑ +18%</span>
      </div>

      <!-- Ruby -->
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--ruby">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <p class="stats-card__value stats-card__value--ruby">23</p>
        <p class="stats-card__label">Issues</p>
        <span class="stats-card__change stats-card__change--negative">↓ -5%</span>
      </div>

      <!-- Sapphire -->
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--sapphire">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <p class="stats-card__value stats-card__value--sapphire">8,234</p>
        <p class="stats-card__label">Views</p>
        <span class="stats-card__change stats-card__change--neutral">→ 0%</span>
      </div>

      <!-- Amethyst -->
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--amethyst">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <p class="stats-card__value stats-card__value--amethyst">4.9</p>
        <p class="stats-card__label">Rating</p>
        <span class="stats-card__change stats-card__change--positive">↑ +0.3</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All five color variants displayed together. Each color serves a specific semantic purpose for quick visual categorization.',
      },
    },
  },
};

/**
 * Compact Variant — Smaller size
 *
 * Compact stats card with reduced padding and sizes
 */
export const CompactVariant: Story = {
  render: () => `
    <div class="stats-card stats-card--compact card" style="max-width: 200px;">
      <div class="stats-card__icon stats-card__icon--gold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
      <p class="stats-card__value stats-card__value--gold" style="font-size: 1.5rem;">$12K</p>
      <p class="stats-card__label" style="font-size: 0.75rem;">Revenue</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Compact** variant with reduced padding and smaller icon/text sizes. Use when space is limited or for cardboard grids.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          modifiers: ['compact'],
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--gold">$</div>',
            value: '<p class="stats-card__value stats-card__value--gold">$12K</p>',
            label: '<p class="stats-card__label">Revenue</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Horizontal Layout — Icon left, content right
 *
 * Horizontal arrangement with icon beside content
 */
export const HorizontalLayout: Story = {
  render: () => `
    <div class="stats-card stats-card--horizontal card" style="max-width: 300px;">
      <div class="stats-card__icon stats-card__icon--emerald">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      </div>
      <div class="stats-card__body">
        <p class="stats-card__value stats-card__value--emerald">+2,456</p>
        <p class="stats-card__label">New Users</p>
        <span class="stats-card__change stats-card__change--positive">↑ +18%</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Horizontal** layout places icon to the left of content. Better for wide layouts or when icons need more prominence.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          modifiers: ['horizontal'],
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--emerald">↑</div>',
            body: `
  <p class="stats-card__value stats-card__value--emerald">+2,456</p>
  <p class="stats-card__label">New Users</p>
  <span class="stats-card__change stats-card__change--positive">+18%</span>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * No Icon — Value-focused layout
 *
 * Stats card without icon, emphasizing the value
 */
export const NoIcon: Story = {
  args: {
    colorVariant: 'gold',
    value: '1,234,567',
    label: 'Total Users',
    showIcon: false,
    changeType: 'positive',
    changeValue: '+12%',
  },
  parameters: {
    docs: {
      description: {
        story: '**No Icon** variant removes the icon to emphasize the numerical value. Use when the number itself is the primary focus.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            value: '<p class="stats-card__value stats-card__value--gold">1,234,567</p>',
            label: '<p class="stats-card__label">Total Users</p>',
            change: '<span class="stats-card__change stats-card__change--positive">+12%</span>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * No Change — Without trend indicator
 *
 * Stats card without change/trend indicator
 */
export const NoChange: Story = {
  args: {
    colorVariant: 'sapphire',
    value: '8,234',
    label: 'Page Views',
    showIcon: true,
    changeType: 'none',
    changeValue: '',
  },
  parameters: {
    docs: {
      description: {
        story: '**No Change** variant omits the trend indicator. Use when showing static metrics or when change data is not available.',
      },
      source: {
        code: generateCardCode({
          blockName: 'stats-card',
          slots: {
            icon: '<div class="stats-card__icon stats-card__icon--sapphire">👁</div>',
            value: '<p class="stats-card__value stats-card__value--sapphire">8,234</p>',
            label: '<p class="stats-card__label">Page Views</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Cardboard Grid — Multiple stats together
 *
 * Example of multiple stats cards in a cardboard layout
 */
export const CardboardGrid: Story = {
  render: () => `
    <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--gold">$</div>
        <p class="stats-card__value stats-card__value--gold">$45.6K</p>
        <p class="stats-card__label">Revenue</p>
        <span class="stats-card__change stats-card__change--positive">↑ +23%</span>
      </div>

      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--emerald">U</div>
        <p class="stats-card__value stats-card__value--emerald">2,456</p>
        <p class="stats-card__label">New Users</p>
        <span class="stats-card__change stats-card__change--positive">↑ +18%</span>
      </div>

      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--sapphire">👁</div>
        <p class="stats-card__value stats-card__value--sapphire">89.2K</p>
        <p class="stats-card__label">Page Views</p>
        <span class="stats-card__change stats-card__change--positive">↑ +12%</span>
      </div>

      <div class="stats-card card">
        <div class="stats-card__icon stats-card__icon--amethyst">★</div>
        <p class="stats-card__value stats-card__value--amethyst">4.9</p>
        <p class="stats-card__label">Rating</p>
        <span class="stats-card__change stats-card__change--neutral">→ 0%</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Cardboard Grid** shows how multiple stats cards work together in a cardboard layout. Each card uses a different color variant for quick visual categorization.',
      },
    },
  },
};
