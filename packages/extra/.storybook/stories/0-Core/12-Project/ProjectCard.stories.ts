import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Project Card — Portfolio project showcase
 *
 * **Featured projects** — Image + description + tech stack
 *
 * Project card for portfolio and case study displays.
 *
 * ## Usage
 *
 * ```html
 * <div class="card project-card project-card--interactive">
 *   <div class="project-card__image-wrapper">
 *     <img class="project-card__image" src="project.jpg" alt="Project" />
 *     <span class="project-card__badge">Featured</span>
 *     <span class="project-card__category">Web Design</span>
 *   </div>
 *   <div class="project-card__body">
 *     <h3 class="project-card__title">Project Title</h3>
 *     <p class="project-card__description">Brief description...</p>
 *     <div class="project-card__tech">
 *       <span class="project-card__tech-item">React</span>
 *       <span class="project-card__tech-item">TypeScript</span>
 *     </div>
 *   </div>
 *   <div class="card__footer">
 *     <a href="#" class="project-card__link">View Project →</a>
 *   </div>
 * </div>
 * ```
 */

const meta = {
  title: '0-Core/12. Project Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Project Card** showcases portfolio projects.

### Structure

\`\`\`
.card.card--project
├── .card--project__image-wrapper
│   ├── .card--project__image
│   ├── .card--project__badge (optional)
│   └── .card--project__category (optional)
├── .card--project__body
│   ├── .card--project__title
│   ├── .card--project__description
│   └── .card--project__tech
│       └── .card--project__tech-item
└── .card__footer
    └── .card--project__link
\`\`\`

### Features
- Responsive image with hover zoom
- Badge and category labels
- Technology tags
- Interactive hover state
- Footer with CTA link

### Modifiers
- \`--interactive\`: Hover zoom effect
- \`--featured\`: Gold border highlight
- \`--horizontal\`: Side-by-side layout

### Related
- [Gallery Card](/docs/0-core-11-gallery--docs) - Image grid
- [Case Study Card](/docs/0-core-14-case-study--docs) - Results showcase
        `,
      },
    },
  },
  argTypes: {
    showImage: {
      control: { type: 'boolean' },
      description: 'Show project image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showBadge: {
      control: { type: 'boolean' },
      description: 'Show featured badge',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showCategory: {
      control: { type: 'boolean' },
      description: 'Show category label',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showTech: {
      control: { type: 'boolean' },
      description: 'Show technology tags',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable hover effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    showImage: true,
    showBadge: false,
    showCategory: true,
    showTech: true,
    interactive: true,
  },
  render: ({ showImage, showBadge, showCategory, showTech, interactive }) => {
    const classes = ['card', 'card--project'];
    if (interactive) classes.push('card--project--interactive');

    return `
      <div class="${classes.join(' ')}" style="max-width: 400px;">
        ${showImage ? `
        <div class="card--project__image-wrapper">
          <img class="card--project__image" src="https://picsum.photos/400/225" alt="Project image" />
          ${showBadge ? '<span class="card--project__badge">Featured</span>' : ''}
          ${showCategory ? '<span class="card--project__category">Web Design</span>' : ''}
        </div>
        ` : ''}
        
        <div class="card--project__body">
          <h3 class="card--project__title">E-Commerce Platform</h3>
          <p class="card--project__description">A modern e-commerce solution with real-time inventory management and seamless checkout experience.</p>
          ${showTech ? `
          <div class="card--project__tech">
            <span class="card--project__tech-item">React</span>
            <span class="card--project__tech-item">Node.js</span>
            <span class="card--project__tech-item">PostgreSQL</span>
          </div>
          ` : ''}
        </div>
        
        <div class="card__footer">
          <a href="#" class="card--project__link">
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    showImage: boolean;
    showBadge: boolean;
    showCategory: boolean;
    showTech: boolean;
    interactive: boolean;
  };
};

/**
 * Standard Project — Full featured
 *
 * Complete project card with all elements
 */
export const Standard: Story = {
  args: {
    showImage: true,
    showBadge: false,
    showCategory: true,
    showTech: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Standard** project card with image, category, tech stack, and CTA. Most common variant.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card--project',
          modifiers: ['interactive'],
          slots: {
            'image-wrapper': `
  <img class="card--project__image" src="project.jpg" alt="Project" />
  <span class="card--project__category">Category</span>
            `.trim(),
            body: `
  <h3 class="card--project__title">Title</h3>
  <p class="card--project__description">Description...</p>
  <div class="card--project__tech">
    <span class="card--project__tech-item">Tech</span>
  </div>
            `.trim(),
            footer: '<a href="#" class="card--project__link">View Project →</a>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Featured Project — With badge
 *
 * Project card with featured badge
 */
export const Featured: Story = {
  args: {
    showImage: true,
    showBadge: true,
    showCategory: true,
    showTech: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Featured** project with gold badge and border highlight. Use for showcasing priority projects.',
      },
    },
  },
};

/**
 * No Image — Text only
 *
 * Project card without image
 */
export const NoImage: Story = {
  args: {
    showImage: false,
    showBadge: false,
    showCategory: false,
    showTech: true,
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**No Image** variant focuses on text content. Useful for text-heavy project descriptions.',
      },
    },
  },
};

/**
 * Minimal — No tech tags
 *
 * Clean project card without tech stack
 */
export const Minimal: Story = {
  args: {
    showImage: true,
    showBadge: false,
    showCategory: true,
    showTech: false,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Minimal** removes tech tags for cleaner presentation. Focus on visual and description.',
      },
    },
  },
};
