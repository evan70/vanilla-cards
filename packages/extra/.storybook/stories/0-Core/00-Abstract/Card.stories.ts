import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Card Abstract - Base structure for all cards
 * 
 * **Philosophy:** "Structure is shared, style is yours"
 * 
 * The abstract card defines the base BEM structure and layout without any visual styling
 * (no colors, borders, or shadows). All other cards extend this structure.
 * 
 * ## Usage
 * 
 * ```html
 * <div class="card">
 *   <div class="card__header">
 *     <h3 class="card__title">Title</h3>
 *     <p class="card__subtitle">Subtitle</p>
 *   </div>
 *   <div class="card__body">
 *     <p>Main content...</p>
 *   </div>
 *   <div class="card__footer">
 *     <button>Action</button>
 *   </div>
 * </div>
 * ```
 * 
 * ## Extending
 * 
 * ```css
 * .my-custom-card.card {
 *   // Your styles here
 * }
 * 
 * .my-custom-card .card__header {
 *   // Header styles
 * }
 * ```
 */

const meta = {
  title: '0-Core/00. Abstract/Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Card Abstract** defines the base BEM structure and layout for all card types.

### Key Features
- ✅ Flexbox layout
- ✅ BEM semantics
- ✅ No visual styling (colors, borders, shadows)
- ✅ Responsive by default
- ✅ Accessible structure

### When to Use
Use this as the base for creating custom card components. Extend with your own styles.

### Related
- [Card Variants](/docs/0-core-1-variants--docs) - Visual variants (elevated, filled, outlined)
- [Header Card](/docs/0-core-2-header--docs) - Header component example
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Card title text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card Title' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Card subtitle text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Main body content (HTML allowed)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '<p>Content...</p>' },
      },
    },
    footerContent: {
      control: { type: 'text' },
      description: 'Footer content (HTML allowed)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    hasImage: {
      control: { type: 'boolean' },
      description: 'Include card image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Add interactive modifier (cursor pointer)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    title: 'Card Title',
    subtitle: '',
    bodyContent: '<p>This is the main content area of the card. It can contain any HTML content.</p>',
    footerContent: '',
    hasImage: false,
    interactive: false,
  },
  render: ({ title, subtitle, bodyContent, footerContent, hasImage, interactive }) => {
    const classes = ['card'];
    if (interactive) classes.push('card--interactive');
    
    return `
      <div class="${classes.join(' ')}">
        ${hasImage ? `
        <img class="card__image" src="https://picsum.photos/400/200" alt="Card image" />
        ` : ''}
        
        <div class="card__header">
          <h3 class="card__title">${title}</h3>
          ${subtitle ? `<p class="card__subtitle">${subtitle}</p>` : ''}
        </div>
        
        <div class="card__body">
          ${bodyContent}
        </div>
        
        ${footerContent ? `
        <div class="card__footer">
          ${footerContent}
        </div>
        ` : ''}
      </div>
    `;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic card with title and body
 */
export const Basic: Story = {
  args: {
    title: 'Basic Card',
    bodyContent: '<p>Simple card with just title and body content.</p>',
  },
  parameters: {
    docs: {
      description: {
        story: 'The most basic card structure - just title and body.',
      },
    },
  },
};

/**
 * Card with all sections
 */
export const WithAllSections: Story = {
  args: {
    title: 'Complete Card',
    subtitle: 'With header, body, and footer',
    bodyContent: '<p>This card demonstrates all available sections: header with title and subtitle, body with content, and footer with actions.</p>',
    footerContent: '<button style="padding: 0.5rem 1rem; background: #d4af37; border: none; border-radius: 4px; cursor: pointer;">Primary Action</button>',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full card structure with all sections populated.',
      },
    },
  },
};

/**
 * Card with image
 */
export const WithImage: Story = {
  args: {
    ...WithAllSections.args,
    hasImage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with an image at the top. Images use `card__image` class and are responsive by default.',
      },
    },
  },
};

/**
 * Interactive card
 */
export const Interactive: Story = {
  args: {
    ...WithAllSections.args,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with `card--interactive` modifier. Adds cursor pointer to indicate clickability.',
      },
    },
  },
};

/**
 * Card with multiple actions
 */
export const WithMultipleActions: Story = {
  args: {
    title: 'Card with Actions',
    bodyContent: '<p>This card has multiple action buttons in the footer.</p>',
    footerContent: `
      <div class="card__actions" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button style="padding: 0.5rem 1rem; background: #d4af37; border: none; border-radius: 4px; cursor: pointer;">Primary</button>
        <button style="padding: 0.5rem 1rem; border: 2px solid #ccc; background: transparent; border-radius: 4px; cursor: pointer;">Secondary</button>
        <button style="padding: 0.5rem 1rem; border: none; background: transparent; color: #666; cursor: pointer;">Cancel</button>
      </div>
    `,
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with multiple action buttons using `card__actions` container for proper spacing and wrapping.',
      },
    },
  },
};

/**
 * Compact card
 */
export const Compact: Story = {
  args: {
    title: 'Compact Card',
    bodyContent: '<p style="margin: 0;">Short content in a compact layout.</p>',
    footerContent: '<span style="font-size: 0.875rem; color: #666;">Footer note</span>',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact card with minimal spacing. Use `card__footer--compact` modifier for smaller footer.',
      },
    },
  },
};

// Code snippet examples
export const API: Story = {
  render: () => `
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
    <p class="card__subtitle">Subtitle</p>
  </div>
  <div class="card__body">
    <p>Content...</p>
  </div>
  <div class="card__footer">
    <button>Action</button>
  </div>
</div>
  `.trim(),
  parameters: {
    docs: {
      description: {
        story: 'Complete HTML structure for the abstract card.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          slots: {
            header: '<h3 class="card__title">Title</h3><p class="card__subtitle">Subtitle</p>',
            body: '<p>Content...</p>',
            footer: '<button>Action</button>',
          },
        }),
        language: 'html',
      },
    },
  },
};
