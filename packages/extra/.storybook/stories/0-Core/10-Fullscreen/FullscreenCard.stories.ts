import { generateCardCode } from '@stories-utils/create-card-story';
import { FullscreenManager } from '../@vanilla-cards/lib/fullscreen-manager';

/**
 * Fullscreen Card — Immersive gallery viewer
 *
 * **Fullscreen lightbox** — Fixed overlay for media viewing
 *
 * Fullscreen card for image galleries and media showcases.
 *
 * ## Usage
 *
 * ```html
 * <div class="fullscreen-card" id="my-gallery">
 *   <button class="fullscreen-card__close" aria-label="Close">×</button>
 *   <button class="fullscreen-card__nav fullscreen-card__nav--prev" aria-label="Previous">←</button>
 *   <button class="fullscreen-card__nav fullscreen-card__nav--next" aria-label="Next">→</button>
 *   <div class="fullscreen-card__content">
 *     <img class="fullscreen-card__media" src="image.jpg" alt="Fullscreen" />
 *   </div>
 *   <div class="fullscreen-card__counter">1 / 10</div>
 *   <div class="fullscreen-card__thumbnails">
 *     <div class="fullscreen-card__thumbnail fullscreen-card__thumbnail--active">
 *       <img src="thumb1.jpg" alt="Thumb 1" />
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ## JavaScript Control
 *
 * ```javascript
 * import { FullscreenManager } from './lib/fullscreen-manager';
 *
 * // Enter fullscreen
 * FullscreenManager.enterFullscreen('my-gallery', [
 *   { src: 'image1.jpg', alt: 'Image 1', caption: 'Caption 1' },
 *   { src: 'image2.jpg', alt: 'Image 2', caption: 'Caption 2' },
 * ], startIndex);
 *
 * // Exit fullscreen
 * FullscreenManager.exitFullscreen();
 *
 * // Navigate
 * FullscreenManager.nextImage();
 * FullscreenManager.prevImage();
 * FullscreenManager.goToImage(index);
 * ```
 */

const meta = {
  title: '0-Core/10. Fullscreen Card',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Fullscreen Card** provides immersive media viewing.

### Structure

\`\`\`
.card--fullscreen (fixed overlay)
├── .card--fullscreen__close
├── .card--fullscreen__nav--prev
├── .card--fullscreen__nav--next
├── .card--fullscreen__content
│   └── .card--fullscreen__media
├── .card--fullscreen__counter
└── .card--fullscreen__thumbnails (optional)
    └── .card--fullscreen__thumbnail
\`\`\`

### Features
- Fixed fullscreen overlay
- Navigation arrows (prev/next)
- Thumbnail strip
- Image counter
- Zoom support
- Keyboard navigation
- **Responsive images** (mobile, tablet, desktop)

### Responsive Images

| Viewport | Image Size | Navigation | Thumbnails |
|----------|-----------|------------|------------|
| Mobile (375px) | Portrait optimized | 40px | 48px |
| Tablet (768px) | Medium | 48px | 56px |
| Desktop (1920px) | Full size | 56px | 60px |

### CSS Responsive Rules

\`\`\`css
.card--fullscreen__media {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain; /* Maintains aspect ratio */
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .card--fullscreen__nav {
    width: 40px;
    height: 40px;
  }
  
  .card--fullscreen__thumbnail {
    width: 48px;
    height: 48px;
  }
}
\`\`\`

### JavaScript Control

\`\`\`javascript
// Show fullscreen
card.classList.add('fullscreen-card--active');

// Hide fullscreen
card.classList.remove('fullscreen-card--active');
\`\`\`

### Related
- [Gallery Card](/docs/0-core-11-gallery--docs) - Gallery grid
- [Viewport Card](/docs/0-core-9-viewport--docs) - Hero section
        `,
      },
    },
  },
  argTypes: {
    showNav: {
      control: { type: 'boolean' },
      description: 'Show navigation arrows',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showThumbnails: {
      control: { type: 'boolean' },
      description: 'Show thumbnail strip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCounter: {
      control: { type: 'boolean' },
      description: 'Show image counter',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCaption: {
      control: { type: 'boolean' },
      description: 'Show caption overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    showNav: true,
    showThumbnails: true,
    showCounter: true,
    showCaption: false,
  },
  render: ({ showNav, showThumbnails, showCounter, showCaption }) => {
    const images = [
      { src: 'https://picsum.photos/1200/800?random=1', alt: 'Image 1', caption: 'Beautiful project showcase' },
      { src: 'https://picsum.photos/1200/800?random=2', alt: 'Image 2', caption: 'Amazing design work' },
      { src: 'https://picsum.photos/1200/800?random=3', alt: 'Image 3', caption: 'Creative solution' },
      { src: 'https://picsum.photos/1200/800?random=4', alt: 'Image 4', caption: 'Professional result' },
      { src: 'https://picsum.photos/1200/800?random=5', alt: 'Image 5', caption: 'Stunning visuals' },
    ];

    // Initialize fullscreen manager
    setTimeout(() => {
      FullscreenManager.init();
    }, 100);

    return `
      <style>
        .fullscreen-demo {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          visibility: visible;
        }
        .fullscreen-demo .card--fullscreen__media {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          cursor: grab;
          user-select: none;
        }
        .fullscreen-demo .card--fullscreen__media:active {
          cursor: grabbing;
        }
        .fullscreen-demo .card--fullscreen__counter {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 9999px;
          font-size: 0.875rem;
          color: #999;
          z-index: 100;
        }
        .fullscreen-demo .card--fullscreen__thumbnails {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          max-width: 90vw;
          overflow-x: auto;
          z-index: 100;
        }
        .fullscreen-demo .card--fullscreen__thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s, transform 0.2s, border-color 0.2s;
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .fullscreen-demo .card--fullscreen__thumbnail:hover {
          opacity: 1;
          transform: scale(1.05);
        }
        .fullscreen-demo .card--fullscreen__thumbnail--active {
          opacity: 1;
          border-color: #d4af37;
        }
        .fullscreen-demo .card--fullscreen__thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fullscreen-demo .card--fullscreen__caption {
          position: absolute;
          bottom: 6rem;
          left: 50%;
          transform: translateX(-50%);
          max-width: 600px;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          text-align: center;
          z-index: 100;
        }
        .fullscreen-demo .card--fullscreen__caption-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
        }
        /* Positioning for icon buttons */
        .fullscreen-demo .card--fullscreen__close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 100;
        }
        .fullscreen-demo .card--fullscreen__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
        }
        .fullscreen-demo .card--fullscreen__nav--prev {
          left: 1rem;
        }
        .fullscreen-demo .card--fullscreen__nav--next {
          right: 1rem;
        }
      </style>
      
      <div class="fullscreen-card fullscreen-demo" id="fullscreen-gallery">
        ${showCounter ? `<div class="fullscreen-card__counter">1 / ${images.length}</div>` : ''}

        <button class="fullscreen-card__close icon-btn icon-btn--glass icon-btn--circle icon-btn--lg" aria-label="Close" onclick="FullscreenManager.exitFullscreen()">
          <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>

        ${showNav ? `
        <button class="fullscreen-card__nav fullscreen-card__nav--prev icon-btn icon-btn--glass icon-btn--lg" aria-label="Previous" onclick="FullscreenManager.prevImage()">
          <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button class="fullscreen-card__nav fullscreen-card__nav--next icon-btn icon-btn--glass icon-btn--lg" aria-label="Next" onclick="FullscreenManager.nextImage()">
          <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        ` : ''}

        <div class="fullscreen-card__content">
          <img
            class="fullscreen-card__media"
            src="${images[0].src}"
            alt="${images[0].alt}"
          />
        </div>

        ${showCaption ? `
        <div class="fullscreen-card__caption">
          <h3 class="fullscreen-card__caption-title">${images[0].caption}</h3>
        </div>
        ` : ''}

        ${showThumbnails ? `
        <div class="fullscreen-card__thumbnails">
          ${images.map((img, i) => `
            <div class="fullscreen-card__thumbnail ${i === 0 ? 'fullscreen-card__thumbnail--active' : ''}" 
                 onclick="FullscreenManager.goToImage(${i})">
              <img src="${img.src.replace('1200/800', '100/100')}" alt="${img.alt}" />
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
      
      <script>
        // Initialize with first image
        setTimeout(() => {
          FullscreenManager.enterFullscreen('fullscreen-gallery', ${JSON.stringify(images)}, 0);
        }, 100);
      </script>
    `;
  },
};

export default meta;

type Story = {
  args: {
    showNav: boolean;
    showThumbnails: boolean;
    showCounter: boolean;
    showCaption: boolean;
  };
};

/**
 * Full Viewer — All features enabled
 *
 * Fullscreen card with all features
 */
export const FullViewer: Story = {
  args: {
    showNav: true,
    showThumbnails: true,
    showCounter: true,
    showCaption: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Full Viewer** with navigation, thumbnails, and counter. Complete gallery viewing experience.',
      },
      source: {
        code: generateCardCode({
          blockName: 'fullscreen-card',
          modifiers: ['active'],
          slots: {
            content: '<img class="fullscreen-card__media" src="image.jpg" alt="Fullscreen" />',
          },
        }),
        language: 'html',
      },
    },
  },
};

/**
 * Minimal — Image only
 *
 * Fullscreen card with just the image
 */
export const Minimal: Story = {
  args: {
    showNav: false,
    showThumbnails: false,
    showCounter: false,
    showCaption: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Minimal** shows only the image with close button. Perfect for focused product views.',
      },
    },
  },
};

/**
 * With Caption — Image with description
 *
 * Fullscreen card with caption overlay
 */
export const WithCaption: Story = {
  args: {
    showNav: true,
    showThumbnails: false,
    showCounter: true,
    showCaption: true,
  },
  parameters: {
    docs: {
      description: {
        story: '**With Caption** includes title and description overlay. Use for detailed image information.',
      },
    },
  },
};

/**
 * Navigation Only — Arrows + Counter
 *
 * Fullscreen card with navigation arrows
 */
export const NavigationOnly: Story = {
  args: {
    showNav: true,
    showThumbnails: false,
    showCounter: true,
    showCaption: false,
  },
  parameters: {
    docs: {
      description: {
        story: '**Navigation Only** provides arrows and counter without thumbnails. Clean gallery navigation.',
      },
    },
  },
};

/**
 * Mobile View — Responsive layout
 *
 * Fullscreen card on mobile viewport (375px)
 */
export const MobileView: Story = {
  render: () => `
    <div style="position: relative; height: 667px; width: 375px; background: #000; margin: 0 auto; border: 8px solid #333; border-radius: 40px; overflow: hidden;">
      <!-- Mobile status bar mock -->
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 44px; background: #000; z-index: 100; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600;">9:41</div>
      
      <div class="fullscreen-card fullscreen-card--active" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center;">
        <div class="fullscreen-card__counter" style="position: absolute; top: 50px; left: 16px; padding: 4px 12px; background: rgba(0, 0, 0, 0.8); border-radius: 9999px; font-size: 12px; color: #999;">1 / 6</div>
        
        <button class="fullscreen-card__close" aria-label="Close" style="position: absolute; top: 50px; right: 16px; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
        
        <button class="fullscreen-card__nav fullscreen-card__nav--prev" aria-label="Previous" style="position: absolute; left: 8px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button class="fullscreen-card__nav fullscreen-card__nav--next" aria-label="Next" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <div class="fullscreen-card__content" style="padding: 16px;">
          <!-- Responsive image - uses width/height of container -->
          <img class="fullscreen-card__media" src="https://picsum.photos/800/1200" alt="Fullscreen image" style="max-width: 100%; max-height: calc(667px - 100px); width: auto; height: auto; object-fit: contain; border-radius: 8px;" />
        </div>
        
        <div class="fullscreen-card__thumbnails" style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; padding: 8px; background: rgba(0, 0, 0, 0.8); border-radius: 12px; max-width: 90%;">
          <div class="fullscreen-card__thumbnail fullscreen-card__thumbnail--active" style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; border: 2px solid #d4af37;">
            <img src="https://picsum.photos/100/100?random=1" alt="Thumb 1" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=2" alt="Thumb 2" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=3" alt="Thumb 3" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 48px; height: 48px; border-radius: 6px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=4" alt="Thumb 4" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Mobile View** shows fullscreen card on mobile viewport (iPhone SE: 375x667px). Image is responsive with `max-width: 100%` and `max-height` adjusted for mobile. Navigation buttons are smaller (40px) and thumbnails are reduced (48px).',
      },
    },
  },
};

/**
 * Tablet View — Medium viewport
 *
 * Fullscreen card on tablet viewport (768px)
 */
export const TabletView: Story = {
  render: () => `
    <div style="position: relative; height: 1024px; width: 768px; background: #000; margin: 0 auto; border: 8px solid #333; border-radius: 16px; overflow: hidden;">
      <div class="fullscreen-card fullscreen-card--active" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center;">
        <div class="fullscreen-card__counter" style="position: absolute; top: 16px; left: 16px; padding: 8px 16px; background: rgba(0, 0, 0, 0.8); border-radius: 9999px; font-size: 14px; color: #999;">1 / 6</div>
        
        <button class="fullscreen-card__close" aria-label="Close" style="position: absolute; top: 16px; right: 16px; width: 44px; height: 44px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; font-size: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
        
        <button class="fullscreen-card__nav fullscreen-card__nav--prev" aria-label="Previous" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button class="fullscreen-card__nav fullscreen-card__nav--next" aria-label="Next" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <div class="fullscreen-card__content" style="padding: 24px;">
          <img class="fullscreen-card__media" src="https://picsum.photos/1000/800" alt="Fullscreen image" style="max-width: 100%; max-height: calc(1024px - 120px); width: auto; height: auto; object-fit: contain; border-radius: 8px;" />
        </div>
        
        <div class="fullscreen-card__thumbnails" style="position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; padding: 12px; background: rgba(0, 0, 0, 0.8); border-radius: 12px; max-width: 90%;">
          <div class="fullscreen-card__thumbnail fullscreen-card__thumbnail--active" style="width: 56px; height: 56px; border-radius: 8px; overflow: hidden; border: 2px solid #d4af37;">
            <img src="https://picsum.photos/100/100?random=1" alt="Thumb 1" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 56px; height: 56px; border-radius: 8px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=2" alt="Thumb 2" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 56px; height: 56px; border-radius: 8px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=3" alt="Thumb 3" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="fullscreen-card__thumbnail" style="width: 56px; height: 56px; border-radius: 8px; overflow: hidden; opacity: 0.6;">
            <img src="https://picsum.photos/100/100?random=4" alt="Thumb 4" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '**Tablet View** shows fullscreen card on tablet viewport (iPad: 768x1024px). Medium-sized navigation (48px) and thumbnails (56px).',
      },
    },
  },
};
