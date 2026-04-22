import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Card Variants — Visual styling variants
 *
 * **Philosophy:** Three distinct visual styles for different use cases
 *
 * - **Elevated** — Shadow-based separation, default for most cards
 * - **Filled** — Background-based separation, subtle appearance
 * - **Outlined** — Border-based separation, minimal style
 *
 * ## Usage
 *
 * ```html
 * <!-- Elevated (default) -->
 * <div class="card card--elevated">...</div>
 *
 * <!-- Filled -->
 * <div class="card card--filled">...</div>
 *
 * <!-- Outlined -->
 * <div class="card card--outlined">...</div>
 * ```
 */

const meta = {
  title: '0-Core/01. Card Variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Card Variants** provide three distinct visual styles for different use cases.

### Variants

| Variant | Use Case | Visual Style |
|---------|----------|--------------|
| Elevated | Default, standalone cards | Shadow, depth |
| Filled | Grouped cards, subtle | Background color |
| Outlined | Minimal, bordered | Border only |

### Related
- [Card Abstract](/docs/0-core-0-abstract-card--docs) - Base structure
- [Header Card](/docs/0-core-2-header--docs) - Example usage
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'filled', 'outlined'],
      description: 'Visual variant of the card',
      table: {
        type: { summary: 'elevated | filled | outlined' },
        defaultValue: { summary: 'elevated' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Card title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card Title' },
      },
    },
    content: {
      control: { type: 'text' },
      description: 'Card body content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card content goes here...' },
      },
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Enable clickable/hover state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'elevated',
    title: 'Card Title',
    content: 'This is the card body content. It can contain any text or HTML elements.',
    interactive: false,
  },
  render: ({ variant, title, content, interactive }) => {
    const classes = ['card', `card--${variant}`];
    if (interactive) classes.push('card--clickable');

    return `
      <div class="${classes.join(' ')}">
        <div class="card__header">
          <h3 class="card__title">${title}</h3>
        </div>
        <div class="card__body">
          <p>${content}</p>
        </div>
        <div class="card__footer">
          <button class="btn btn--primary">Primary Action</button>
          <button class="btn btn--secondary">Secondary</button>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    variant: string;
    title: string;
    content: string;
    interactive: boolean;
  };
};

/**
 * Elevated Card — Default variant with shadow
 *
 * Best for: Standalone cards, cards that need visual separation from background
 */
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    content: 'This card uses shadow for visual separation. It appears to float above the background.',
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Elevated** is the default variant with shadow-based separation. Best for standalone cards that need to stand out from the background.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['elevated'],
          slots: {
            header: '<h3 class="card__title">Elevated Card</h3>',
            body: '<p>Shadow-based visual separation.</p>',
            footer: `
  <button class="btn btn--primary">Primary Action</button>
  <button class="btn btn--secondary">Secondary</button>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Filled Card — Subtle background-based separation
 *
 * Best for: Grouped cards, grid layouts, subtle appearance
 */
export const Filled: Story = {
  args: {
    variant: 'filled',
    title: 'Filled Card',
    content: 'This card uses background color for separation. More subtle than elevated.',
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Filled** uses background color instead of shadow. Best for grid layouts or when you want a more subtle appearance.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['filled'],
          slots: {
            header: '<h3 class="card__title">Filled Card</h3>',
            body: '<p>Background-based visual separation.</p>',
            footer: `
  <button class="btn btn--primary">Primary Action</button>
  <button class="btn btn--secondary">Secondary</button>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Outlined Card — Minimal border-based style
 *
 * Best for: Minimal designs, bordered cards, high contrast needs
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    content: 'This card uses only a border for separation. Minimal and clean appearance.',
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Outlined** uses only a border for separation. Best for minimal designs or when you need high contrast without visual weight.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['outlined'],
          slots: {
            header: '<h3 class="card__title">Outlined Card</h3>',
            body: '<p>Border-based visual separation.</p>',
            footer: `
  <button class="btn btn--primary">Primary Action</button>
  <button class="btn btn--secondary">Secondary</button>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Interactive Card — Clickable with hover effects
 *
 * Shows hover state for clickable cards
 */
export const Interactive: Story = {
  args: {
    variant: 'elevated',
    title: 'Interactive Card',
    content: 'This card has hover effects. Move your mouse over it to see the animation.',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Interactive** cards respond to hover with elevation increase and subtle movement. Use for clickable cards that link to other content.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['elevated', 'clickable'],
          slots: {
            header: '<h3 class="card__title">Interactive Card</h3>',
            body: '<p>Hover to see the effect.</p>',
            footer: `
  <button class="btn btn--primary">Click me</button>
  <button class="btn btn--secondary">Cancel</button>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Disabled State — Non-interactive appearance
 */
export const Disabled: Story = {
  render: () => `
    <div class="card card--elevated card--disabled">
      <div class="card__header">
        <h3 class="card__title">Disabled Card</h3>
      </div>
      <div class="card__body">
        <p>This card is disabled and cannot be interacted with.</p>
      </div>
      <div class="card__footer">
        <button class="btn btn--primary" disabled>Disabled Action</button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Disabled** state reduces opacity and removes pointer events. Use for unavailable actions or content.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['elevated', 'disabled'],
          slots: {
            header: '<h3 class="card__title">Disabled Card</h3>',
            body: '<p>Reduced opacity, no interactions.</p>',
            footer: '<button class="btn btn--primary" disabled>Disabled</button>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Loading State — Shimmer animation
 */
export const Loading: Story = {
  render: () => `
    <div class="card card--elevated card--loading">
      <div class="card__header">
        <h3 class="card__title">Loading Card</h3>
      </div>
      <div class="card__body">
        <p>Content is loading...</p>
      </div>
      <div class="card__footer">
        <button class="btn btn--primary btn--loading">Loading...</button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Loading** state shows a shimmer animation while content is being fetched. Provides visual feedback during async operations.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card',
          modifiers: ['elevated', 'loading'],
          slots: {
            header: '<h3 class="card__title">Loading Card</h3>',
            body: '<p>Shimmer animation indicates loading.</p>',
            footer: '<button class="btn btn--primary btn--loading">Loading...</button>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * All Variants Side-by-Side — Comparison
 */
export const AllVariants: Story = {
  render: () => `
    <div style="display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <div class="card card--elevated">
        <div class="card__header">
          <h3 class="card__title">Elevated</h3>
        </div>
        <div class="card__body">
          <p>Shadow-based separation. Default for most cards.</p>
        </div>
        <div class="card__footer">
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--secondary">Secondary</button>
        </div>
      </div>

      <div class="card card--filled">
        <div class="card__header">
          <h3 class="card__title">Filled</h3>
        </div>
        <div class="card__body">
          <p>Background-based separation. Subtle appearance.</p>
        </div>
        <div class="card__footer">
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--secondary">Secondary</button>
        </div>
      </div>

      <div class="card card--outlined">
        <div class="card__header">
          <h3 class="card__title">Outlined</h3>
        </div>
        <div class="card__body">
          <p>Border-based separation. Minimal style.</p>
        </div>
        <div class="card__footer">
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--secondary">Secondary</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All three variants displayed side-by-side for comparison. This helps choose the right variant for your use case.',
      },
    },
  },
};
