import type { Meta, StoryObj } from '@storybook/html-vite';

/**
 * Card List Variant — Cardboard list cards
 *
 * Special card variant used in Mark cardboard for displaying lists
 * (top articles, recent comments, etc.).
 *
 * Features glassmorphism styling with gradient background and subtle borders.
 *
 * ## Usage
 *
 * ```html
 * <div class="card card--list">
 *   <div class="card__header">
 *     <h2 class="card__title">Top Articles</h2>
 *   </div>
 *   <ul class="card__list">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * </div>
 * ```
 *
 * ## CSS
 * Located in: `vanilla-cards/mark/styles/cardboard-card.css`
 */

const meta = {
  title: '0-Core/06-Stats/CardListVariant',
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
**Card List Variant** is a special card style used in the Mark cardboard for displaying lists and charts.

### Key Features
- ✅ Glassmorphism gradient background
- ✅ Subtle border with glow effect
- ✅ Top highlight gradient
- ✅ Optimized for list content
- ✅ Dark theme focused

### Structure

\`\`\`
.card.card--list
├── .card__header
│   └── .card__title
└── .card__list (or .card__content)
    └── List items or content
\`\`\`

### Related
- [Stats Card](/docs/0-core-6-stats--docs) - Statistics display
- [Cardboard Overview](/docs/0-core-21-cardboard--docs) - Complete cardboard
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Top Articles' },
      },
    },
    showHeader: {
      control: { type: 'boolean' },
      description: 'Show card header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    listItems: {
      control: { type: 'object' },
      description: 'Array of list item strings',
    },
  },
  args: {
    title: 'Top Articles',
    showHeader: true,
    listItems: ['Item 1', 'Item 2', 'Item 3'],
  },
  render: ({ title, showHeader, listItems }) => {
    const card = document.createElement('div');
    card.className = 'card card--list story-demo-card';

    if (showHeader) {
      const header = document.createElement('div');
      header.className = 'card__header';

      const cardTitle = document.createElement('h2');
      cardTitle.className = 'card__title';
      cardTitle.textContent = title;

      header.appendChild(cardTitle);
      card.appendChild(header);
    }

    const listContainer = document.createElement('ul');
    listContainer.className = 'card__list';

    listItems.forEach((item: string) => {
      const listItem = document.createElement('li');
      listItem.className = 'card__list-item';
      listItem.textContent = item;
      listContainer.appendChild(listItem);
    });

    card.appendChild(listContainer);
    return card;
  },
} satisfies Meta<typeof CardListVariant>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default List Card
 *
 * Standard cardboard list card with header and items
 */
export const Default: Story = {
  args: {
    title: 'Top Articles',
    showHeader: true,
    listItems: [
      'Welcome to PHP CMS (1,250 views)',
      'Nativa PHP + Svelte 5 Architektúra (890 views)',
      'BEM + Design Tokens v Praxi (654 views)',
      'Path Value Object Implementácia (432 views)',
      'Hybrid PHP/Svelte Rendering (321 views)'
    ],
  },
};

/**
 * Without Header
 *
 * List card without header
 */
export const WithoutHeader: Story = {
  args: {
    title: '',
    showHeader: false,
    listItems: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
  },
};

/**
 * Recent Comments Style
 *
 * List card styled for comments display
 */
export const RecentCommentsStyle: Story = {
  render: () => {
    const card = document.createElement('div');
    card.className = 'card card--list story-demo-card';

    const header = document.createElement('div');
    header.className = 'card__header';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.textContent = 'Recent Comments';

    header.appendChild(cardTitle);
    card.appendChild(header);

    const listContainer = document.createElement('ul');
    listContainer.className = 'card__list';

    const comments = [
      { author: 'John Doe', article: 'PHP CMS Tutorial', date: '2026-03-23' },
      { author: 'Jane Smith', article: 'Svelte 5 Features', date: '2026-03-22' },
      { author: 'User 2', article: 'BEM Best Practices', date: '2026-03-21' },
    ];

    comments.forEach(({ author, article, date }) => {
      const listItem = document.createElement('li');
      listItem.className = 'card__list-item card__list-item--approved';

      const header = document.createElement('div');
      header.className = 'card__list-item-meta card__list-item-meta--spaced';

      const authorEl = document.createElement('span');
      authorEl.textContent = author;
      authorEl.className = 'card__list-item-title card__list-item-title--brand';

      const dateEl = document.createElement('time');
      dateEl.dateTime = date;
      dateEl.textContent = date;
      dateEl.className = 'card__list-item-meta';

      header.appendChild(authorEl);
      header.appendChild(dateEl);

      const articleEl = document.createElement('div');
      articleEl.textContent = `on "${article}"`;
      articleEl.className = 'card__list-item-content card__list-item-content--italic';

      listItem.appendChild(header);
      listItem.appendChild(articleEl);
      listContainer.appendChild(listItem);
    });

    card.appendChild(listContainer);
    return card;
  },
};

/**
 * Empty State
 *
 * List card with no items
 */
export const EmptyState: Story = {
  render: () => {
    const card = document.createElement('div');
    card.className = 'card card--list story-demo-card';

    const header = document.createElement('div');
    header.className = 'card__header';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.textContent = 'Top Articles';

    header.appendChild(cardTitle);
    card.appendChild(header);

    const emptyState = document.createElement('div');
    emptyState.className = 'card__empty';
    emptyState.textContent = 'No articles yet';

    card.appendChild(emptyState);
    return card;
  },
};

/**
 * With Actions
 *
 * List card with action buttons
 */
export const WithActions: Story = {
  render: () => {
    const card = document.createElement('div');
    card.className = 'card card--list story-demo-card';

    const header = document.createElement('div');
    header.className = 'card__header card__header--with-actions';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card__title';
    cardTitle.textContent = 'Quick Actions';

    const actionBtn = document.createElement('button');
    actionBtn.className = 'mark-btn mark-btn--sm mark-btn--primary';
    actionBtn.textContent = 'View All';

    header.appendChild(cardTitle);
    header.appendChild(actionBtn);
    card.appendChild(header);

    const listContainer = document.createElement('ul');
    listContainer.className = 'card__list';

    const actions = ['Create Article', 'Create Page', 'Upload Media', 'Manage Users'];

    actions.forEach((action) => {
      const listItem = document.createElement('li');
      listItem.className = 'card__list-item';
      
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'card__list-link';
      link.textContent = action;
      
      listItem.appendChild(link);
      listContainer.appendChild(listItem);
    });

    card.appendChild(listContainer);
    return card;
  },
};
