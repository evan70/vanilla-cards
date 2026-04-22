import type { Meta, StoryObj } from '@storybook/html-vite';

// Import styles
import '@vanilla-cards/styles/core/index.css';
import '@vanilla-cards/mark/styles/cardboard-card.css';

/**
 * QuickLinks Component
 * 
 * Grid of navigation cards for quick access to admin sections.
 * Each card shows name, description, and "Open →" link.
 */
const meta = {
  title: '0-Core/21-Cardboard/QuickLinks',
  tags: ['autodocs'],
  render: (args) => {
    const container = document.createElement('div');
    container.className = 'quick-links-grid';
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;';
    
    args.links.forEach(({ name, desc, href }) => {
      const card = document.createElement('a');
      card.href = href;
      card.className = 'quick-link-card';
      card.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; padding: 20px; background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; text-decoration: none; color: inherit; transition: all 0.2s ease;';
      card.onmouseover = () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
      };
      card.onmouseout = () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      };
      
      const content = document.createElement('div');
      content.style.cssText = 'flex: 1;';
      
      const nameEl = document.createElement('h3');
      nameEl.textContent = name;
      nameEl.style.cssText = 'color: var(--color-text, #ffffff); font-size: 16px; font-weight: 600; margin: 0 0 4px 0;';
      content.appendChild(nameEl);
      
      const descEl = document.createElement('p');
      descEl.textContent = desc;
      descEl.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 14px; margin: 0;';
      content.appendChild(descEl);
      
      card.appendChild(content);
      
      const arrow = document.createElement('span');
      arrow.textContent = 'Open →';
      arrow.style.cssText = 'color: var(--brand-gold, #D4AF37); font-size: 14px; font-weight: 500;';
      card.appendChild(arrow);
      
      container.appendChild(card);
    });
    
    return container;
  },
  argTypes: {
    links: {
      control: 'object',
      description: 'Array of link objects with name, desc, href'
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
} satisfies Meta<typeof QuickLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default quick links data
const defaultLinks = [
  { name: 'Articles', desc: 'Manage blog posts', href: '/mark/articles' },
  { name: 'Pages', desc: 'Static pages', href: '/mark/pages' },
  { name: 'Categories', desc: 'Article categories', href: '/mark/categories' },
  { name: 'Tags', desc: 'Article tags', href: '/mark/tags' },
  { name: 'Media', desc: 'Media library', href: '/mark/media' },
  { name: 'Forms', desc: 'Form builder', href: '/mark/forms' },
  { name: 'Settings', desc: 'Site configuration', href: '/mark/settings' }
];

/**
 * Default Quick Links
 * 
 * Shows all 7 admin navigation cards
 */
export const Default: Story = {
  args: {
    links: defaultLinks
  }
};

/**
 * Minimal Links
 * 
 * Just 3 essential links
 */
export const Minimal: Story = {
  args: {
    links: [
      { name: 'Articles', desc: 'Manage blog posts', href: '/mark/articles' },
      { name: 'Pages', desc: 'Static pages', href: '/mark/pages' },
      { name: 'Settings', desc: 'Site configuration', href: '/mark/settings' }
    ]
  }
};

/**
 * Content Management
 * 
 * Only content-related links
 */
export const ContentManagement: Story = {
  args: {
    links: [
      { name: 'Articles', desc: 'Manage blog posts', href: '/mark/articles' },
      { name: 'Pages', desc: 'Static pages', href: '/mark/pages' },
      { name: 'Categories', desc: 'Article categories', href: '/mark/categories' },
      { name: 'Tags', desc: 'Article tags', href: '/mark/tags' },
      { name: 'Media', desc: 'Media library', href: '/mark/media' }
    ]
  }
};

/**
 * Single Link
 * 
 * Just one card (for custom layouts)
 */
export const SingleLink: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;';
    
    const card = document.createElement('a');
    card.href = '/mark/articles';
    card.className = 'quick-link-card';
    card.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; padding: 20px; background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; text-decoration: none; color: inherit; transition: all 0.2s ease;';
    
    const content = document.createElement('div');
    content.style.cssText = 'flex: 1;';
    
    const nameEl = document.createElement('h3');
    nameEl.textContent = 'Articles';
    nameEl.style.cssText = 'color: var(--color-text, #ffffff); font-size: 16px; font-weight: 600; margin: 0 0 4px 0;';
    content.appendChild(nameEl);
    
    const descEl = document.createElement('p');
    descEl.textContent = 'Manage blog posts';
    descEl.style.cssText = 'color: var(--color-text-muted, #94a3b8); font-size: 14px; margin: 0;';
    content.appendChild(descEl);
    
    card.appendChild(content);
    
    const arrow = document.createElement('span');
    arrow.textContent = 'Open →';
    arrow.style.cssText = 'color: var(--brand-gold, #D4AF37); font-size: 14px; font-weight: 500;';
    card.appendChild(arrow);
    
    container.appendChild(card);
    return container;
  }
};

/**
 * Empty State
 * 
 * No links available
 */
export const EmptyState: Story = {
  args: {
    links: []
  },
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'text-align: center; padding: 48px; color: var(--color-text-muted, #94a3b8);';
    container.textContent = 'No quick links available';
    return container;
  }
};
