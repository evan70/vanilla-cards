
/**
 * Gallery Card Component
 *
 * Grid/Masonry gallery with lightbox support
 *
 * Features:
 * - Responsive auto-fill grid
 * - Masonry (Pinterest-style) layout
 * - Hover overlays with title/meta
 * - Action buttons (favorite, expand)
 * - Lightbox integration via FullscreenManager
 *
 * @example
 * ```html
 * <div class="card card--gallery">
 *   <div class="gallery__grid">
 *     <div class="gallery__item">
 *       <img class="gallery__image" src="image.jpg" alt="Gallery" />
 *       <div class="gallery__overlay">
 *         <h4 class="gallery__overlay-title">Title</h4>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * ```
 */

export class GalleryCard {
  /**
   * Initialize gallery card
   * - Sets up hover effects
   * - Initializes lightbox on click
   */
  static init(element: HTMLElement): void {
    const items = element.querySelectorAll('.gallery__item');

    (items as NodeListOf<HTMLElement>).forEach((item) => {
      const image = item.querySelector('.gallery__image');

      // Handle click for lightbox
      item.addEventListener('click', () => {
        if (image) {
          this.openLightbox(image.getAttribute('src') || '', item);
        }
      });

      // Handle keyboard navigation
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (image) {
            this.openLightbox(image.getAttribute('src') || '', item);
          }
        }
      });
    });
  }

  /**
   * Open lightbox for image
   */
  private static openLightbox(src: string, trigger: Element): void {
    // Import FullscreenManager dynamically
    // @ts-ignore - dynamic import of JS file
    import('../lib/fullscreen-manager.js').then(({ FullscreenManager }) => {
      const images = [
        { src, alt: trigger.querySelector('.gallery__overlay-title')?.textContent || '' }
      ];
      FullscreenManager.enterFullscreen('lightbox', images, 0);
    });
  }

  /**
   * Destroy gallery card instance
   */
  static destroy(element: HTMLElement): void {
    const items = element.querySelectorAll('.gallery__item');
    items.forEach((item) => {
      item.removeAttribute('tabindex');
    });
  }
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card--gallery').forEach((card) => {
      GalleryCard.init(card as HTMLElement);
    });
  });
}

export default GalleryCard;
