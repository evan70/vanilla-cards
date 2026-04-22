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
import pencilIcon from '@vanilla-cards/assets/icons/pencil.svg?raw';
import documentIcon from '@vanilla-cards/assets/icons/document.svg?raw';
import formIcon from '@vanilla-cards/assets/icons/form.svg?raw';
import imageIcon from '@vanilla-cards/assets/icons/image.svg?raw';

/**
 * CardboardOverview Component
 *
 * Complete cardboard layout with stats, actions, and lists.
 * Demonstrates all Cardboard components working together.
 */
const meta = {
  title: '0-Core/21-Cardboard/CardboardOverview',
  tags: ['autodocs'],
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';

    // Stats Grid
    const statsSection = document.createElement('section');
    statsSection.innerHTML = '<h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Statistics</h2>';
    
    const statsGrid = document.createElement('div');
    statsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;';
    
    const statsData = [
      { value: '1,234', label: 'Total Views', icon: eyeIcon, color: 'gold', trend: '+12.5%', trendDirection: 'up' as const },
      { value: '42', label: 'Articles', icon: articleIcon, color: 'emerald', trend: '+3', trendDirection: 'up' as const },
      { value: '18', label: 'Comments', icon: commentIcon, color: 'sapphire', trend: '-2', trendDirection: 'down' as const },
      { value: '8', label: 'Users', icon: userIcon, color: 'amethyst', trend: '+1', trendDirection: 'up' as const }
    ];
    
    statsData.forEach(({ value, label, icon, color, trend, trendDirection }) => {
      const card = document.createElement('stats-card');
      card.setAttribute('value', value);
      card.setAttribute('label', label);
      card.setAttribute('color', color);
      card.setAttribute('icon', icon);
      if (trend) {
        card.setAttribute('trend', trend);
        card.setAttribute('trend-direction', trendDirection);
      }
      statsGrid.appendChild(card);
    });
    
    statsSection.appendChild(statsGrid);
    container.appendChild(statsSection);

    // Actions Grid
    const actionsSection = document.createElement('section');
    actionsSection.innerHTML = '<h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Quick Actions</h2>';
    
    const actionsCard = document.createElement('actions-card');
    actionsCard.setAttribute('title', 'Quick Actions');
    actionsCard.setAttribute('actions', JSON.stringify([
      { label: 'New Article', href: '/mark/articles/new', icon: pencilIcon },
      { label: 'New Page', href: '/mark/pages/new', icon: documentIcon },
      { label: 'New Form', href: '/mark/forms/new', icon: formIcon },
      { label: 'Media Library', href: '/mark/media', icon: imageIcon }
    ]));
    
    actionsSection.appendChild(actionsCard);
    container.appendChild(actionsSection);

    // Lists Grid
    const listsSection = document.createElement('section');
    listsSection.innerHTML = '<h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Recent Activity</h2>';
    
    const listsGrid = document.createElement('div');
    listsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;';
    
    // Recent Articles
    const articlesCard = document.createElement('list-card');
    articlesCard.setAttribute('title', 'Recent Articles');
    articlesCard.setAttribute('items', JSON.stringify([
      { title: 'Getting Started with Nativa CMS', meta: 'Mar 22, 2026 • 1,234 views', href: '/mark/articles/edit/1' },
      { title: 'DDD Architecture in PHP', meta: 'Mar 20, 2026 • 892 views', href: '/mark/articles/edit/2' },
      { title: 'Vanilla TypeScript Best Practices', meta: 'Mar 18, 2026 • 756 views', href: '/mark/articles/edit/3' }
    ]));
    articlesCard.setAttribute('view-all-url', '/mark/articles');
    
    // Recent Comments
    const commentsCard = document.createElement('list-card');
    commentsCard.setAttribute('title', 'Recent Comments');
    commentsCard.setAttribute('items', JSON.stringify([
      { title: 'John Doe on "Getting Started"', meta: 'Mar 23, 2026 • Pending', href: '/mark/comments/1' },
      { title: 'Jane Smith on "DDD Architecture"', meta: 'Mar 21, 2026 • Approved', href: '/mark/comments/2' }
    ]));
    commentsCard.setAttribute('view-all-url', '/mark/comments');
    
    listsGrid.appendChild(articlesCard);
    listsGrid.appendChild(commentsCard);
    listsSection.appendChild(listsGrid);
    container.appendChild(listsSection);

    return container;
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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete Cardboard
 *
 * Full cardboard with all components
 */
export const Default: Story = {};

/**
 * Light Theme
 *
 * Cardboard in light mode
 */
export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  }
};
