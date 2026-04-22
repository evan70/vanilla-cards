import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles - using aliases
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-tokens.css';
import '@vanilla-cards/mark/styles/cardboard.css';

/**
 * TableCard Component
 *
 * Cardboard table card for displaying tabular data with sorting and pagination.
 * 
 * @see table-card.ts for implementation
 */
const meta = {
  title: '0-Core/21-Cardboard/TableCard',
  tags: ['autodocs'],
  render: (args) => {
    const card = document.createElement('table-card');
    card.setAttribute('title', args.title);
    card.setAttribute('columns', JSON.stringify(args.columns));
    card.setAttribute('rows', JSON.stringify(args.rows));
    
    if (args.actionUrl) {
      card.setAttribute('action-url', args.actionUrl);
    }
    
    if (args.actionText) {
      card.setAttribute('action-text', args.actionText);
    }
    
    if (args.sortable) {
      card.setAttribute('sortable', '');
    }
    
    if (args.perPage) {
      card.setAttribute('per-page', String(args.perPage));
    }
    
    return card;
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Data Table' }
      }
    },
    columns: {
      control: { type: 'object' },
      description: 'Column definitions: [{label, key, sortable}, ...]',
      table: {
        type: { summary: 'array' }
      }
    },
    rows: {
      control: { type: 'object' },
      description: 'Row data: [{key: value}, ...]',
      table: {
        type: { summary: 'array' }
      }
    },
    actionUrl: {
      control: { type: 'text' },
      description: 'URL for action button',
      table: {
        type: { summary: 'string' }
      }
    },
    actionText: {
      control: { type: 'text' },
      description: 'Action button text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'New' }
      }
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Enable column sorting',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    perPage: {
      control: { type: 'number' },
      description: 'Items per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '20' }
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
} satisfies Meta<typeof TableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default columns
const defaultColumns = [
  { label: 'Title', key: 'title', sortable: true },
  { label: 'Author', key: 'author', sortable: true },
  { label: 'Views', key: 'views', sortable: true },
  { label: 'Status', key: 'status' }
];

// Default rows
const defaultRows = [
  {
    title: 'Getting Started with Nativa CMS',
    author: 'John Doe',
    views: '1,234',
    status: 'Published'
  },
  {
    title: 'DDD Architecture in PHP',
    author: 'Jane Smith',
    views: '892',
    status: 'Published'
  },
  {
    title: 'Vanilla TypeScript Best Practices',
    author: 'Bob Johnson',
    views: '756',
    status: 'Published'
  },
  {
    title: 'Building Cardboard Components',
    author: 'Alice Brown',
    views: '543',
    status: 'Draft'
  },
  {
    title: 'Advanced PHP Patterns',
    author: 'Charlie Wilson',
    views: '432',
    status: 'Published'
  }
];

/**
 * Default Table Card
 *
 * Shows articles list with action button
 */
export const Default: Story = {
  args: {
    title: 'Articles',
    columns: defaultColumns,
    rows: defaultRows,
    actionUrl: '/mark/articles/new',
    actionText: 'New Article',
    sortable: true
  }
};

/**
 * Without Action Button
 *
 * Table without "New" button
 */
export const WithoutAction: Story = {
  args: {
    title: 'Recent Comments',
    columns: [
      { label: 'Author', key: 'author' },
      { label: 'Comment', key: 'comment' },
      { label: 'Date', key: 'date' },
      { label: 'Status', key: 'status' }
    ],
    rows: [
      {
        author: 'John Doe',
        comment: 'Great article! Very helpful.',
        date: 'Mar 23, 2026',
        status: 'Pending'
      },
      {
        author: 'Jane Smith',
        comment: 'Thanks for sharing this.',
        date: 'Mar 22, 2026',
        status: 'Approved'
      },
      {
        author: 'Bob Johnson',
        comment: 'Could you elaborate more on DDD?',
        date: 'Mar 21, 2026',
        status: 'Approved'
      }
    ]
  }
};

/**
 * Empty State
 *
 * No data in table
 */
export const EmptyState: Story = {
  args: {
    title: 'Articles',
    columns: defaultColumns,
    rows: [],
    actionUrl: '/mark/articles/new',
    actionText: 'New Article'
  }
};

/**
 * With Many Rows (Pagination)
 *
 * Testing pagination with many items
 */
export const WithPagination: Story = {
  args: {
    title: 'Users',
    columns: [
      { label: 'Name', key: 'name', sortable: true },
      { label: 'Email', key: 'email', sortable: true },
      { label: 'Role', key: 'role' },
      { label: 'Joined', key: 'joined', sortable: true }
    ],
    rows: Array.from({ length: 25 }, (_, i) => ({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : 'User',
      joined: `2026-0${(i % 12) + 1}-${(i % 28) + 1}`
    })),
    actionUrl: '/mark/users/new',
    actionText: 'New User',
    sortable: true,
    perPage: 10
  }
};

/**
 * Non-Sortable Columns
 *
 * Table without sorting
 */
export const NonSortable: Story = {
  args: {
    title: 'System Logs',
    columns: [
      { label: 'Timestamp', key: 'timestamp' },
      { label: 'Level', key: 'level' },
      { label: 'Message', key: 'message' }
    ],
    rows: [
      {
        timestamp: '2026-03-23 10:30:00',
        level: 'INFO',
        message: 'Application started successfully'
      },
      {
        timestamp: '2026-03-23 10:31:15',
        level: 'WARNING',
        message: 'High memory usage detected'
      },
      {
        timestamp: '2026-03-23 10:32:30',
        level: 'ERROR',
        message: 'Database connection timeout'
      }
    ]
  }
};

/**
 * With Status Badges
 *
 * Table with colored status indicators
 */
export const WithStatusBadges: Story = {
  args: {
    title: 'Orders',
    columns: [
      { label: 'Order ID', key: 'id' },
      { label: 'Customer', key: 'customer' },
      { label: 'Total', key: 'total' },
      { label: 'Status', key: 'status' }
    ],
    rows: [
      { id: '#1001', customer: 'John Doe', total: '$150.00', status: 'Completed' },
      { id: '#1002', customer: 'Jane Smith', total: '$89.99', status: 'Processing' },
      { id: '#1003', customer: 'Bob Johnson', total: '$234.50', status: 'Pending' },
      { id: '#1004', customer: 'Alice Brown', total: '$67.00', status: 'Cancelled' }
    ],
    actionUrl: '/mark/orders/new',
    actionText: 'New Order'
  }
};

// Import TableCard for TypeScript
import { TableCard } from '@vanilla-cards/components/table-card.js';
