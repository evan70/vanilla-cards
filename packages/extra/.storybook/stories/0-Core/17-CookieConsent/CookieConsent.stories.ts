import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Cookie Consent — GDPR compliance banner
 *
 * **Bottom banner** — Slide-in cookie notification
 *
 * Cookie consent banner for GDPR compliance and privacy notices.
 *
 * ## Usage
 *
 * ```html
 * <div class="cookie-consent">
 *   <div class="cookie-consent__content">
 *     <h4 class="cookie-consent__title">Cookie Settings</h4>
 *     <p class="cookie-consent__description">
 *       We use cookies to enhance your experience. By continuing to 
 *       visit this site you agree to our use of cookies.
 *     </p>
 *     <div class="cookie-consent__actions">
 *       <button class="btn btn--primary">Accept All</button>
 *       <button class="btn btn--secondary">Essential Only</button>
 *       <button class="btn btn--ghost">Learn More</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ## States
 * - Default: Hidden (slid down)
 * - Visible: `.cookie-consent:not(.cookie-consent--hidden)`
 * - Hidden: `.cookie-consent--hidden`
 */

const meta = {
  title: '0-Core/17. Cookie Consent',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Cookie Consent** displays GDPR-compliant cookie notices.

### Structure

\`\`\`
.cookie-consent (fixed bottom-center)
└── .cookie-consent__content
    ├── .cookie-consent__title
    ├── .cookie-consent__description
    └── .cookie-consent__actions
        ├── .btn.btn--primary (Accept All)
        ├── .btn.btn--secondary (Essential Only)
        └── .btn.btn--ghost (Learn More)
\`\`\`

### Features
- Fixed bottom-center position
- Slide-in animation
- Theme-aware (light/dark)
- Responsive layout
- Multiple action buttons
- Reduced motion support

### States
- **Hidden**: \`--hidden\` modifier (slid down)
- **Visible**: Default (slid up)

### JavaScript Control

\`\`\`javascript
// Show consent
consent.classList.remove('cookie-consent--hidden');

// Hide after acceptance
consent.classList.add('cookie-consent--hidden');

// Check localStorage
if (!localStorage.getItem('cookie-consent')) {
  consent.classList.remove('cookie-consent--hidden');
}
\`\`\`

### Button Hierarchy
1. **Primary**: "Accept All" (gold background)
2. **Secondary**: "Essential Only" (outline)
3. **Ghost**: "Learn More" (text only)

### Related
- [Notification Card](/docs/0-core-8-notification--docs) - Toast notifications
        `,
      },
    },
  },
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
      description: 'Banner visibility',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Show title',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    buttonCount: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
      description: 'Number of action buttons',
      table: {
        type: { summary: '1 | 2 | 3' },
        defaultValue: { summary: '3' },
      },
    },
  },
  args: {
    isVisible: true,
    showTitle: true,
    buttonCount: '3',
  },
  render: ({ isVisible, showTitle, buttonCount }) => {
    return `
      <div style="position: relative; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
        <div class="cookie-consent ${isVisible ? '' : 'cookie-consent--hidden'}" style="position: absolute; bottom: 20px; left: 50%; transform: ${isVisible ? 'translateX(-50%)' : 'translateX(-50%) translateY(100%)'}; opacity: ${isVisible ? '1' : '0'}; max-width: 600px; width: calc(100% - 40px);">
          <div class="cookie-consent__content">
            ${showTitle ? '<h4 class="cookie-consent__title">Cookie Settings</h4>' : ''}
            <p class="cookie-consent__description">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <div class="cookie-consent__actions">
              <button class="btn btn--primary">Accept All</button>
              ${parseInt(buttonCount) >= 2 ? `<button class="btn btn--secondary">Essential Only</button>` : ''}
              ${parseInt(buttonCount) >= 3 ? `<button class="btn btn--ghost">Learn More</button>` : ''}
            </div>
          </div>
        </div>
        
        <!-- Demo content -->
        <div style="color: white; text-align: center; padding-top: 100px;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Page Content</h2>
          <p>Cookie consent banner appears at bottom</p>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    isVisible: boolean;
    showTitle: boolean;
    buttonCount: '1' | '2' | '3';
  };
};

/**
 * Visible — Banner shown
 *
 * Cookie consent banner in visible state
 */
export const Visible: Story = {
  args: {
    isVisible: true,
    showTitle: true,
    buttonCount: '3',
  },
  parameters: {
    docs: {
      description: {
        story: '**Visible** state shows the banner slid up from bottom. Default state for first-time visitors.',
      },
      source: {
        code: generateCardCode({
          blockName: 'cookie-consent',
          slots: {
            content: `
  <h4 class="cookie-consent__title">Cookie Settings</h4>
  <p class="cookie-consent__description">We use cookies to enhance your experience...</p>
  <div class="cookie-consent__actions">
    <button class="btn btn--primary">Accept All</button>
    <button class="btn btn--secondary">Essential Only</button>
    <button class="btn btn--ghost">Learn More</button>
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
 * Hidden — Banner dismissed
 *
 * Cookie consent banner in hidden state
 */
export const Hidden: Story = {
  args: {
    isVisible: false,
    showTitle: true,
    buttonCount: '3',
  },
  parameters: {
    docs: {
      description: {
        story: '**Hidden** state slides banner down. Applied after user accepts or dismisses.',
      },
    },
  },
};

/**
 * Accept Only — Single button
 *
 * Minimal cookie consent with one button
 */
export const AcceptOnly: Story = {
  args: {
    isVisible: true,
    showTitle: false,
    buttonCount: '1',
  },
  parameters: {
    docs: {
      description: {
        story: '**Accept Only** minimal variant with single "Accept" button. Simplest GDPR compliance.',
      },
    },
  },
};

/**
 * Accept & Essential — Two buttons
 *
 * Cookie consent with two options
 */
export const TwoButtons: Story = {
  args: {
    isVisible: true,
    showTitle: true,
    buttonCount: '2',
  },
  parameters: {
    docs: {
      description: {
        story: '**Two Buttons** offers "Accept All" and "Essential Only" choices. Balanced approach.',
      },
    },
  },
};

/**
 * Full Options — Three buttons
 *
 * Complete cookie consent with all options
 */
export const FullOptions: Story = {
  args: {
    isVisible: true,
    showTitle: true,
    buttonCount: '3',
  },
  parameters: {
    docs: {
      description: {
        story: '**Full Options** provides "Accept All", "Essential Only", and "Learn More". Most transparent approach.',
      },
    },
  },
};

/**
 * Mobile View — Responsive layout
 *
 * Cookie consent on mobile device
 */
export const MobileView: Story = {
  render: () => `
    <div style="position: relative; height: 500px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem;">
      <div class="cookie-consent" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); opacity: 1; max-width: none; width: calc(100% - 20px);">
        <div class="cookie-consent__content">
          <h4 class="cookie-consent__title" style="font-size: 1.125rem;">Cookie Settings</h4>
          <p class="cookie-consent__description" style="font-size: 1rem; line-height: 1.6;">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div class="cookie-consent__actions" style="flex-direction: column;">
            <button class="btn btn--primary btn--full-width">Accept All</button>
            <button class="btn btn--secondary btn--full-width">Essential Only</button>
            <button class="btn btn--ghost btn--full-width">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Mobile View** stacks buttons vertically for easier tapping. Reduced padding and font sizes.',
      },
    },
  },
};
