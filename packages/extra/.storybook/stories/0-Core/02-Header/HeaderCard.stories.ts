import type { Meta, StoryObj } from '@storybook/html-vite';

/**
 * Header Card — Site header with navigation
 *
 * Fixed-position header with logo, navigation, and actions.
 */
const meta = {
  title: '0-Core/02. Header Card',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color theme',
    },
    showNav: {
      control: { type: 'boolean' },
      description: 'Show navigation',
    },
  },
  args: {
    theme: 'light',
    showNav: true,
  },
  render: ({ theme, showNav }) => `
    <div style="min-height: 100vh; background: var(--color-bg, ${theme === 'dark' ? '#0f172a' : '#f8fafc'});">
      <header class="header-card card" data-theme="${theme}">
        <div class="header-card__inner">
          <a href="/" class="header-card__logo">
            Nativa<span class="header-card__logo-dot">.</span>
          </a>
          
          ${showNav ? `
          <nav class="header-card__nav">
            <ul>
              <li><a href="#" class="header-card__nav-link">Home</a></li>
              <li><a href="#" class="header-card__nav-link">About</a></li>
              <li><a href="#" class="header-card__nav-link">Services</a></li>
              <li><a href="#" class="header-card__nav-link">Contact</a></li>
            </ul>
          </nav>
          ` : ''}
          
          <div class="header-card__actions">
            <button class="header-card__action-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <!-- Demo content to show header is fixed -->
      <main style="padding-top: 80px; padding-left: 2rem; padding-right: 2rem;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Page Content</h1>
        <p style="color: var(--color-text-muted, #64748b);">Scroll to see header stay fixed...</p>
      </main>
    </div>
  `,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic header with logo and navigation
 */
export const Basic: Story = {
  args: {
    theme: 'light',
    showNav: true,
  },
};

/**
 * Dark theme variant
 */
export const Dark: Story = {
  args: {
    theme: 'dark',
    showNav: true,
  },
};

/**
 * Without navigation (logo only)
 */
export const LogoOnly: Story = {
  args: {
    theme: 'light',
    showNav: false,
  },
};
