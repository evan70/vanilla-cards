import { generateCardCode } from '@stories-utils/create-card-story';

/**
 * Gallery Card — Grid/Masonry image gallery
 *
 * **Responsive grid** — Masonry layout with lightbox
 *
 * Gallery card for portfolio images and photo grids.
 *
 * ## Usage
 *
 * ```html
 * <div class="card gallery-card">
 *   <div class="gallery-card__grid">
 *     <div class="gallery-card__item">
 *       <img class="gallery-card__image" src="image.jpg" alt="Gallery" />
 *       <div class="gallery-card__overlay">
 *         <h4 class="gallery-card__overlay-title">Title</h4>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ## Grid Variants
 * - Default: Auto-fill grid
 * - Masonry: `.gallery__grid--masonry`
 * - Compact: `.gallery__grid--compact`
 * - Spacious: `.gallery__grid--spacious`
 */

const meta = {
  title: '0-Core/11. Gallery Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Gallery Card** displays image grids with hover overlays.

### Structure

\`\`\`
.card.card--gallery
└── .gallery__grid
    └── .gallery__item
        ├── .gallery__image
        ├── .gallery__overlay
        │   ├── .gallery__overlay-title
        │   └── .gallery__overlay-meta
        └── .gallery__actions (optional)
\`\`\`

### Grid Variants
- **Default**: Auto-fill responsive grid
- **Masonry**: \`--masonry\` column-based layout
- **Compact**: \`--compact\` reduced spacing
- **Spacious**: \`--spacious\` increased spacing

### Features
- Responsive auto-fill grid
- Hover overlay with title/meta
- Action buttons (favorite, expand)
- Lazy loading support
- Lightbox integration

### Related
- [Fullscreen Card](/docs/0-core-10-fullscreen--docs) - Lightbox viewer
- [Project Card](/docs/0-core-12-project--docs) - Project showcase
        `,
      },
    },
  },
  argTypes: {
    gridType: {
      control: { type: 'select' },
      options: ['default', 'masonry', 'compact', 'spacious'],
      description: 'Grid layout type',
      table: {
        type: { summary: 'default | masonry | compact | spacious' },
        defaultValue: { summary: 'default' },
      },
    },
    columns: {
      control: { type: 'select' },
      options: ['2', '3', '4'],
      description: 'Number of columns',
      table: {
        type: { summary: '2 | 3 | 4' },
        defaultValue: { summary: '3' },
      },
    },
    showOverlay: {
      control: { type: 'boolean' },
      description: 'Show hover overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    gridType: 'default',
    columns: '3',
    showOverlay: true,
    showActions: false,
  },
  render: ({ gridType, columns, showOverlay, showActions }) => {
    const gridClasses = ['gallery__grid'];
    if (gridType !== 'default') gridClasses.push(`gallery__grid--${gridType}`);

    // Apply explicit column count based on control
    const gridStyle = `grid-template-columns: repeat(${columns}, 1fr);`;

    return `
      <div class="card card--gallery">
        <div class="${gridClasses.join(' ')}" style="${gridStyle}">
          ${[1, 2, 3, 4, 5, 6]
            .map(
              (i) => `
          <div class="gallery__item">
            <img class="gallery__image" src="https://picsum.photos/400/400?random=${i}" alt="Gallery image ${i}" />
            ${
              showOverlay
                ? `
            <div class="gallery__overlay">
              <h4 class="gallery__overlay-title">Project ${i}</h4>
              <p class="gallery__overlay-meta">Photography</p>
            </div>
            `
                : ''
            }
            ${
              showActions
                ? `
            <div class="gallery__actions">
              <button class="gallery__action-btn" aria-label="Favorite">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button class="gallery__action-btn" aria-label="Expand">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
              </button>
            </div>
            `
                : ''
            }
          </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = {
  args: {
    gridType: 'default' | 'masonry' | 'compact' | 'spacious';
    columns: '2' | '3' | '4';
    showOverlay: boolean;
    showActions: boolean;
  };
};

/**
 * Default Grid — 3 columns
 *
 * Standard gallery grid with 3 columns
 */
export const DefaultGrid: Story = {
  args: {
    gridType: 'masonry',
    columns: '3',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Default Grid** with 3 columns and hover overlays. Responsive auto-fill layout.',
      },
      source: {
        code: generateCardCode({
          blockName: 'card--gallery',
          slots: {
            grid: `
  <div class="gallery__item">
    <img class="gallery__image" src="image.jpg" alt="Gallery" />
    <div class="gallery__overlay">
      <h4 class="gallery__overlay-title">Title</h4>
    </div>
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
 * Masonry Layout — Column-based
 *
 * Gallery with masonry column layout
 */
export const MasonryLayout: Story = {
  args: {
    gridType: 'masonry',
    columns: '3',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Masonry Layout** uses CSS columns for Pinterest-style layout. Items flow vertically.',
      },
    },
  },
};

/**
 * 2 Columns — Wide tiles
 *
 * Gallery with 2 columns
 */
export const TwoColumns: Story = {
  args: {
    gridType: 'default',
    columns: '2',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**2 Columns** for wider tiles. Perfect for landscape-oriented images.',
      },
    },
  },
};

/**
 * 4 Columns — Dense grid
 *
 * Gallery with 4 columns
 */
export const FourColumns: Story = {
  args: {
    gridType: 'default',
    columns: '4',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**4 Columns** for dense grids. Best for portrait-oriented or square images.',
      },
    },
  },
};

/**
 * With Actions — Favorite & Expand
 *
 * Gallery with action buttons on hover
 */
export const WithActions: Story = {
  args: {
    gridType: 'default',
    columns: '3',
    showOverlay: true,
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '**With Actions** shows favorite and expand buttons on hover. Glassmorphic button styling.',
      },
    },
  },
};

/**
 * Compact Spacing — Reduced gaps
 *
 * Gallery with compact spacing
 */
export const CompactSpacing: Story = {
  args: {
    gridType: 'compact',
    columns: '3',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Compact Spacing** reduces gaps between images for tighter layouts.',
      },
    },
  },
};

/**
 * Spacious — Wide gaps
 *
 * Gallery with spacious spacing
 */
export const Spacious: Story = {
  args: {
    gridType: 'spacious',
    columns: '3',
    showOverlay: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Spacious** increases gaps for elegant, gallery-like presentation.',
      },
    },
  },
};

/**
 * Grid Comparison — All layouts side by side
 *
 * Compare different grid layouts
 */
export const GridComparison: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <!-- Default Grid -->
      <div>
        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Default Grid (3 columns)</h3>
        <div class="card card--gallery">
          <div class="gallery__grid" style="grid-template-columns: repeat(3, 1fr);">
            ${[1, 2, 3, 4, 5, 6]
              .map(
                (i) => `
            <div class="gallery__item">
              <img class="gallery__image" src="https://picsum.photos/400/400?random=${i}" alt="Gallery ${i}" />
              <div class="gallery__overlay">
                <h4 class="gallery__overlay-title">Project ${i}</h4>
                <p class="gallery__overlay-meta">Photography</p>
              </div>
            </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- Masonry Grid -->
      <div>
        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">Masonry Grid (Pinterest-style)</h3>
        <div class="card card--gallery">
          <div class="gallery__grid gallery__grid--masonry">
            ${[1, 2, 3, 4, 5, 6]
              .map(
                (i) => `
            <div class="gallery__item" style="height: ${200 + i * 50}px;">
              <img class="gallery__image" src="https://picsum.photos/400/${200 + i * 50}?random=${i}" alt="Gallery ${i}" style="height: 100%;" />
              <div class="gallery__overlay">
                <h4 class="gallery__overlay-title">Project ${i}</h4>
                <p class="gallery__overlay-meta">Photography</p>
              </div>
            </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- 2 Column Grid -->
      <div>
        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">2 Column Grid</h3>
        <div class="card card--gallery">
          <div class="gallery__grid" style="grid-template-columns: repeat(2, 1fr);">
            ${[1, 2, 3, 4]
              .map(
                (i) => `
            <div class="gallery__item">
              <img class="gallery__image" src="https://picsum.photos/600/400?random=${i}" alt="Gallery ${i}" />
              <div class="gallery__overlay">
                <h4 class="gallery__overlay-title">Project ${i}</h4>
                <p class="gallery__overlay-meta">Photography</p>
              </div>
            </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- 4 Column Grid -->
      <div>
        <h3 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;">4 Column Grid (Dense)</h3>
        <div class="card card--gallery">
          <div class="gallery__grid" style="grid-template-columns: repeat(4, 1fr);">
            ${[1, 2, 3, 4, 5, 6, 7, 8]
              .map(
                (i) => `
            <div class="gallery__item">
              <img class="gallery__image" src="https://picsum.photos/300/300?random=${i}" alt="Gallery ${i}" />
              <div class="gallery__overlay">
                <h4 class="gallery__overlay-title">Project ${i}</h4>
                <p class="gallery__overlay-meta">Photography</p>
              </div>
            </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          '**Grid Comparison** shows all layout variants side by side for easy comparison. Includes Default (3 columns), Masonry, 2-column, and 4-column grids.',
      },
    },
  },
};
