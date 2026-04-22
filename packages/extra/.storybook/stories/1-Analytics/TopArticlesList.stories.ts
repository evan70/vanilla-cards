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
  title: 'Analytics/TopArticlesList',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'top-articles-card';
    container.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px;';
    
    const title = document.createElement('h2');
    title.textContent = 'Top Articles';
    title.style.cssText = 'color: var(--color-text, #ffffff); font-size: 18px; margin-bottom: 20px;';
    container.appendChild(title);
    
    if (args.articles.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No articles yet';
      empty.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 14px; text-align: center; padding: 24px;';
      container.appendChild(empty);
      return container;
    }
    
    const list = document.createElement('ul');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 12px; list-style: none; padding: 0; margin: 0;';
    
    args.articles.forEach((article, index) => {
      const item = document.createElement('li');
      
      const link = document.createElement('a');
      link.href = `/mark/articles/edit?id=${article.slug}`;
      link.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.2s ease;';
      link.onmouseover = () => {
        link.style.background = 'rgba(255,255,255,0.08)';
        link.style.transform = 'translateX(4px)';
      };
      link.onmouseout = () => {
        link.style.background = 'rgba(255,255,255,0.05)';
        link.style.transform = 'translateX(0)';
      };
      
      const content = document.createElement('div');
      content.style.cssText = 'flex: 1; min-width: 0;';
      
      const titleEl = document.createElement('div');
      titleEl.textContent = article.title;
      titleEl.style.cssText = 'color: var(--color-text, #ffffff); font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
      content.appendChild(titleEl);
      
      const slugEl = document.createElement('div');
      slugEl.textContent = article.slug;
      slugEl.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 12px; margin-top: 2px;';
      content.appendChild(slugEl);
      
      link.appendChild(content);
      
      const views = document.createElement('div');
      views.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: 16px;';
      
      const eyeIcon = document.createElement('span');
      eyeIcon.textContent = '👁';
      eyeIcon.style.cssText = 'font-size: 14px;';
      views.appendChild(eyeIcon);
      
      const viewsEl = document.createElement('span');
      viewsEl.textContent = article.views.toLocaleString();
      viewsEl.style.cssText = 'color: var(--brand-gold, #D4AF37); font-size: 14px; font-weight: 600; min-width: 60px; text-align: right;';
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
