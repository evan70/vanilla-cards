import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-card.css';

/**
 * TopArticlesList Component
 *
 * List of top articles sorted by view count.
 * Shows article title, slug, and view count.
 */
const meta = {
  title: '0-Core/20-Lists/TopArticlesList',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'card card--list top-articles-card';

    const title = document.createElement('h2');
    title.className = 'card__title';
    title.textContent = 'Top Articles';
    container.appendChild(title);

    if (args.articles.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'card__empty';
      empty.textContent = 'No articles yet';
      container.appendChild(empty);
      return container;
    }

    const list = document.createElement('ul');
    list.className = 'card__list';

    args.articles.forEach((article) => {
      const item = document.createElement('li');
      item.className = 'card__list-item';

      const link = document.createElement('a');
      link.href = `/mark/articles/edit?id=${article.slug}`;
      link.className = 'card__list-link';

      const content = document.createElement('div');
      content.className = 'card__list-item-content';

      const titleEl = document.createElement('div');
      titleEl.className = 'card__list-item-title';
      titleEl.textContent = article.title;
      content.appendChild(titleEl);

      const slugEl = document.createElement('div');
      slugEl.className = 'card__list-item-meta';
      slugEl.textContent = article.slug;
      content.appendChild(slugEl);

      link.appendChild(content);

      const views = document.createElement('div');
      views.className = 'card__list-item-meta views-count';
      
      const eyeIcon = document.createElement('span');
      eyeIcon.className = 'views-icon';
      eyeIcon.textContent = '👁';
      views.appendChild(eyeIcon);

      const viewsEl = document.createElement('span');
      viewsEl.className = 'views-count-value';
      viewsEl.textContent = article.views.toLocaleString();
      views.appendChild(viewsEl);

      link.appendChild(views);
      item.appendChild(link);
      list.appendChild(item);
    });

    container.appendChild(list);
    return container;
  },
  argTypes: {
    articles: {
      control: 'object',
      description: 'Array of article objects with title, slug, views'
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
} satisfies Meta<typeof TopArticlesList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default articles data
const defaultArticles = [
  { title: 'Welcome to PHP CMS', slug: 'welcome-to-php-cms', views: 1250 },
  { title: 'Nativa PHP + Svelte 5 Architektúra', slug: 'nativa-php-svelte-5', views: 890 },
  { title: 'BEM + Design Tokens v Praxi', slug: 'bem-design-tokens', views: 654 },
  { title: 'Path Value Object Implementácia', slug: 'path-value-object', views: 432 },
  { title: 'Hybrid PHP/Svelte Rendering', slug: 'hybrid-rendering', views: 321 }
];

/**
 * Default Top Articles
 * 
 * Shows 5 articles sorted by views
 */
export const Default: Story = {
  args: {
    articles: defaultArticles
  }
};

/**
 * Empty State
 * 
 * No articles available
 */
export const EmptyState: Story = {
  args: {
    articles: []
  }
};

/**
 * Single Article
 * 
 * Just one article in the list
 */
export const SingleArticle: Story = {
  args: {
    articles: [
      { title: 'Welcome to PHP CMS', slug: 'welcome-to-php-cms', views: 1250 }
    ]
  }
};

/**
 * Many Articles
 * 
 * Shows 10 articles (scrolling list)
 */
export const ManyArticles: Story = {
  args: {
    articles: [
      { title: 'Welcome to PHP CMS', slug: 'welcome-to-php-cms', views: 2450 },
      { title: 'Nativa PHP + Svelte 5 Architektúra', slug: 'nativa-php-svelte-5', views: 1890 },
      { title: 'BEM + Design Tokens v Praxi', slug: 'bem-design-tokens', views: 1654 },
      { title: 'Path Value Object Implementácia', slug: 'path-value-object', views: 1432 },
      { title: 'Hybrid PHP/Svelte Rendering', slug: 'hybrid-rendering', views: 1321 },
      { title: 'SQLite vs PostgreSQL Comparison', slug: 'sqlite-vs-postgresql', views: 1180 },
      { title: 'DDD Architecture in PHP', slug: 'ddd-architecture-php', views: 1050 },
      { title: 'Vanilla TypeScript Best Practices', slug: 'vanilla-typescript', views: 980 },
      { title: 'Form Builder Implementation', slug: 'form-builder', views: 875 },
      { title: 'RBAC System Design', slug: 'rbac-system', views: 790 }
    ]
  }
};

/**
 * Long Titles
 * 
 * Articles with very long titles (truncation test)
 */
export const LongTitles: Story = {
  args: {
    articles: [
      { 
        title: 'Complete Guide to Building Modern Web Applications with PHP 8.4 and Vanilla TypeScript', 
        slug: 'complete-guide-php-typescript', 
        views: 1250 
      },
      { 
        title: 'Understanding Domain-Driven Design: A Comprehensive Approach to Software Architecture', 
        slug: 'ddd-comprehensive-guide', 
        views: 890 
      },
      { 
        title: 'BEM CSS Methodology and Design Tokens: The Ultimate Combination for Scalable Stylesheets', 
        slug: 'bem-design-tokens-ultimate', 
        views: 654 
      }
    ]
  }
};

/**
 * Zero Views
 * 
 * Articles with no views yet
 */
export const ZeroViews: Story = {
  args: {
    articles: [
      { title: 'New Article 1', slug: 'new-article-1', views: 0 },
      { title: 'New Article 2', slug: 'new-article-2', views: 0 },
      { title: 'New Article 3', slug: 'new-article-3', views: 0 }
    ]
  }
};
