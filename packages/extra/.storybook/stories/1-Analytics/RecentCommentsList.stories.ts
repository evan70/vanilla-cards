import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-card.css';

/**
 * RecentCommentsList Component
 * 
 * List of recent comments on articles.
 * Shows author name, article title, and comment excerpt.
 */
const meta = {
  title: 'Analytics/RecentCommentsList',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'recent-comments-card';
    container.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px;';
    
    const title = document.createElement('h2');
    title.textContent = 'Recent Comments';
    title.style.cssText = 'color: var(--color-text, #ffffff); font-size: 18px; margin-bottom: 20px;';
    container.appendChild(title);
    
    if (args.comments.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No comments yet';
      empty.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 14px; text-align: center; padding: 24px;';
      container.appendChild(empty);
      return container;
    }
    
    const list = document.createElement('ul');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 12px; list-style: none; padding: 0; margin: 0;';
    
    args.comments.forEach((comment) => {
      const item = document.createElement('li');
      item.style.cssText = 'padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--brand-sapphire, #0891B2);';
      
      const header = document.createElement('div');
      header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';
      
      const author = document.createElement('div');
      author.textContent = comment.author;
      author.style.cssText = 'color: var(--brand-sapphire, #0891B2); font-size: 14px; font-weight: 600;';
      header.appendChild(author);
      
      const date = document.createElement('div');
      date.textContent = comment.date;
      date.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 12px;';
      header.appendChild(date);
      
      item.appendChild(header);
      
      const article = document.createElement('div');
      article.textContent = `on "${comment.article}"`;
      article.style.cssText = 'color: var(--color-text, #ffffff); font-size: 13px; font-style: italic; margin-bottom: 8px;';
      item.appendChild(article);
      
      if (comment.content) {
        const content = document.createElement('p');
        content.textContent = comment.content;
        content.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 14px; margin: 0; line-height: 1.5;';
        item.appendChild(content);
      }
      
      list.appendChild(item);
    });
    
    container.appendChild(list);
    return container;
  },
  argTypes: {
    comments: {
      control: 'object',
      description: 'Array of comment objects with author, article, content, date'
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
} satisfies Meta<typeof RecentCommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default comments data
const defaultComments = [
  { 
    author: 'User 2', 
    article: 'Test Article', 
    content: 'Great post! Very informative and well-written.', 
    date: '2026-03-23' 
  },
  { 
    author: 'John Doe', 
    article: 'PHP CMS Tutorial', 
    content: 'Thanks for sharing this. Helped me understand the architecture better.', 
    date: '2026-03-22' 
  },
  { 
    author: 'Jane Smith', 
    article: 'Svelte 5 Features', 
    content: 'Excellent explanation of the new features!', 
    date: '2026-03-21' 
  },
  { 
    author: 'User 2', 
    article: 'BEM Best Practices', 
    content: 'This is exactly what I was looking for.', 
    date: '2026-03-20' 
  },
  { 
    author: 'John Doe', 
    article: 'Design Tokens Guide', 
    content: 'Very comprehensive guide. Bookmarked for future reference.', 
    date: '2026-03-19' 
  }
];

/**
 * Default Recent Comments
 * 
 * Shows 5 recent comments
 */
export const Default: Story = {
  args: {
    comments: defaultComments
  }
};

/**
 * Empty State
 * 
 * No comments yet
 */
export const EmptyState: Story = {
  args: {
    comments: []
  }
};

/**
 * Single Comment
 * 
 * Just one comment
 */
export const SingleComment: Story = {
  args: {
    comments: [
      { 
        author: 'John Doe', 
        article: 'Welcome to PHP CMS', 
        content: 'Great introduction to the platform!', 
        date: '2026-03-23' 
      }
    ]
  }
};

/**
 * Many Comments
 * 
 * Shows 10 comments (scrolling list)
 */
export const ManyComments: Story = {
  args: {
    comments: [
      { author: 'User 2', article: 'Test Article', content: 'Great post!', date: '2026-03-23' },
      { author: 'John Doe', article: 'PHP CMS Tutorial', content: 'Very helpful', date: '2026-03-22' },
      { author: 'Jane Smith', article: 'Svelte 5 Features', content: 'Excellent!', date: '2026-03-21' },
      { author: 'User 2', article: 'BEM Best Practices', content: 'Thanks!', date: '2026-03-20' },
      { author: 'John Doe', article: 'Design Tokens Guide', content: 'Bookmarked', date: '2026-03-19' },
      { author: 'Alice', article: 'DDD Architecture', content: 'Well explained', date: '2026-03-18' },
      { author: 'Bob', article: 'SQLite Tips', content: 'Very useful', date: '2026-03-17' },
      { author: 'User 2', article: 'Form Builder', content: 'Amazing work', date: '2026-03-16' },
      { author: 'Charlie', article: 'RBAC System', content: 'Exactly what I needed', date: '2026-03-15' },
      { author: 'John Doe', article: 'Vanilla TS', content: 'Love it', date: '2026-03-14' }
    ]
  }
};

/**
 * Without Content
 * 
 * Comments without text content (just author/article)
 */
export const WithoutContent: Story = {
  args: {
    comments: [
      { author: 'User 2', article: 'Test Article', content: '', date: '2026-03-23' },
      { author: 'John Doe', article: 'PHP CMS Tutorial', content: '', date: '2026-03-22' },
      { author: 'Jane Smith', article: 'Svelte 5 Features', content: '', date: '2026-03-21' }
    ]
  }
};

/**
 * Long Content
 * 
 * Comments with very long text
 */
export const LongContent: Story = {
  args: {
    comments: [
      { 
        author: 'John Doe', 
        article: 'Complete Guide to PHP', 
        content: 'This is an incredibly comprehensive guide. I particularly appreciated the section on DDD architecture and how it applies to PHP projects. The examples are clear and the explanations are thorough. I\'ve been working with PHP for 5 years and still learned several new techniques. Highly recommended for anyone looking to improve their PHP skills!', 
        date: '2026-03-23' 
      },
      { 
        author: 'Jane Smith', 
        article: 'TypeScript Best Practices', 
        content: 'Excellent article! The type safety patterns you\'ve shown here are exactly what our team needed. We\'re already implementing some of these in our codebase.', 
        date: '2026-03-22' 
      }
    ]
  }
};

/**
 * Pending Moderation
 * 
 * Comments awaiting approval (visual variant)
 */
export const PendingModeration: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px;';
    
    const title = document.createElement('h2');
    title.textContent = 'Recent Comments';
    title.style.cssText = 'color: var(--color-text, #ffffff); font-size: 18px; margin-bottom: 20px;';
    container.appendChild(title);
    
    const list = document.createElement('ul');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 12px; list-style: none; padding: 0; margin: 0;';
    
    const comments = [
      { author: 'User 2', article: 'Test Article', date: '2026-03-23', status: 'pending' },
      { author: 'John Doe', article: 'PHP CMS Tutorial', date: '2026-03-22', status: 'approved' },
      { author: 'Spam Bot', article: 'Welcome', date: '2026-03-21', status: 'pending' }
    ];
    
    comments.forEach((comment: any) => {
      const item = document.createElement('li');
      const borderColor = comment.status === 'pending' ? '#DC2626' : '#0891B2';
      item.style.cssText = `padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid ${borderColor}; opacity: ${comment.status === 'pending' ? '0.7' : '1'};`;
      
      const header = document.createElement('div');
      header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';
      
      const author = document.createElement('div');
      author.textContent = comment.author;
      author.style.cssText = 'color: var(--brand-sapphire, #0891B2); font-size: 14px; font-weight: 600;';
      header.appendChild(author);
      
      const status = document.createElement('span');
      status.textContent = comment.status === 'pending' ? '⏳ Pending' : '✓ Approved';
      status.style.cssText = `color: ${comment.status === 'pending' ? '#DC2626' : '#10B981'}; font-size: 12px;`;
      header.appendChild(status);
      
      item.appendChild(header);
      
      const article = document.createElement('div');
      article.textContent = `on "${comment.article}"`;
      article.style.cssText = 'color: var(--color-text, #ffffff); font-size: 13px; font-style: italic;';
      item.appendChild(article);
      
      list.appendChild(item);
    });
    
    container.appendChild(list);
    return container;
  }
};
