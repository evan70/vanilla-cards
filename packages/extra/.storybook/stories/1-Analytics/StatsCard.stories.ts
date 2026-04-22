import type { Meta, StoryObj } from '@storybook/html-vite';

/**
 * StatsCard Component
 * 
 * Individual statistic card with icon, value, and label.
 * Uses cardboard-card.css for glassmorphism styling.
 */
const meta = {
  title: 'Analytics/StatsCard',
  tags: ['autodocs'],
  render: (args) => {
    const card = document.createElement('a');
    card.href = args.href || '#';
    card.className = 'stats-card';
    
    card.innerHTML = `
      <div class="stats-card__body">
        <div class="stats-card__icon stats-card__icon--${args.color}">
          ${args.icon}
        </div>
        <div class="stats-card__content">
          <div class="stats-card__value">${args.value}</div>
          <div class="stats-card__label">${args.label}</div>
        </div>
      </div>
    `;
    
    return card;
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['gold', 'emerald', 'sapphire', 'amethyst'],
      description: 'Color variant'
    },
    value: {
      control: 'text',
      description: 'Statistic value'
    },
    label: {
      control: 'text',
      description: 'Label text'
    },
    href: {
      control: 'text',
      description: 'Link URL'
    },
    icon: {
      control: 'text',
      description: 'SVG icon HTML'
    }
  },
  parameters: {
    layout: 'centered',
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

// Icon imports
import articlesIcon from '@vanilla-cards/assets/icons/articles.svg?raw';
import formsIcon from '@vanilla-cards/assets/icons/forms.svg?raw';
import contactsIcon from '@vanilla-cards/assets/icons/contacts.svg?raw';
import usersIcon from '@vanilla-cards/assets/icons/users.svg?raw';

/**
 * Articles variant (gold)
 */
export const Articles: Story = {
  args: {
    icon: articlesIcon,
    value: '90',
    label: 'Articles',
    href: '/mark/articles',
    color: 'gold'
  }
};

/**
 * Forms variant (emerald)
 */
export const Forms: Story = {
  args: {
    icon: formsIcon,
    value: '0',
    label: 'Forms',
    href: '/mark/forms',
    color: 'emerald'
  }
};

/**
 * Contacts variant (sapphire)
 */
export const Contacts: Story = {
  args: {
    icon: contactsIcon,
    value: '49',
    label: 'Contacts',
    href: '/mark/contacts',
    color: 'sapphire'
  }
};

/**
 * Users variant (amethyst)
 */
export const Users: Story = {
  args: {
    icon: usersIcon,
    value: '1',
    label: 'Users',
    href: '/mark/users',
    color: 'amethyst'
  }
};

/**
 * All color variants displayed together
 */
export const AllVariants: Story = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'cardboard-stats';
    
    const variants = [
      { icon: articlesIcon, value: '90', label: 'Articles', color: 'gold', href: '/mark/articles' },
      { icon: formsIcon, value: '0', label: 'Forms', color: 'emerald', href: '/mark/forms' },
      { icon: contactsIcon, value: '49', label: 'Contacts', color: 'sapphire', href: '/mark/contacts' },
      { icon: usersIcon, value: '1', label: 'Users', color: 'amethyst', href: '/mark/users' }
    ];
    
    variants.forEach(({ icon, value, label, color, href }) => {
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
  }
};
