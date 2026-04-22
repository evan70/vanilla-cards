import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Content Card — Articles and blog posts
 *
 * Optimized for content display with images, categories, excerpts, and meta information.
 *
 * ## Usage
 *
 * ```html
 * <article class="content-card card">
 *   <div class="content-card__image-wrapper">
 *     <img class="content-card__image" src="..." alt="..." />
 *     <span class="content-card__category">Category</span>
 *   </div>
 *   <div class="card__body">
 *     <div class="content-card__meta">...</div>
 *     <h3 class="card__title">...</h3>
 *     <p class="content-card__excerpt">...</p>
 *   </div>
 *   <div class="card__footer">
 *     <a href="#" class="content-card__link">Read more</a>
 *   </div>
 * </article>
 * ```
 *
 * ## CSS Default
 * Uses elevated variant by default
 */

const meta = {
  title: '0-Core/03. Content Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Content Card** is designed for articles, blog posts, and news items.

### Structure

\`\`\`
.card--content (extends .card)
├── .card--content__image-wrapper
│   ├── .card--content__image
│   └── .card--content__category (badge)
├── .card__body
│   ├── .card--content__meta (date, author)
│   ├── .card__title
│   └── .card--content__excerpt
└── .card__footer
    └── .card--content__link (CTA)
\`\`\`

### Layout Variants
- **Default** — Image on top, content below
- **Horizontal** — Image left, content right (40/60 split)
- **Full Image** — Image fills entire card with text overlay
- **Half Image** — Image fills top 50% of card
- **No Image** — Content only, no image

### Related
- [Card Variants](/docs/0-core-1-card-variants--docs) - Visual styling
- [Stats Card](/docs/0-core-6-stats--docs) - Metrics display
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'horizontal', 'full-image', 'half-image', 'no-image'],
      description: 'Layout variant',
      table: {
        type: { summary: 'default | horizontal | full-image | half-image | no-image' },
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Article title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Article Title' },
      },
    },
    excerpt: {
      control: { type: 'text' },
      description: 'Article excerpt/summary',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Brief description...' },
      },
    },
    category: {
      control: { type: 'text' },
      description: 'Category badge text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Technology' },
      },
    },
    showImage: {
      control: { type: 'boolean' },
      description: 'Show featured image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable hover zoom on image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'default',
    title: 'Article Title',
    excerpt: 'This is a brief excerpt or description of the article content.',
    category: 'Technology',
    showImage: true,
    interactive: true,
  },
  render: ({ variant, title, excerpt, category, showImage, interactive }) => {
    const classes = ['content-card', 'card'];
    if (variant !== 'default') classes.push(`content-card--${variant}`);
    if (interactive) classes.push('content-card--interactive');

    const imageSrc = 'https://picsum.photos/800/600';

    return `
      <article class="${classes.join(' ')}" style="max-width: 400px;">
        ${showImage && variant !== 'no-image' ? `
        <div class="content-card__image-wrapper">
          <img class="content-card__image" src="${imageSrc}" alt="Featured image" />
          ${category ? `<span class="content-card__category">${category}</span>` : ''}
        </div>
        ` : ''}

        <div class="card__body">
          ${variant !== 'full-image' && variant !== 'half-image' ? `
          <div class="content-card__meta">
            <span class="content-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Mar 22, 2026
            </span>
            <span class="content-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              John Doe
            </span>
          </div>
          ` : ''}

          <h3 class="card__title">${title}</h3>
          <p class="content-card__excerpt">${excerpt}</p>
        </div>

        <div class="card__footer">
          <a href="#" class="content-card__link">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  },
};

export default meta;

type Story = {
  args: {
    variant: string;
    title: string;
    excerpt: string;
    category: string;
    showImage: boolean;
    interactive: boolean;
  };
};

/**
 * Article Card — Default layout with image
 *
 * Standard content card with featured image, category, meta, and excerpt
 */
export const Article: Story = {
  args: {
    variant: 'default',
    title: 'Building a Design System from Scratch',
    excerpt: 'Learn how to create a comprehensive design system that scales with your product and team.',
    category: 'Design',
    showImage: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Article** is the default layout with image on top, followed by category badge, meta information, title, excerpt, and CTA link.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          slots: {
            image: '<img class="content-card__image" src="..." alt="Featured" />',
            category: '<span class="content-card__category">Design</span>',
            body: `
  <div class="content-card__meta">
    <span class="content-card__meta-item">Mar 22, 2026</span>
    <span class="content-card__meta-item">John Doe</span>
  </div>
  <h3 class="card__title">Building a Design System</h3>
  <p class="content-card__excerpt">Learn how to create...</p>
            `,
            footer: '<a href="#" class="content-card__link">Read more</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Blog Card — With author and date
 *
 * Similar to article but emphasizes author and publish date
 */
export const Blog: Story = {
  args: {
    variant: 'default',
    title: '10 Tips for Better CSS Architecture',
    excerpt: 'Discover proven patterns for writing maintainable and scalable CSS in large projects.',
    category: 'Development',
    showImage: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Blog** variant emphasizes author and publish date in the meta section. Perfect for blog listings.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          slots: {
            image: '<img class="content-card__image" src="..." alt="Featured" />',
            category: '<span class="content-card__category">Development</span>',
            body: `
  <div class="content-card__meta">
    <span class="content-card__meta-item">
      <svg>calendar</svg> Mar 22, 2026
    </span>
    <span class="content-card__meta-item">
      <svg>user</svg> Jane Smith
    </span>
  </div>
  <h3 class="card__title">10 Tips for Better CSS</h3>
  <p class="content-card__excerpt">Discover proven patterns...</p>
            `,
            footer: '<a href="#" class="content-card__link">Read more</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Horizontal Layout — Image left, content right
 *
 * Side-by-side layout with 40/60 split
 */
export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging trends and technologies shaping the future of web development.',
    category: 'Technology',
    showImage: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Horizontal** layout places image on the left (40%) and content on the right (60%). Great for featured articles or hero sections.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          modifiers: ['horizontal'],
          slots: {
            image: '<img class="content-card__image" src="..." alt="Featured" />',
            category: '<span class="content-card__category">Technology</span>',
            body: `
  <h3 class="card__title">The Future of Web Development</h3>
  <p class="content-card__excerpt">Exploring emerging trends...</p>
  <a href="#" class="content-card__link">Read more</a>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Full Image — Image fills entire card with overlay
 *
 * Dramatic full-bleed image with text overlay
 */
export const FullImage: Story = {
  render: () => `
    <article class="content-card content-card--full-image content-card--interactive" style="max-width: 600px; min-height: 400px;">
      <div class="content-card__image-wrapper">
        <img class="content-card__image" src="https://picsum.photos/800/600" alt="Featured image" />
      </div>
      <div class="card__body">
        <span class="content-card__category" style="background: rgba(212, 175, 55, 0.9); color: #000;">Featured</span>
        <h3 class="card__title" style="color: #fff; font-size: 2rem;">Making a Statement with Full-Bleed Images</h3>
        <p class="content-card__excerpt" style="color: rgba(255,255,255,0.9);">Create dramatic visual impact with full-width images and text overlays.</p>
        <a href="#" class="content-card__link">Read more</a>
      </div>
    </article>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Full Image** variant fills the entire card with an image and overlays text on top. Best for hero articles or featured content. Requires min-height on the card.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          modifiers: ['full-image'],
          slots: {
            image: '<img class="content-card__image" src="..." alt="Featured" />',
            body: `
  <span class="content-card__category">Featured</span>
  <h3 class="card__title">Making a Statement</h3>
  <p class="content-card__excerpt">Create dramatic visual impact...</p>
  <a href="#" class="content-card__link">Read more</a>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Half Image — Image fills top 50%
 *
 * Balanced split between image and content
 */
export const HalfImage: Story = {
  render: () => `
    <article class="content-card content-card--half-image content-card--interactive" style="max-width: 400px; min-height: 300px;">
      <div class="content-card__image-wrapper">
        <img class="content-card__image" src="https://picsum.photos/800/600" alt="Featured image" />
      </div>
      <div class="card__body">
        <h3 class="card__title">Balanced Design with Half-Image Layout</h3>
        <p class="content-card__excerpt">A perfect balance between visual and textual content.</p>
        <a href="#" class="content-card__link">Read more</a>
      </div>
    </article>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Half Image** variant splits the card 50/50 between image and content. Clean and balanced layout for visual storytelling.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          modifiers: ['half-image'],
          slots: {
            image: '<img class="content-card__image" src="..." alt="Featured" />',
            body: `
  <h3 class="card__title">Balanced Design</h3>
  <p class="content-card__excerpt">A perfect balance...</p>
  <a href="#" class="content-card__link">Read more</a>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * No Image — Content only
 *
 * Text-only card without featured image
 */
export const NoImage: Story = {
  args: {
    variant: 'no-image',
    title: 'Quick Update: New Features Released',
    excerpt: 'We have released several new features this week. Here is what you need to know about the latest improvements.',
    category: 'News',
    showImage: false,
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**No Image** variant removes the image entirely, focusing on text content. Perfect for quick updates, announcements, or text-heavy content.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          modifiers: ['no-image'],
          slots: {
            category: '<span class="content-card__category">News</span>',
            body: `
  <div class="content-card__meta">
    <span>Mar 22, 2026</span>
    <span>Admin</span>
  </div>
  <h3 class="card__title">Quick Update: New Features</h3>
  <p class="content-card__excerpt">We have released several new features...</p>
            `,
            footer: '<a href="#" class="content-card__link">Read more</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Lazy Loading — Image with shimmer placeholder
 *
 * Shows loading state with shimmer animation
 */
export const LazyLoading: Story = {
  render: () => `
    <article class="content-card card" style="max-width: 400px;">
      <div class="content-card__image-wrapper">
        <img class="content-card__image lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Loading..." />
        <span class="content-card__category">Loading</span>
      </div>
      <div class="card__body">
        <div class="content-card__meta">
          <span class="content-card__meta-item">Loading...</span>
        </div>
        <h3 class="card__title">Loading Title...</h3>
        <p class="content-card__excerpt">Content is being loaded. Please wait.</p>
      </div>
      <div class="card__footer">
        <a href="#" class="content-card__link">Read more</a>
      </div>
    </article>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Lazy Loading** shows a shimmer animation placeholder while the image loads. Add `.lazy` class for placeholder state and `.loaded` when image is ready.',
      },
      source: {
        code: generateCardCode({
          blockName: 'content-card',
          slots: {
            image: '<img class="content-card__image lazy" src="placeholder.gif" alt="Loading..." />',
            category: '<span class="content-card__category">Category</span>',
            body: `
  <h3 class="card__title">Loading Title...</h3>
  <p class="content-card__excerpt">Content is being loaded...</p>
            `,
            footer: '<a href="#" class="content-card__link">Read more</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * All Layout Variants — Side-by-side comparison
 */
export const AllVariants: Story = {
  render: () => `
    <div style="display: grid; gap: 2rem;">
      <!-- Default -->
      <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <article class="content-card card content-card--interactive">
          <div class="content-card__image-wrapper">
            <img class="content-card__image" src="https://picsum.photos/400/300?1" alt="Featured" />
            <span class="content-card__category">Default</span>
          </div>
          <div class="card__body">
            <h3 class="card__title">Default Layout</h3>
            <p class="content-card__excerpt">Image on top, content below.</p>
          </div>
          <div class="card__footer">
            <a href="#" class="content-card__link">Read more</a>
          </div>
        </article>

        <!-- No Image -->
        <article class="content-card card content-card--no-image">
          <div class="card__body">
            <span class="content-card__category">No Image</span>
            <h3 class="card__title">Text Only</h3>
            <p class="content-card__excerpt">Content without featured image.</p>
          </div>
          <div class="card__footer">
            <a href="#" class="content-card__link">Read more</a>
          </div>
        </article>
      </div>

      <!-- Horizontal -->
      <article class="content-card content-card--horizontal content-card--interactive" style="max-width: 800px;">
        <img class="content-card__image" src="https://picsum.photos/400/300?2" alt="Featured" style="border-radius: var(--radius-lg) 0 0 var(--radius-lg);" />
        <div class="card__body" style="padding: 2rem;">
          <h3 class="card__title">Horizontal Layout</h3>
          <p class="content-card__excerpt">Image left (40%), content right (60%).</p>
          <a href="#" class="content-card__link">Read more</a>
        </div>
      </article>

      <!-- Full Image -->
      <article class="content-card content-card--full-image" style="max-width: 800px; min-height: 300px;">
        <div class="content-card__image-wrapper">
          <img class="content-card__image" src="https://picsum.photos/800/400?3" alt="Featured" />
        </div>
        <div class="card__body">
          <h3 class="card__title" style="color: #fff;">Full Image</h3>
          <p class="content-card__excerpt" style="color: rgba(255,255,255,0.9);">Image fills entire card with overlay.</p>
          <a href="#" class="content-card__link">Read more</a>
        </div>
      </article>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All layout variants displayed together for comparison. Choose based on your content hierarchy and design needs.',
      },
    },
  },
};
