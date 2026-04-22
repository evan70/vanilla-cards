import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Viewport Card — Full-viewport hero section
 *
 * **Immersive hero** — 100vw x 100vh presentation card
 *
 * Full-viewport card for homepage hero sections and presentations.
 *
 * ## Usage
 *
 * ```html
 * <section class="viewport-card">
 *   <div class="viewport-card__background">
 *     <img class="viewport-card__bg-image" src="hero.jpg" alt="Hero" />
 *   </div>
 *   <div class="viewport-card__overlay"></div>
 *   <div class="viewport-card__container">
 *     <div class="viewport-card__top">
 *       <div class="viewport-card__text">
 *         <div class="viewport-card__headlines">
 *           <h1 class="viewport-card__title">Hero Title</h1>
 *         </div>
 *       </div>
 *       <div class="viewport-card__custom">
 *         <!-- Custom content (stats, cards, etc.) -->
 *       </div>
 *     </div>
 *     <div class="viewport-card__bottom">
 *       <a href="#content" class="viewport-card__scroll-link">
 *         <span class="viewport-card__scroll-text">Scroll to explore</span>
 *         <span class="viewport-card__scroll-icon">↓</span>
 *       </a>
 *     </div>
 *   </div>
 * </section>
 * ```
 *
 * ## Background Types
 * - Image: `.viewport-card__bg-image`
 * - Video: `.viewport-card__bg-video`
 * - Gradient: `.viewport-card__bg-gradient`
 */

const meta = {
  title: '0-Core/09. Viewport Card',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Viewport Card** creates immersive full-screen hero sections.

### Structure

\`\`\`
.viewport-card
├── .viewport-card__background
│   └── .viewport-card__bg-image (or video/gradient)
├── .viewport-card__overlay
└── .viewport-card__container
    ├── .viewport-card__top
    │   ├── .viewport-card__text
    │   │   └── .viewport-card__headlines
    │   └── .viewport-card__custom (optional)
    └── .viewport-card__bottom
        └── .viewport-card__scroll-link
\`\`\`

### Features
- Full viewport (100vw x 100vh)
- Background image/video/gradient
- Overlay with backdrop blur
- Two-column layout (text + custom content)
- Scroll indicator
- Responsive typography

### Background Types
- **Image**: \`viewport-card__bg-image\`
- **Video**: \`viewport-card__bg-video\`
- **Gradient**: \`viewport-card__bg-gradient\`

### Related
- [Fullscreen Card](/docs/0-core-10-fullscreen--docs) - Fullscreen gallery view
        `,
      },
    },
  },
  argTypes: {
    bgType: {
      control: { type: 'select' },
      options: ['gradient', 'image', 'dark'],
      description: 'Background type',
      table: {
        type: { summary: 'gradient | image | dark' },
        defaultValue: { summary: 'gradient' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Hero title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Welcome to Nativa' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Hero subtitle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Crafting digital experiences' },
      },
    },
    showScrollIndicator: {
      control: { type: 'boolean' },
      description: 'Show scroll indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCustomContent: {
      control: { type: 'boolean' },
      description: 'Show custom content area (stats, cards)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    bgType: 'gradient',
    title: 'Welcome to Nativa',
    subtitle: 'Crafting digital experiences',
    showScrollIndicator: true,
    showCustomContent: false,
  },
  render: ({ bgType, title, subtitle, showScrollIndicator, showCustomContent }) => {
    const bgStyles = {
      gradient: 'background: linear-gradient(135deg, #d4af37 0%, #7c3aed 50%, #0891b2 100%);',
      image: 'background: url("https://picsum.photos/1920/1080") center/cover;',
      dark: 'background: #0f172a;',
    };

    return `
      <div style="position: relative; height: 600px; overflow: hidden;">
        <div class="viewport-card" style="position: absolute; inset: 0; ${bgStyles[bgType]}">
          ${bgType === 'image' ? `
          <div class="viewport-card__background">
            <img class="viewport-card__bg-image" src="https://picsum.photos/1920/1080" alt="Hero background" />
          </div>
          <div class="viewport-card__overlay"></div>
          ` : ''}
          
          ${bgType === 'dark' ? `
          <div class="viewport-card__background">
            <div class="viewport-card__bg-gradient"></div>
          </div>
          <div class="viewport-card__overlay"></div>
          ` : ''}
          
          <div class="viewport-card__container">
            <div class="viewport-card__top">
              <div class="viewport-card__text">
                <div class="viewport-card__headlines">
                  <h1 class="viewport-card__title">${title}</h1>
                  ${subtitle ? `<p class="viewport-card__subtitle">${subtitle}</p>` : ''}
                </div>
              </div>
              
              ${showCustomContent ? `
              <div class="viewport-card__custom">
                <div class="viewport-card__custom-content">
                  <div class="viewport-card__custom-grid viewport-card__custom-grid--stats">
                    <div class="card" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
                      <div style="font-size: 2rem; font-weight: 700; color: #d4af37;">150+</div>
                      <div style="font-size: 0.875rem; color: #cbd5e1;">Projects</div>
                    </div>
                    <div class="card" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
                      <div style="font-size: 2rem; font-weight: 700; color: #34d399;">98%</div>
                      <div style="font-size: 0.875rem; color: #cbd5e1;">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
              ` : ''}
            </div>
            
            ${showScrollIndicator ? `
            <div class="viewport-card__bottom">
              <a href="#content" class="viewport-card__scroll-link">
                <span class="viewport-card__scroll-text">Scroll to explore</span>
                <svg class="viewport-card__scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M19 12l-7 7-7-7"></path>
                </svg>
              </a>
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    bgType: 'gradient' | 'image' | 'dark';
    title: string;
    subtitle: string;
    showScrollIndicator: boolean;
    showCustomContent: boolean;
  };
};

/**
 * Gradient Background — Colorful hero
 *
 * Viewport card with gradient background
 */
export const GradientBackground: Story = {
  args: {
    bgType: 'gradient',
    title: 'Welcome to Nativa',
    subtitle: 'Crafting digital experiences',
    showScrollIndicator: true,
    showCustomContent: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Gradient Background** uses brand colors (gold, amethyst, sapphire) for a vibrant hero section.',
      },
      source: {
        code: generateCardCode({
          blockName: 'viewport-card',
          slots: {
            background: '<div class="viewport-card__bg-gradient"></div>',
            container: `
  <div class="viewport-card__top">
    <div class="viewport-card__text">
      <div class="viewport-card__headlines">
        <h1 class="viewport-card__title">Title</h1>
        <p class="viewport-card__subtitle">Subtitle</p>
      </div>
    </div>
  </div>
  <div class="viewport-card__bottom">
    <a href="#content" class="viewport-card__scroll-link">Scroll</a>
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
 * Image Background — Photo hero
 *
 * Viewport card with background image
 */
export const ImageBackground: Story = {
  args: {
    bgType: 'image',
    title: 'Nature Inspired Design',
    subtitle: 'Where beauty meets functionality',
    showScrollIndicator: true,
    showCustomContent: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Image Background** with overlay for text readability. Images use object-fit cover for responsive scaling.',
      },
    },
  },
};

/**
 * Dark Background — Minimal hero
 *
 * Viewport card with dark background
 */
export const DarkBackground: Story = {
  args: {
    bgType: 'dark',
    title: 'Minimalist Design',
    subtitle: 'Less is more',
    showScrollIndicator: true,
    showCustomContent: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Dark Background** for elegant, minimalist heroes. Uses dark neutral palette with gradient overlay.',
      },
    },
  },
};

/**
 * With Stats — Custom content area
 *
 * Viewport card with stats grid
 */
export const WithStats: Story = {
  args: {
    bgType: 'gradient',
    title: 'Proven Results',
    subtitle: 'Trusted by industry leaders',
    showScrollIndicator: true,
    showCustomContent: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**With Stats** shows custom content area with statistics. Perfect for showcasing metrics and achievements.',
      },
    },
  },
};

/**
 * No Scroll Indicator — Clean hero
 *
 * Viewport card without scroll indicator
 */
export const NoScrollIndicator: Story = {
  args: {
    bgType: 'gradient',
    title: 'Bold Statement',
    subtitle: 'Make an impact',
    showScrollIndicator: false,
    showCustomContent: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**No Scroll Indicator** for cleaner, more focused hero sections. Use when scroll is obvious or unwanted.',
      },
    },
  },
};

/**
 * With Actions — CTA buttons
 *
 * Viewport card with action buttons
 */
export const WithActions: Story = {
  render: () => `
    <div style="position: relative; height: 600px; overflow: hidden;">
      <div class="viewport-card" style="position: absolute; inset: 0; background: linear-gradient(135deg, #d4af37 0%, #7c3aed 50%, #0891b2 100%);">
        <div class="viewport-card__container">
          <div class="viewport-card__top">
            <div class="viewport-card__text">
              <div class="viewport-card__headlines">
                <h1 class="viewport-card__title">Start Your Journey</h1>
                <p class="viewport-card__subtitle">Transform your digital presence today</p>
              </div>
              <div class="viewport-card__actions" style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <a href="#" class="viewport-card__button viewport-card__button--primary">
                  Get Started
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <a href="#" class="viewport-card__button viewport-card__button--secondary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**With Actions** includes primary and secondary CTA buttons. Buttons use rounded pill shape with hover effects.',
      },
    },
  },
};
