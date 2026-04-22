import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Footer Card — Site footer with links and social
 *
 * Multi-column footer with sections, links, social media, and copyright.
 *
 * ## Usage
 *
 * ```html
 * <footer class="footer-card">
 *   <div class="footer-card__inner">
 *     <div class="footer-card__content">
 *       <div class="footer-card__section">
 *         <h4 class="footer-card__title">Section</h4>
 *         <ul class="footer-card__links">...</ul>
 *       </div>
 *     </div>
 *     <div class="footer-card__bottom">
 *       <p>&copy; 2026 Company</p>
 *     </div>
 *   </div>
 * </footer>
 * ```
 *
 * ## CSS Default
 * Uses filled variant by default (background-based separation)
 */

const meta = {
  title: '0-Core/04. Footer Card',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Footer Card** provides site-wide footer structure with navigation, social links, and copyright.

### Structure

\`\`\`
.card--footer
├── .card--footer__inner (max-width container)
│   ├── .card--footer__content (grid layout)
│   │   └── .card--footer__section (repeatable)
│   │       ├── .card--footer__title
│   │       └── .card--footer__links
│   └── .card--footer__bottom (copyright)
\`\`\`

### Features
- 3-column grid layout (responsive to 1 column on mobile)
- Social media links with icons
- Copyright section
- Responsive padding

### Related
- [Header Card](/docs/0-core-2-header--docs) - Site header
- [Card Variants](/docs/0-core-1-card-variants--docs) - Visual styling
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: 'Number of footer columns',
      table: {
        type: { summary: '1 | 2 | 3' },
        defaultValue: { summary: '3' },
      },
    },
    showSocial: {
      control: { type: 'boolean' },
      description: 'Show social media links',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCopyright: {
      control: { type: 'boolean' },
      description: 'Show copyright section',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    columns: 3,
    showSocial: true,
    showCopyright: true,
  },
  render: ({ columns, showSocial, showCopyright }) => {
    const gridStyle = columns === 1 ? 'grid-template-columns: 1fr' : columns === 2 ? 'grid-template-columns: repeat(2, 1fr)' : 'grid-template-columns: repeat(3, 1fr)';

    return `
      <footer class="footer-card" style="position: relative; margin: 2rem -2rem -2rem;">
        <div class="footer-card__inner">
          <div class="footer-card__content" style="${gridStyle}">
            <div class="footer-card__section">
              <h4 class="footer-card__title">Company</h4>
              <ul class="footer-card__links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div class="footer-card__section">
              <h4 class="footer-card__title">Resources</h4>
              <ul class="footer-card__links">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            ${columns === 3 ? `
            <div class="footer-card__section">
              <h4 class="footer-card__title">Legal</h4>
              <ul class="footer-card__links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            ` : ''}
          </div>

          ${showSocial ? `
          <div class="footer-card__section" style="margin-bottom: 2rem;">
            <h4 class="footer-card__title">Follow Us</h4>
            <ul class="footer-card__social">
              <li>
                <a href="#" aria-label="Facebook">
                  <svg class="footer-card__social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter">
                  <svg class="footer-card__social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <svg class="footer-card__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  <svg class="footer-card__social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          ` : ''}

          ${showCopyright ? `
          <div class="footer-card__bottom">
            <p>&copy; 2026 Nativa. All rights reserved.</p>
          </div>
          ` : ''}
        </div>
      </footer>
    `;
  },
};

export default meta;

type Story = {
  args: {
    columns: number;
    showSocial: boolean;
    showCopyright: boolean;
  };
};

/**
 * Basic Footer — 3-column layout
 *
 * Standard footer with three sections and copyright
 */
export const Basic: Story = {
  args: {
    columns: 3,
    showSocial: false,
    showCopyright: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Basic** footer with three columns: Company, Resources, and Legal. Clean and simple layout.',
      },
      source: {
        code: generateCardCode({
          blockName: 'footer-card',
          slots: {
            content: `
  <div class="footer-card__section">
    <h4 class="footer-card__title">Company</h4>
    <ul class="footer-card__links">
      <li><a href="#">About</a></li>
      <li><a href="#">Careers</a></li>
    </ul>
  </div>
  <div class="footer-card__section">
    <h4 class="footer-card__title">Resources</h4>
    <ul class="footer-card__links">
      <li><a href="#">Docs</a></li>
      <li><a href="#">Help</a></li>
    </ul>
  </div>
  <div class="footer-card__section">
    <h4 class="footer-card__title">Legal</h4>
    <ul class="footer-card__links">
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
    </ul>
  </div>
            `,
            bottom: '<p>&copy; 2026 Company</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * With Social — Includes social media links
 *
 * Footer with social media icons section
 */
export const WithSocial: Story = {
  args: {
    columns: 3,
    showSocial: true,
    showCopyright: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**With Social** adds a section of social media links above the copyright. Includes Facebook, Twitter, Instagram, and LinkedIn icons.',
      },
      source: {
        code: generateCardCode({
          blockName: 'footer-card',
          slots: {
            content: '...',
            social: `
  <ul class="footer-card__social">
    <li><a href="#" aria-label="Facebook">...</a></li>
    <li><a href="#" aria-label="Twitter">...</a></li>
    <li><a href="#" aria-label="Instagram">...</a></li>
    <li><a href="#" aria-label="LinkedIn">...</a></li>
  </ul>
            `,
            bottom: '<p>&copy; 2026 Company</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Multi-Column — 2-column layout
 *
 * Simpler footer with two columns
 */
export const MultiColumn: Story = {
  args: {
    columns: 2,
    showSocial: true,
    showCopyright: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Multi-Column** with 2 columns instead of 3. Good for simpler sites with fewer links.',
      },
      source: {
        code: generateCardCode({
          blockName: 'footer-card',
          slots: {
            content: `
  <div class="footer-card__section">
    <h4 class="footer-card__title">Links</h4>
    <ul class="footer-card__links">...</ul>
  </div>
  <div class="footer-card__section">
    <h4 class="footer-card__title">Contact</h4>
    <ul class="footer-card__links">...</ul>
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
 * Compact — Single column, minimal
 *
 * Minimal footer with single column layout
 */
export const Compact: Story = {
  args: {
    columns: 1,
    showSocial: false,
    showCopyright: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**Compact** single-column footer for minimal designs or narrow pages.',
      },
      source: {
        code: generateCardCode({
          blockName: 'footer-card',
          slots: {
            content: `
  <div class="footer-card__section">
    <h4 class="footer-card__title">Quick Links</h4>
    <ul class="footer-card__links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
            `,
            bottom: '<p>&copy; 2026 Company</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Copyright Only — Minimal footer
 *
 * Just the copyright section, no columns
 */
export const CopyrightOnly: Story = {
  render: () => `
    <footer class="footer-card" style="position: relative; margin: 2rem -2rem -2rem;">
      <div class="footer-card__inner">
        <div class="footer-card__bottom">
          <p>&copy; 2026 Nativa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Copyright Only** is the minimal footer variant with just the copyright notice. Use when you need minimal footprint.',
      },
      source: {
        code: generateCardCode({
          blockName: 'footer-card',
          slots: {
            bottom: '<p>&copy; 2026 Nativa. All rights reserved.</p>',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Responsive Behavior — Mobile view
 *
 * Shows how footer stacks on mobile
 */
export const ResponsiveBehavior: Story = {
  render: () => `
    <div style="display: grid; gap: 2rem; grid-template-columns: 1fr 1fr;">
      <div>
        <p style="margin-bottom: 1rem; font-weight: 600;">Desktop (3 columns)</p>
        <footer class="footer-card" style="position: relative;">
          <div class="footer-card__inner">
            <div class="footer-card__content" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
              <div class="footer-card__section">
                <h4 class="footer-card__title">Company</h4>
                <ul class="footer-card__links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div class="footer-card__section">
                <h4 class="footer-card__title">Resources</h4>
                <ul class="footer-card__links">
                  <li><a href="#">Docs</a></li>
                  <li><a href="#">Help</a></li>
                </ul>
              </div>
              <div class="footer-card__section">
                <h4 class="footer-card__title">Legal</h4>
                <ul class="footer-card__links">
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div style="max-width: 320px;">
        <p style="margin-bottom: 1rem; font-weight: 600;">Mobile (1 column)</p>
        <footer class="footer-card" style="position: relative;">
          <div class="footer-card__inner">
            <div class="footer-card__content" style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
              <div class="footer-card__section">
                <h4 class="footer-card__title">Company</h4>
                <ul class="footer-card__links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div class="footer-card__section">
                <h4 class="footer-card__title">Resources</h4>
                <ul class="footer-card__links">
                  <li><a href="#">Docs</a></li>
                  <li><a href="#">Help</a></li>
                </ul>
              </div>
              <div class="footer-card__section">
                <h4 class="footer-card__title">Legal</h4>
                <ul class="footer-card__links">
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Responsive Behavior** shows how the footer automatically stacks columns on mobile. Desktop shows 3 columns, mobile shows 1 column.',
      },
    },
  },
};
