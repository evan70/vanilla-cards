import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Client Card — Testimonial showcase
 *
 * **Social proof** — Logo + testimonial + rating
 *
 * Client card for testimonials and client logos.
 *
 * ## Usage
 *
 * ```html
 * <div class="card client-card">
 *   <div class="client-card__logo-wrapper">
 *     <img class="client-card__logo" src="logo.png" alt="Client" />
 *   </div>
 *   <blockquote class="client-card__quote">
 *     "Excellent work! The team delivered beyond our expectations."
 *   </blockquote>
 *   <div class="client-card__rating">
 *     <svg class="client-card__star">★</svg>
 *     <svg class="client-card__star">★</svg>
 *     <svg class="client-card__star">★</svg>
 *     <svg class="client-card__star">★</svg>
 *     <svg class="client-card__star">★</svg>
 *   </div>
 *   <div class="client-card__author">
 *     <img class="client-card__avatar" src="avatar.jpg" alt="Author" />
 *     <div>
 *       <p class="client-card__name">John Doe</p>
 *       <p class="client-card__role">CEO, Company</p>
 *     </div>
 *   </div>
 * </div>
 * ```
 */

const meta = {
  title: '0-Core/13. Client Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Client Card** displays testimonials and client logos.

### Structure

\`\`\`
.card.card--client
├── .card--client__logo-wrapper
│   └── .card--client__logo
├── .card--client__quote
├── .card--client__rating
│   └── .card--client__star
└── .card--client__author
    ├── .card--client__avatar
    ├── .card--client__name
    └── .card--client__role
\`\`\`

### Features
- Client logo display
- Quote with decorative styling
- Star rating system
- Author avatar and details
- Compact variant available

### Modifiers
- \`--compact\`: Logo + name only
- \`--featured\`: Gold border highlight

### Related
- [Case Study Card](/docs/0-core-14-case-study--docs) - Results showcase
        `,
      },
    },
  },
  argTypes: {
    showLogo: {
      control: { type: 'boolean' },
      description: 'Show client logo',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showQuote: {
      control: { type: 'boolean' },
      description: 'Show testimonial quote',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showRating: {
      control: { type: 'boolean' },
      description: 'Show star rating',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showAuthor: {
      control: { type: 'boolean' },
      description: 'Show author details',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    rating: {
      control: { type: 'select' },
      options: ['3', '4', '5'],
      description: 'Star rating value',
      table: {
        type: { summary: '3 | 4 | 5' },
        defaultValue: { summary: '5' },
      },
    },
  },
  args: {
    showLogo: true,
    showQuote: true,
    showRating: true,
    showAuthor: true,
    rating: '5',
  },
  render: ({ showLogo, showQuote, showRating, showAuthor, rating }) => {
    return `
      <div class="card client-card" style="max-width: 400px;">
        ${showLogo ? `
        <div class="client-card__logo-wrapper">
          <img class="client-card__logo" src="https://picsum.photos/150/80?grayscale" alt="Client logo" />
        </div>
        ` : ''}
        
        ${showQuote ? `
        <blockquote class="client-card__quote">
          "Working with this team was an absolute pleasure. They delivered a stunning website that exceeded our expectations and helped increase our conversions by 40%."
        </blockquote>
        ` : ''}
        
        ${showRating ? `
        <div class="client-card__rating">
          ${[1, 2, 3, 4, 5].map(i => `
          <svg class="client-card__star ${i > parseInt(rating) ? 'client-card__star--empty' : ''}" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.09-1.01L12 2z"></path>
          </svg>
          `).join('')}
        </div>
        ` : ''}
        
        ${showAuthor ? `
        <div class="client-card__author">
          <img class="client-card__avatar" src="https://picsum.photos/60/60" alt="Author avatar" />
          <div>
            <p class="client-card__name">Sarah Johnson</p>
            <p class="client-card__role">CEO, TechCorp</p>
          </div>
        </div>
        ` : ''}
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    showLogo: boolean;
    showQuote: boolean;
    showRating: boolean;
    showAuthor: boolean;
    rating: '3' | '4' | '5';
  };
};

/**
 * Full Testimonial — All elements
 *
 * Complete client testimonial card
 */
export const FullTestimonial: Story = {
  args: {
    showLogo: true,
    showQuote: true,
    showRating: true,
    showAuthor: true,
    rating: '5',
  },
  parameters: {
    docs: {
      description: {
        story: '**Full Testimonial** with logo, quote, rating, and author. Complete social proof element.',
      },
      source: {
        code: generateCardCode({
          blockName: 'client-card',
          slots: {
            'logo-wrapper': '<img class="client-card__logo" src="logo.png" alt="Client" />',
            quote: '"Excellent work!"',
            rating: `
  <svg class="client-card__star">★</svg>
  <svg class="client-card__star">★</svg>
  <svg class="client-card__star">★</svg>
  <svg class="client-card__star">★</svg>
  <svg class="client-card__star">★</svg>
            `.trim(),
            author: `
  <img class="client-card__avatar" src="avatar.jpg" alt="Author" />
  <p class="client-card__name">Name</p>
  <p class="client-card__role">Role</p>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Logo Only — Minimal
 *
 * Client card with just logo
 */
export const LogoOnly: Story = {
  args: {
    showLogo: true,
    showQuote: false,
    showRating: false,
    showAuthor: false,
    rating: '5',
  },
  parameters: {
    docs: {
      description: {
        story: '**Logo Only** for client showcases and partner sections. Clean, minimal presentation.',
      },
    },
  },
};

/**
 * 4 Star Rating — Good rating
 *
 * Client card with 4-star rating
 */
export const FourStarRating: Story = {
  args: {
    showLogo: false,
    showQuote: true,
    showRating: true,
    showAuthor: true,
    rating: '4',
  },
  parameters: {
    docs: {
      description: {
        story: '**4 Star Rating** shows one empty star. Useful for varied testimonial ratings.',
      },
    },
  },
};

/**
 * Compact — No quote
 *
 * Compact client card without quote
 */
export const Compact: Story = {
  args: {
    showLogo: true,
    showQuote: false,
    showRating: true,
    showAuthor: true,
    rating: '5',
  },
  parameters: {
    docs: {
      description: {
        story: '**Compact** variant without quote. Use \`--compact\` modifier for smaller layout.',
      },
    },
  },
};
