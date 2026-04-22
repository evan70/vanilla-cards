import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles - using aliases
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-tokens.css';
import '@vanilla-cards/mark/styles/cardboard.css';

/**
 * ListCard Component
 *
 * Cardboard list card for displaying items like recent articles, comments, etc.
 * 
 * @see list-card.ts for implementation
 */
const meta = {
  title: '0-Core/21-Cardboard/ListCard',
  tags: ['autodocs'],
  render: (args) => {
    const card = document.createElement('list-card');
    card.setAttribute('title', args.title);
    card.setAttribute('items', JSON.stringify(args.items));
    
    if (args.viewAllUrl) {
      card.setAttribute('view-all-url', args.viewAllUrl);
    }
    
    if (args.limit) {
      card.setAttribute('limit', String(args.limit));
    }
    
    return card;
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Recent Items' }
      }
    },
    items: {
      control: { type: 'object' },
      description: 'Array of items: [{title, meta, href}, ...]',
      table: {
        type: { summary: 'array' }
      }
    },
    viewAllUrl: {
      control: { type: 'text' },
      description: 'URL for "View All" link',
      table: {
        type: { summary: 'string' }
      }
    },
    limit: {
      control: { type: 'number' },
      description: 'Maximum number of items to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' }
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
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default items data
const defaultItems = [
  {
    title: 'Getting Started with Nativa CMS',
    meta: 'Mar 22, 2026 • 1,234 views',
    href: '/mark/articles/edit/1'
  },
  {
    title: 'DDD Architecture in PHP',
    meta: 'Mar 20, 2026 • 892 views',
    href: '/mark/articles/edit/2'
  },
  {
    title: 'Vanilla TypeScript Best Practices',
    meta: 'Mar 18, 2026 • 756 views',
    href: '/mark/articles/edit/3'
  },
  {
    title: 'Building Cardboard Components',
    meta: 'Mar 15, 2026 • 543 views',
    href: '/mark/articles/edit/4'
  }
];

/**
 * Default List Card
 *
 * Shows a list of recent articles
 */
export const Default: Story = {
  args: {
    title: 'Recent Articles',
    items: defaultItems,
    viewAllUrl: '/mark/articles',
    limit: 5
  }
};

/**
 * With Few Items
 *
 * List with only 2 items
 */
export const WithFewItems: Story = {
  args: {
    title: 'Recent Comments',
    items: [
      {
        title: 'John Doe on "Getting Started"',
        meta: 'Mar 23, 2026 • Pending',
        href: '/mark/comments/1'
      },
      {
        title: 'Jane Smith on "DDD Architecture"',
        meta: 'Mar 21, 2026 • Approved',
        href: '/mark/comments/2'
      }
    ],
    viewAllUrl: '/mark/comments'
  }
};

/**
 * Empty State
 *
 * No items in list
 */
export const EmptyState: Story = {
  args: {
    title: 'Recent Articles',
    items: [],
    viewAllUrl: '/mark/articles'
  }
};

/**
 * With Long Titles
 *
 * Testing text overflow handling
 */
export const WithLongTitles: Story = {
  args: {
    title: 'Recent Articles',
    items: [
      {
        title: 'This is a Very Long Article Title That Should Test How the Component Handles Text Overflow and Wrapping',
        meta: 'Mar 22, 2026 • 1,234 views',
        href: '/mark/articles/edit/1'
      },
      {
        title: 'Another Long Title: Advanced Techniques for Building Modern Web Applications with PHP and TypeScript',
        meta: 'Mar 20, 2026 • 892 views',
        href: '/mark/articles/edit/2'
      }
    ]
  }
};

/**
 * Without View All Link
 *
 * List without the "View All" action
 */
export const WithoutViewAll: Story = {
  args: {
    title: 'Quick Links',
    items: [
      {
        title: 'Cardboard Settings',
        meta: 'Configure your cardboard',
        href: '/mark/settings'
      },
      {
        title: 'User Profile',
        meta: 'Edit your profile',
        href: '/mark/profile'
      }
    ]
  }
};

/**
 * With Custom Limit
 *
 * Show only 2 items from larger list
 */
export const WithCustomLimit: Story = {
  args: {
    title: 'Top Articles',
    items: defaultItems,
    viewAllUrl: '/mark/articles',
    limit: 2
  }
};

// Import ListCard for TypeScript
import { ListCard } from '@vanilla-cards/components/list-card.js';
