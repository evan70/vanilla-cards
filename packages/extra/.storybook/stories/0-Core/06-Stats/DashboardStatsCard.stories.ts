import type { Meta, StoryObj } from '@storybook/html-vite';

/**
 * Cardboard Stats Card — Premium glassmorphism design
 *
 * Special stats card variant used in Mark cardboard with premium
 * glassmorphism styling, gradient backgrounds, and color-coded icons.
 *
 * ## Usage
 *
 * ```html
 * <div class="cardboard-stats">
 *   <a href="/mark/articles" class="stats-card">
 *     <div class="stats-card__body">
 *       <div class="stats-card__icon stats-card__icon--gold">
 *         <svg>...</svg>
 *       </div>
 *       <div class="stats-card__content">
 *         <div class="stats-card__value">90</div>
 *         <div class="stats-card__label">Articles</div>
 *       </div>
 *     </div>
 *   </a>
 * </div>
 * ```
 *
 * ## CSS
 * Located in: `vanilla-cards/mark/styles/cardboard-card.css`
 */

const meta = {
  title: '0-Core/06-Stats/CardboardStatsCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    },
    docs: {
      description: {
        component: `
**Cardboard Stats Card** is a premium glassmorphism stats card used in the Mark cardboard.

### Key Features
- ✅ Glassmorphism gradient background
- ✅ Subtle border with glow effect
- ✅ Top highlight gradient
- ✅ Hover lift animation
- ✅ Color-coded icon variants
- ✅ Clickable (link wrapper)

### Structure

\`\`\`
.cardboard-stats (grid container)
└── .stats-card (clickable link)
    └── .stats-card__body
        ├── .stats-card__icon (with color variant)
        └── .stats-card__content
            ├── .stats-card__value
            └── .stats-card__label
\`\`\`

### Color Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| Gold | #D4AF37 | Articles, revenue, premium |
| Emerald | #10B981 | Forms, growth, success |
| Sapphire | #0891B2 | Contacts, information |
| Amethyst | #7C5CFF | Users, creative, custom |

### Related
- [Stats Card](/docs/0-core-6-stats--docs) - Base stats card
- [Card List Variant](/docs/0-core-6-card-list-variant--docs) - Cardboard list cards
- [Cardboard Overview](/docs/0-core-21-cardboard--docs) - Complete cardboard
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['gold', 'emerald', 'sapphire', 'amethyst'],
      description: 'Icon color variant',
      table: {
        type: { summary: 'gold | emerald | sapphire | amethyst' },
        defaultValue: { summary: 'gold' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Stat value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '90' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Stat label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Articles' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'Link URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/mark/articles' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'SVG icon HTML',
    },
  },
  args: {
    color: 'gold',
    value: '90',
    label: 'Articles',
    href: '/mark/articles',
  },
  render: ({ color, value, label, href, icon }) => {
    const card = document.createElement('a');
    card.href = href;
    card.className = 'stats-card';

    const iconSVG = icon || getDefaultIcon(color);

    card.innerHTML = `
      <div class="stats-card__body">
        <div class="stats-card__icon stats-card__icon--${color}">
          ${iconSVG}
        </div>
        <div class="stats-card__content">
          <div class="stats-card__value">${value}</div>
          <div class="stats-card__label">${label}</div>
        </div>
      </div>
    `;

    return card;
  },
} satisfies Meta<typeof CardboardStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default icons for each color
function getDefaultIcon(color: string): string {
  const icons: Record<string, string> = {
    gold: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>`,
    emerald: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>`,
    sapphire: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
    amethyst: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>`,
  };
  return icons[color] || icons.gold;
}

/**
 * Gold Variant — Articles
 *
 * Default gold variant for articles count
 */
export const GoldArticles: Story = {
  args: {
    color: 'gold',
    value: '90',
    label: 'Articles',
    href: '/mark/articles',
  },
};

/**
 * Emerald Variant — Forms
 *
 * Emerald variant for forms count
 */
export const EmeraldForms: Story = {
  args: {
    color: 'emerald',
    value: '12',
    label: 'Forms',
    href: '/mark/forms',
  },
};

/**
 * Sapphire Variant — Contacts
 *
 * Sapphire variant for contact submissions
 */
export const SapphireContacts: Story = {
  args: {
    color: 'sapphire',
    value: '49',
    label: 'Contacts',
    href: '/mark/contacts',
  },
};

/**
 * Amethyst Variant — Users
 *
 * Amethyst variant for user count
 */
export const AmethystUsers: Story = {
  args: {
    color: 'amethyst',
    value: '5',
    label: 'Users',
    href: '/mark/users',
  },
};

/**
 * Complete Stats Grid
 *
 * All 4 stats cards in cardboard grid layout
 */
export const CompleteStatsGrid: Story = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'cardboard-stats';
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; max-width: 1200px;';

    const stats = [
      {
        color: 'gold',
        value: '90',
        label: 'Articles',
        href: '/mark/articles',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>`
      },
      {
        color: 'emerald',
        value: '12',
        label: 'Forms',
        href: '/mark/forms',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </svg>`
      },
      {
        color: 'sapphire',
        value: '49',
        label: 'Contacts',
        href: '/mark/contacts',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>`
      },
      {
        color: 'amethyst',
        value: '5',
        label: 'Users',
        href: '/mark/users',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>`
      }
    ];

    stats.forEach(({ color, value, label, href, icon }) => {
      const card = document.createElement('a');
      card.href = href;
      card.className = 'stats-card';
      card.innerHTML = `
        <div class="stats-card__body">
          <div class="stats-card__icon stats-card__icon--${color}">
            ${icon}
          </div>
          <div class="stats-card__content">
            <div class="stats-card__value">${value}</div>
            <div class="stats-card__label">${label}</div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete stats grid showing all 4 color variants as they appear in the Mark cardboard.',
      },
    },
  },
};

/**
 * Large Numbers
 *
 * Stats card with large number values (1000+)
 */
export const LargeNumbers: Story = {
  args: {
    color: 'gold',
    value: '1,234',
    label: 'Total Views',
    href: '/mark/analytics',
  },
};

/**
 * Zero State
 *
 * Stats card with zero value
 */
export const ZeroState: Story = {
  args: {
    color: 'emerald',
    value: '0',
    label: 'New Today',
    href: '/mark/analytics',
  },
};

/**
 * With Percentage
 *
 * Stats card showing percentage in label
 */
export const WithPercentage: Story = {
  render: () => {
    const card = document.createElement('a');
    card.href = '/mark/analytics';
    card.className = 'stats-card';
    card.innerHTML = `
      <div class="stats-card__body">
        <div class="stats-card__icon stats-card__icon--gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <div class="stats-card__content">
          <div class="stats-card__value">+23.5%</div>
          <div class="stats-card__label">vs last month</div>
        </div>
      </div>
    `;
    return card;
  },
};

/**
 * Compact Layout
 *
 * Smaller stats card variant
 */
export const CompactLayout: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; max-width: 800px;';

    const stats = [
      { color: 'gold', value: '90', label: 'Articles' },
      { color: 'emerald', value: '12', label: 'Forms' },
      { color: 'sapphire', value: '49', label: 'Contacts' },
      { color: 'amethyst', value: '5', label: 'Users' }
    ];

    stats.forEach(({ color, value, label }) => {
      const card = document.createElement('div');
      card.className = 'stats-card';
      card.style.cssText = 'padding: 1rem;';
      card.innerHTML = `
        <div class="stats-card__body">
          <div class="stats-card__icon stats-card__icon--${color}" style="width: 40px; height: 40px; border-radius: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div class="stats-card__content">
            <div class="stats-card__value" style="font-size: 1.5rem;">${value}</div>
            <div class="stats-card__label" style="font-size: 0.75rem;">${label}</div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    return container;
  },
};
