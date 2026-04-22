import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Action Card — Forms and CTAs
 *
 * Optimized for user input: search, contact forms, subscriptions, and custom actions.
 *
 * ## Usage
 *
 * ```html
 * <div class="action-card card">
 *   <div class="action-card__body">
 *     <div class="action-card__group">
 *       <label class="action-card__label">Email</label>
 *       <input class="action-card__input" type="email" placeholder="Enter email" />
 *     </div>
 *     <div class="action-card__actions">
 *       <button class="action-card__button action-card__button--primary">Submit</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ## CSS Default
 * Uses outlined variant by default (border-based separation)
 */

const meta = {
  title: '0-Core/05. Action Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Action Card** is designed for forms, CTAs, and user input scenarios.

### Structure

\`\`\`
.action-card (extends .card)
├── .action-card__body
│   ├── .action-card__group (form field wrapper)
│   │   ├── .action-card__label
│   │   └── .action-card__input / .action-card__textarea
│   └── .action-card__actions (button container)
│       └── .action-card__button (.button--primary / .button--secondary)
└── .action-card__success / .action-card__error (validation states)
\`\`\`

### Features
- Full-width inputs
- Primary/secondary button styles
- Success and error states
- Helper text support
- Disabled states

### Related
- [Card Variants](/docs/0-core-1-card-variants--docs) - Visual styling
- [Stats Card](/docs/0-core-6-stats--docs) - Metrics display
        `,
      },
    },
  },
  argTypes: {
    actionType: {
      control: { type: 'select' },
      options: ['search', 'contact', 'subscribe', 'custom'],
      description: 'Type of action/form',
      table: {
        type: { summary: 'search | contact | subscribe | custom' },
        defaultValue: { summary: 'search' },
      },
    },
    buttonVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Button style variant',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'success', 'error'],
      description: 'Form validation state',
      table: {
        type: { summary: 'default | success | error' },
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Input placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Enter value...' },
      },
    },
    buttonText: {
      control: { type: 'text' },
      description: 'Button text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Submit' },
      },
    },
  },
  args: {
    actionType: 'search',
    buttonVariant: 'primary',
    state: 'default',
    placeholder: 'Enter value...',
    buttonText: 'Submit',
  },
  render: ({ actionType, buttonVariant, state, placeholder, buttonText }) => {
    const classes = ['action-card', 'card'];

    return `
      <div class="${classes.join(' ')}" style="max-width: 500px;">
        <div class="action-card__body">
          ${actionType === 'search' ? `
          <div class="action-card__group">
            <label class="action-card__label">Search</label>
            <input class="action-card__input" type="search" placeholder="${placeholder}" />
          </div>
          ` : ''}

          ${actionType === 'subscribe' ? `
          <div class="action-card__group">
            <label class="action-card__label">Email Address</label>
            <input class="action-card__input" type="email" placeholder="${placeholder}" />
            <p class="action-card__helper">We'll never share your email.</p>
          </div>
          ` : ''}

          ${actionType === 'contact' ? `
          <div class="action-card__group">
            <label class="action-card__label">Name</label>
            <input class="action-card__input" type="text" placeholder="Your name" />
          </div>
          <div class="action-card__group">
            <label class="action-card__label">Email</label>
            <input class="action-card__input" type="email" placeholder="your@email.com" />
          </div>
          <div class="action-card__group">
            <label class="action-card__label">Message</label>
            <textarea class="action-card__textarea" placeholder="${placeholder}" rows="4"></textarea>
          </div>
          ` : ''}

          ${actionType === 'custom' ? `
          <div class="action-card__group">
            <label class="action-card__label">Custom Field</label>
            <input class="action-card__input" type="text" placeholder="${placeholder}" />
          </div>
          ` : ''}

          <div class="action-card__actions">
            <button class="action-card__button action-card__button--${buttonVariant}">
              ${buttonText}
            </button>
            ${buttonVariant === 'secondary' ? `
            <button class="action-card__button action-card__button--secondary">
              Cancel
            </button>
            ` : ''}
          </div>

          ${state === 'success' ? `
          <div class="action-card__success" style="margin-top: 1rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Successfully submitted!</span>
          </div>
          ` : ''}

          ${state === 'error' ? `
          <div class="action-card__error" style="margin-top: 1rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Something went wrong. Please try again.</span>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    actionType: string;
    buttonVariant: string;
    state: string;
    placeholder: string;
    buttonText: string;
  };
};

/**
 * Search Form — Simple search input
 *
 * Minimal search form with single input and button
 */
export const Search: Story = {
  args: {
    actionType: 'search',
    buttonVariant: 'primary',
    state: 'default',
    placeholder: 'Search...',
    buttonText: 'Search',
  },
  parameters: {
    docs: {
      description: {
        story: '**Search** form with single input field. Perfect for search bars, quick filters, or lookup forms.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Search</label>
    <input class="action-card__input" type="search" placeholder="Search..." />
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Search</button>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Contact Form — Multi-field form
 *
 * Full contact form with name, email, and message fields
 */
export const Contact: Story = {
  args: {
    actionType: 'contact',
    buttonVariant: 'primary',
    state: 'default',
    placeholder: 'Your message...',
    buttonText: 'Send Message',
  },
  parameters: {
    docs: {
      description: {
        story: '**Contact** form with name, email, and message fields. Standard contact form layout.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Name</label>
    <input class="action-card__input" type="text" placeholder="Your name" />
  </div>
  <div class="action-card__group">
    <label class="action-card__label">Email</label>
    <input class="action-card__input" type="email" placeholder="your@email.com" />
  </div>
  <div class="action-card__group">
    <label class="action-card__label">Message</label>
    <textarea class="action-card__textarea" placeholder="Your message..." rows="4"></textarea>
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Send Message</button>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Subscribe — Email signup form
 *
 * Newsletter subscription with helper text
 */
export const Subscribe: Story = {
  args: {
    actionType: 'subscribe',
    buttonVariant: 'primary',
    state: 'default',
    placeholder: 'your@email.com',
    buttonText: 'Subscribe',
  },
  parameters: {
    docs: {
      description: {
        story: '**Subscribe** form for email signup. Includes helper text for privacy reassurance.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Email Address</label>
    <input class="action-card__input" type="email" placeholder="your@email.com" />
    <p class="action-card__helper">We'll never share your email.</p>
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Subscribe</button>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Success State — Form submission success
 *
 * Shows success message after form submission
 */
export const SuccessState: Story = {
  args: {
    actionType: 'subscribe',
    buttonVariant: 'primary',
    state: 'success',
    placeholder: 'your@email.com',
    buttonText: 'Subscribe',
  },
  parameters: {
    docs: {
      description: {
        story: '**Success State** displays a green success message with checkmark icon after successful form submission.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Email</label>
    <input class="action-card__input" type="email" value="user@example.com" />
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Subscribe</button>
  </div>
  <div class="action-card__success">
    <svg>checkmark</svg>
    <span>Successfully subscribed!</span>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Error State — Form validation error
 *
 * Shows error message when submission fails
 */
export const ErrorState: Story = {
  args: {
    actionType: 'contact',
    buttonVariant: 'primary',
    state: 'error',
    placeholder: 'Your message...',
    buttonText: 'Send Message',
  },
  parameters: {
    docs: {
      description: {
        story: '**Error State** displays a red error message with alert icon when form submission fails.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Email</label>
    <input class="action-card__input" type="email" placeholder="your@email.com" />
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Send</button>
  </div>
  <div class="action-card__error">
    <svg>alert</svg>
    <span>Something went wrong. Please try again.</span>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Secondary Button — Alternative button style
 *
 * Shows secondary (outlined) button variant
 */
export const SecondaryButton: Story = {
  args: {
    actionType: 'custom',
    buttonVariant: 'secondary',
    state: 'default',
    placeholder: 'Enter value...',
    buttonText: 'Confirm',
  },
  parameters: {
    docs: {
      description: {
        story: '**Secondary Button** uses outlined style for less prominent actions. Often paired with primary button for cancel/confirm patterns.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Custom Field</label>
    <input class="action-card__input" type="text" placeholder="Enter value..." />
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary">Confirm</button>
    <button class="action-card__button action-card__button--secondary">Cancel</button>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Helper Text — Input guidance
 *
 * Shows helper text below input field
 */
export const HelperText: Story = {
  render: () => `
    <div class="action-card card" style="max-width: 500px;">
      <div class="action-card__body">
        <div class="action-card__group">
          <label class="action-card__label">Password</label>
          <input class="action-card__input" type="password" placeholder="Create password" />
          <p class="action-card__helper">Must be at least 8 characters with one number.</p>
        </div>
        <div class="action-card__group">
          <label class="action-card__label">Username</label>
          <input class="action-card__input" type="text" placeholder="Choose username" />
          <p class="action-card__helper action-card__helper--error">Username is already taken.</p>
        </div>
        <div class="action-card__actions">
          <button class="action-card__button action-card__button--primary">Create Account</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Helper Text** provides guidance below input fields. Use `.action-card__helper` for normal text and `.action-card__helper--error` for error messages.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Password</label>
    <input class="action-card__input" type="password" />
    <p class="action-card__helper">Must be at least 8 characters.</p>
  </div>
  <div class="action-card__group">
    <label class="action-card__label">Username</label>
    <input class="action-card__input" type="text" />
    <p class="action-card__helper action-card__helper--error">Username taken.</p>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Disabled State — Non-interactive form
 *
 * Shows disabled input and button states
 */
export const DisabledState: Story = {
  render: () => `
    <div class="action-card card" style="max-width: 500px;">
      <div class="action-card__body">
        <div class="action-card__group">
          <label class="action-card__label">Email</label>
          <input class="action-card__input" type="email" placeholder="Disabled input" disabled />
        </div>
        <div class="action-card__actions">
          <button class="action-card__button action-card__button--primary" disabled>Submitting...</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Disabled State** shows inputs and buttons in non-interactive state. Use during form submission or when fields are unavailable.',
      },
      source: {
        code: generateCardCode({
          blockName: 'action-card',
          slots: {
            body: `
  <div class="action-card__group">
    <label class="action-card__label">Email</label>
    <input class="action-card__input" type="email" disabled />
  </div>
  <div class="action-card__actions">
    <button class="action-card__button action-card__button--primary" disabled>Submitting...</button>
  </div>
            `,
          },
        }),
        language: 'html',
      },
    },
  },
};
