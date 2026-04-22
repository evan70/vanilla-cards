import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/styles/components/stats-card.css';
import '@vanilla-cards/mark/styles/cardboard-card.css';

// Import icons
import articlesIcon from '@vanilla-cards/assets/icons/articles.svg?raw';
import formsIcon from '@vanilla-cards/assets/icons/forms.svg?raw';
import contactsIcon from '@vanilla-cards/assets/icons/contacts.svg?raw';
import usersIcon from '@vanilla-cards/assets/icons/users.svg?raw';

/**
 * CardboardOverview Component
 * 
 * Complete stats grid showing 4 statistic cards.
 * Responsive grid layout with auto-fit columns.
 * 
 * @see cardboard-card.css for implementation
 */
const meta = {
  title: 'Analytics/CardboardOverview',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'cardboard-stats';
    
    args.stats.forEach(({ icon, value, label, color, href }) => {
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
  argTypes: {
    stats: {
      control: 'object',
      description: 'Array of stat objects with icon, value, label, color, href'
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
} satisfies Meta<typeof CardboardOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default stats data
const defaultStats = [
  {
    icon: articlesIcon,
    value: '90',
    label: 'Articles',
    color: 'gold' as const,
    href: '/mark/articles'
  },
  {
    icon: formsIcon,
    value: '0',
    label: 'Forms',
    color: 'emerald' as const,
    href: '/mark/forms'
  },
  {
    icon: contactsIcon,
    value: '49',
    label: 'Contacts',
    color: 'sapphire' as const,
    href: '/mark/contacts'
  },
  {
    icon: usersIcon,
    value: '1',
    label: 'Users',
    color: 'amethyst' as const,
    href: '/mark/users'
  }
];

/**
 * Default Cardboard Overview
 * 
 * Shows 4 stat cards with real data from cardboard API
 */
export const Default: Story = {
  args: {
    stats: defaultStats
  }
};

/**
 * Empty State
 * 
 * All stats at zero (fresh installation)
 */
export const EmptyState: Story = {
  args: {
    stats: [
      {
        icon: articlesIcon,
        value: '0',
        label: 'Articles',
        color: 'gold' as const,
        href: '/mark/articles'
      },
      {
        icon: formsIcon,
        value: '0',
        label: 'Forms',
        color: 'emerald' as const,
        href: '/mark/forms'
      },
      {
        icon: contactsIcon,
        value: '0',
        label: 'Contacts',
        color: 'sapphire' as const,
        href: '/mark/contacts'
      },
      {
        icon: usersIcon,
        value: '0',
        label: 'Users',
        color: 'amethyst' as const,
        href: '/mark/users'
      }
    ]
  }
};

/**
 * High Traffic
 * 
 * Example with large numbers
 */
export const HighTraffic: Story = {
  args: {
    stats: [
      {
        icon: articlesIcon,
        value: '1,250',
        label: 'Articles',
        color: 'gold' as const,
        href: '/mark/articles'
      },
      {
        icon: formsIcon,
        value: '87',
        label: 'Forms',
        color: 'emerald' as const,
        href: '/mark/forms'
      },
      {
        icon: contactsIcon,
        value: '523',
        label: 'Contacts',
        color: 'sapphire' as const,
        href: '/mark/contacts'
      },
      {
        icon: usersIcon,
        value: '12',
        label: 'Users',
        color: 'amethyst' as const,
        href: '/mark/users'
      }
    ]
  }
};

/**
 * Single Stat
 * 
 * Just one card (for custom layouts)
 */
export const SingleStat: Story = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'cardboard-stats';
    container.style.cssText = 'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));';
    
    const card = document.createElement('a');
    card.href = '/mark/articles';
    card.className = 'stats-card';
    card.innerHTML = `
      <div class="stats-card__body">
        <div class="stats-card__icon stats-card__icon--gold">
          ${articlesIcon}
        </div>
        <div class="stats-card__content">
          <div class="stats-card__value">90</div>
          <div class="stats-card__label">Articles</div>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    return container;
  }
};
