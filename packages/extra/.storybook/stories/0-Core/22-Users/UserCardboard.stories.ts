import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-card.css';

/**
 * UserCardboard Component
 *
 * Displays a list of users in a card format.
 * Used in Mark cardboard for user management overview.
 *
 * ## Features
 * - User email and role
 * - Status indicator (active/inactive)
 * - Creation date
 * - Action links (edit, delete)
 *
 * ## Usage
 * ```html
 * <div class="card card--list">
 *   <div class="card__header">
 *     <h2 class="card__title">Users</h2>
 *   </div>
 *   <ul class="card__list">
 *     <li class="card__list-item">
 *       <a href="/mark/users/1/edit" class="card__list-link">
 *         <div class="card__list-item-title">user@example.com</div>
 *         <div class="card__list-item-meta">
 *           <span class="badge badge--admin">Admin</span>
 *           <span>Mar 24, 2026</span>
 *         </div>
 *       </a>
 *     </li>
 *   </ul>
 * </div>
 * ```
 *
 * ## CSS
 * Located in: `vanilla-cards/mark/styles/cardboard-card.css`
 */

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UserCardboardArgs {
  users: User[];
  title?: string;
  showActions?: boolean;
}

const meta = {
  title: '0-Core/22-Users/UserCardboard',
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
**UserCardboard** displays a list of users in the Mark cardboard.

### Key Features
- ✅ User email and role badge
- ✅ Account creation date
- ✅ Status indicator (active/inactive)
- ✅ Click to edit user
- ✅ Pure CSS classes (no inline styles)

### Structure

\`\`\`
.card.card--list
├── .card__header
│   └── .card__title
└── .card__list
    └── .card__list-item
        └── .card__list-link
            ├── .card__list-item-title (user email)
            └── .card__list-item-meta (role badge + date)
\`\`\`

### Related
- [CardListVariant](/docs/0-core-6-stats--docs) - Base list card
- [TopArticlesList](/docs/0-core-20-lists-toparticleslist--docs) - Articles list
- [RecentCommentsList](/docs/0-core-20-lists-recentcommentslist--docs) - Comments list
        `,
      },
    },
  },
  argTypes: {
    users: {
      control: { type: 'object' },
      description: 'Array of user objects with id, email, role, status, createdAt',
    },
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Users' },
      },
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Show action buttons in header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    title: 'Users',
    showActions: false,
    users: [],
  },
  render: (args: UserCardboardArgs) => {
    const card = document.createElement('div');
    card.className = 'card card--list story-demo-card';

    // Header
    const header = document.createElement('div');
    header.className = 'card__header';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.textContent = args.title || 'Users';

    header.appendChild(cardTitle);

    // Optional "Create User" button
    if (args.showActions) {
      const actionBtn = document.createElement('a');
      actionBtn.className = 'mark-btn mark-btn--sm mark-btn--primary';
      actionBtn.textContent = 'Create User';
      actionBtn.href = '/mark/users/create';
      header.appendChild(actionBtn);
    }

    card.appendChild(header);

    // Empty state
    if (args.users.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'card__empty';
      emptyState.textContent = 'No users yet';
      card.appendChild(emptyState);
      return card;
    }

    // User list
    const list = document.createElement('ul');
    list.className = 'card__list';

    args.users.forEach((user) => {
      const item = document.createElement('li');
      item.className = 'card__list-item';

      const link = document.createElement('a');
      link.className = 'card__list-link';
      link.href = `/mark/users/${user.id}/edit`;

      const titleEl = document.createElement('div');
      titleEl.className = 'card__list-item-title';
      titleEl.textContent = user.email;

      const meta = document.createElement('div');
      meta.className = 'card__list-item-meta';

      const roleBadge = document.createElement('span');
      roleBadge.className = `badge badge--${user.role}`;
      roleBadge.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);

      const dateEl = document.createElement('time');
      dateEl.className = 'card__list-item-meta';
      dateEl.dateTime = user.createdAt;
      dateEl.textContent = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      meta.appendChild(roleBadge);
      meta.appendChild(dateEl);

      link.appendChild(titleEl);
      link.appendChild(meta);
      item.appendChild(link);
      list.appendChild(item);
    });

    card.appendChild(list);
    return card;
  },
} satisfies Meta<typeof UserCardboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default users data
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@phpcms.local',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    email: 'editor@phpcms.local',
    role: 'editor',
    status: 'active',
    createdAt: '2026-02-20',
  },
  {
    id: '3',
    email: 'user@phpcms.local',
    role: 'user',
    status: 'active',
    createdAt: '2026-03-10',
  },
  {
    id: '4',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2026-03-18',
  },
  {
    id: '5',
    email: 'jane@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2026-03-22',
  },
];

/**
 * Default User List
 *
 * Shows list of users with roles and dates
 */
export const Default: Story = {
  args: {
    users: defaultUsers,
  },
};

/**
 * With Create Action
 *
 * Shows header with "Create User" button
 */
export const WithCreateAction: Story = {
  args: {
    users: defaultUsers,
    showActions: true,
  },
};

/**
 * Empty State
 *
 * No users in the system
 */
export const EmptyState: Story = {
  args: {
    users: [],
  },
};

/**
 * Single User
 *
 * Just one user in the list
 */
export const SingleUser: Story = {
  args: {
    users: [defaultUsers[0]],
  },
};

/**
 * Admin Users Only
 *
 * Filtered to show only admin users
 */
export const AdminUsersOnly: Story = {
  args: {
    users: defaultUsers.filter((u) => u.role === 'admin'),
  },
};

/**
 * Many Users
 *
 * Shows 10 users (scrolling list)
 */
export const ManyUsers: Story = {
  args: {
    users: [
      ...defaultUsers,
      { id: '6', email: 'user6@example.com', role: 'user', status: 'active', createdAt: '2026-03-23' },
      { id: '7', email: 'user7@example.com', role: 'editor', status: 'active', createdAt: '2026-03-23' },
      { id: '8', email: 'user8@example.com', role: 'user', status: 'active', createdAt: '2026-03-23' },
      { id: '9', email: 'user9@example.com', role: 'user', status: 'active', createdAt: '2026-03-23' },
      { id: '10', email: 'user10@example.com', role: 'admin', status: 'active', createdAt: '2026-03-23' },
    ],
  },
};
