import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Notification Card — Toast notifications
 *
 * **Glassmorphic design** — Bottom-right fixed position
 *
 * Notification cards for success, error, warning, and info messages.
 *
 * ## Usage
 *
 * ```html
 * <div class="notification-cards-container">
 *   <div class="notification-card notification-card--success">
 *     <div class="notification-card__content">
 *       <h4 class="notification-card__title">Success!</h4>
 *       <div class="notification-card__body">
 *         <svg class="notification-card__icon">...</svg>
 *         <p class="notification-card__message">Operation completed.</p>
 *       </div>
 *     </div>
 *     <button class="notification-card__close">×</button>
 *   </div>
 * </div>
 * ```
 *
 * ## Types
 * - `notification-card--success` - Green accent
 * - `notification-card--error` - Red accent
 * - `notification-card--warning` - Yellow accent
 * - `notification-card--info` - Blue accent
 * - `notification-card--cookie` - Purple accent
 */

const meta = {
  title: '0-Core/08. Notification Card',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Notification Card** displays toast notifications.

### Structure

\`\`\`
.card--notifications-container (fixed bottom-right)
└── .card--notification
    ├── .card--notification__content
    │   ├── .card--notification__title
    │   └── .card--notification__body
    │       ├── .card--notification__icon
    │       └── .card--notification__message
    ├── .card--notification__actions (optional)
    └── .card--notification__close
\`\`\`

### Features
- Glassmorphic design (theme-aware)
- Slide-in animation
- Multiple types (success, error, warning, info)
- Auto-dismiss support
- Action buttons support

### Types
- \`--success\` - Green accent (checkmark icon)
- \`--error\` - Red accent (X icon)
- \`--warning\` - Yellow accent (exclamation icon)
- \`--info\` - Blue accent (info icon)
- \`--cookie\` - Purple accent (cookie consent)

### Related
- [Cookie Consent](/docs/0-core-17-cookie-consent--docs) - Cookie consent banner
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info', 'cookie'],
      description: 'Notification type',
      table: {
        type: { summary: 'success | error | warning | info | cookie' },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Notification title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Notification' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Notification message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a notification message.' },
      },
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Show action buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    type: 'info',
    title: 'Notification',
    message: 'This is a notification message.',
    showActions: false,
  },
  render: ({ type, title, message, showActions }) => {
    const classes = ['notification-card', `notification-card--${type}`];

    const icons = {
      success: `<svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"></path></svg>`,
      error: `<svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6L6 18M6 6l12 12"></path></svg>`,
      warning: `<svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
      info: `<svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4m0-4h.01"></path></svg>`,
      cookie: `<svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M12 2v.01M2 12h.01"></path></svg>`,
    };

    return `
      <div style="position: relative; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
        <div class="notification-cards-container" style="position: absolute; bottom: 24px; right: 24px; left: auto; max-width: 420px;">
          <div class="${classes.join(' ')}">
            <div class="notification-card__content">
              <h4 class="notification-card__title">${title}</h4>
              <div class="notification-card__body">
                ${icons[type]}
                <p class="notification-card__message">${message}</p>
              </div>
              ${showActions ? `
              <div class="notification-card__actions">
                <button class="btn btn--primary">Accept</button>
                <button class="btn btn--secondary">Dismiss</button>
              </div>
              ` : ''}
            </div>
            <button class="notification-card__close" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    type: 'success' | 'error' | 'warning' | 'info' | 'cookie';
    title: string;
    message: string;
    showActions: boolean;
  };
};

/**
 * Success Notification — Green accent
 *
 * Shows a success notification with checkmark icon
 */
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Success** notifications use green accent and checkmark icon. Perfect for confirming completed actions.',
      },
      source: {
        code: generateCardCode({
          blockName: 'notification-card',
          modifiers: ['success'],
          slots: {
            content: `
  <h4 class="notification-card__title">Success!</h4>
  <div class="notification-card__body">
    <svg class="notification-card__icon">...</svg>
    <p class="notification-card__message">Your changes have been saved.</p>
  </div>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Error Notification — Red accent
 *
 * Shows an error notification with X icon
 */
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Error** notifications use red accent and X icon. Use for critical errors and validation failures.',
      },
    },
  },
};

/**
 * Warning Notification — Yellow accent
 *
 * Shows a warning notification with exclamation icon
 */
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Please review your input before continuing.',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Warning** notifications use yellow accent and exclamation icon. Use for cautions and important notices.',
      },
    },
  },
};

/**
 * Info Notification — Blue accent
 *
 * Shows an info notification with info icon
 */
export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'Here is some useful information for you.',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Info** notifications use blue accent and info icon. Default type for general notifications.',
      },
    },
  },
};

/**
 * Cookie Consent — Purple accent
 *
 * Shows a cookie consent notification
 */
export const CookieConsent: Story = {
  args: {
    type: 'cookie',
    title: 'Cookie Settings',
    message: 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Cookie Consent** notifications use purple accent and cookie icon. Includes action buttons for accept/dismiss.',
      },
    },
  },
};

/**
 * With Actions — Action buttons
 *
 * Shows notification with action buttons
 */
export const WithActions: Story = {
  args: {
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available. Would you like to update now?',
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**With Actions** includes primary and secondary action buttons. Use for notifications requiring user decision.',
      },
      source: {
        code: generateCardCode({
          blockName: 'notification-card',
          modifiers: ['info'],
          slots: {
            content: `
  <h4 class="notification-card__title">Update Available</h4>
  <div class="notification-card__body">
    <svg class="notification-card__icon">...</svg>
    <p class="notification-card__message">A new version is available.</p>
  </div>
  <div class="notification-card__actions">
    <button class="btn btn--primary">Update</button>
    <button class="btn btn--secondary">Later</button>
  </div>
            `.trim(),
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Multiple Notifications — Stack example
 *
 * Shows multiple notifications stacked
 */
export const MultipleNotifications: Story = {
  render: () => `
    <div style="position: relative; height: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
      <div class="notification-cards-container" style="position: absolute; bottom: 24px; right: 24px; left: auto; max-width: 420px;">
        <div class="notification-card notification-card--success">
          <div class="notification-card__content">
            <h4 class="notification-card__title">Success!</h4>
            <div class="notification-card__body">
              <svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"></path></svg>
              <p class="notification-card__message">File uploaded successfully.</p>
            </div>
          </div>
          <button class="notification-card__close">×</button>
        </div>
        
        <div class="notification-card notification-card--info">
          <div class="notification-card__content">
            <h4 class="notification-card__title">Processing</h4>
            <div class="notification-card__body">
              <svg class="notification-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4m0-4h.01"></path></svg>
              <p class="notification-card__message">Processing your request...</p>
            </div>
          </div>
          <button class="notification-card__close">×</button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Multiple Notifications** stack vertically with proper spacing. Container manages automatic stacking.',
      },
    },
  },
};
