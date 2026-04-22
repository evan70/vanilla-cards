/**
 * Fullscreen Manager
 *
 * Handles fullscreen gallery experience with:
 * - Keyboard navigation (ESC, Arrow keys)
 * - Touch gestures for mobile
 * - Image zoom on drag
 * - Thumbnail navigation
 */

export const FullscreenManager = {
  /** @type {HTMLElement|null} */
  activeCard: null,

  /** @type {number} */
  currentIndex: 0,

  /** @type {Array<{src: string, alt: string, caption?: string}>} */
  images: [],

  /** @type {boolean} */
  isZoomed: false,

  /**
   * Initialize fullscreen manager
   */
  init() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Touch gestures
    this.initTouchGestures();

    console.log('[FullscreenManager] Initialized ✓');
  },

  /**
   * Enter fullscreen mode
   * @param {string} cardId - Card element ID
   * @param {Array<{src: string, alt: string, caption?: string}>} images - Image array
   * @param {number} startIndex - Starting image index
   */
  enterFullscreen(cardId, images, startIndex = 0) {
    const card = document.getElementById(cardId);
    if (!card) {
      console.error(`[FullscreenManager] Card ${cardId} not found`);
      return;
    }

    this.activeCard = card;
    this.images = images;
    this.currentIndex = startIndex;
    this.isZoomed = false;

    // Show card
    card.classList.add('card--fullscreen--active');
    card.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Load image
    this.loadImage(this.currentIndex);

    // Update counter
    this.updateCounter();

    // Focus close button for accessibility
    const closeBtn = card.querySelector('.card--fullscreen__close');
    if (closeBtn) {
      closeBtn.focus();
    }

    console.log(`[FullscreenManager] Entered fullscreen with ${images.length} images`);
  },

  /**
   * Exit fullscreen mode
   */
  exitFullscreen() {
    if (!this.activeCard) return;

    this.activeCard.classList.remove('card--fullscreen--active');
    this.activeCard.setAttribute('hidden', '');
    document.body.style.overflow = '';

    // Reset state
    this.activeCard = null;
    this.images = [];
    this.currentIndex = 0;
    this.isZoomed = false;

    console.log('[FullscreenManager] Exited fullscreen');
  },

  /**
   * Load image at index
   * @param {number} index - Image index
   */
  loadImage(index) {
    if (!this.activeCard || index < 0 || index >= this.images.length) return;

    const content = this.activeCard.querySelector('.card--fullscreen__content');
    if (!content) return;

    // Show loader
    this.showLoader(content);

    const image = this.images[index];

    // Create image element
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt || '';
    img.className = 'card--fullscreen__media';

    // Handle load
    img.onload = () => {
      this.hideLoader();
      content.innerHTML = '';
      content.appendChild(img);
      this.updateCaption(image);
      this.updateNavigation();
    };

    img.onerror = () => {
      this.hideLoader();
      console.error(`[FullscreenManager] Failed to load image: ${image.src}`);
    };

    // Add drag to zoom functionality
    this.initImageZoom(img);
  },

  /**
   * Show loader in content area
   * @param {HTMLElement} content - Content element
   */
  showLoader(content) {
    const loader = document.createElement('div');
    loader.className = 'card--fullscreen__loader';
    content.innerHTML = '';
    content.appendChild(loader);
  },

  /**
   * Hide loader
   */
  hideLoader() {
    const loader = this.activeCard?.querySelector('.card--fullscreen__loader');
    if (loader) {
      loader.remove();
    }
  },

  /**
   * Go to next image
   */
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.loadImage(this.currentIndex);
    }
  },

  /**
   * Go to previous image
   */
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadImage(this.currentIndex);
    }
  },

  /**
   * Go to specific image
   * @param {number} index - Image index
   */
  goToImage(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.loadImage(this.currentIndex);
    }
  },

  /**
   * Update counter display
   */
  updateCounter() {
    const counter = this.activeCard?.querySelector('.card--fullscreen__counter');
    if (counter) {
      counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
  },

  /**
   * Update caption
   * @param {{caption?: string}} image - Image data
   */
  updateCaption(image) {
    const captionEl = this.activeCard?.querySelector('.card--fullscreen__caption');
    if (!captionEl || !image.caption) return;

    captionEl.innerHTML = `
      <p class="card--fullscreen__caption-title">${image.caption}</p>
    `;
    captionEl.style.display = 'block';
  },

  /**
   * Update navigation buttons state
   */
  updateNavigation() {
    const prevBtn = this.activeCard?.querySelector('.card--fullscreen__nav--prev');
    const nextBtn = this.activeCard?.querySelector('.card--fullscreen__nav--next');

    if (prevBtn) {
      prevBtn.disabled = this.currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = this.currentIndex === this.images.length - 1;
    }

    // Update thumbnails
    this.updateThumbnails();
  },

  /**
   * Update thumbnail active state
   */
  updateThumbnails() {
    const thumbnails = this.activeCard?.querySelectorAll('.card--fullscreen__thumbnail');
    if (!thumbnails) return;

    thumbnails.forEach((thumb, index) => {
      if (index === this.currentIndex) {
        thumb.classList.add('card--fullscreen__thumbnail--active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('card--fullscreen__thumbnail--active');
      }
    });
  },

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboard(e) {
    if (!this.activeCard) return;

    switch (e.key) {
      case 'Escape':
        this.exitFullscreen();
        break;
      case 'ArrowLeft':
        if (!this.isZoomed) {
          this.prevImage();
        }
        break;
      case 'ArrowRight':
        if (!this.isZoomed) {
          this.nextImage();
        }
        break;
      case 'Home':
        if (!this.isZoomed) {
          this.goToImage(0);
        }
        break;
      case 'End':
        if (!this.isZoomed) {
          this.goToImage(this.images.length - 1);
        }
        break;
    }
  },

  /**
   * Initialize touch gestures for mobile
   */
  initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (!this.activeCard) return;

      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },

  /**
   * Handle swipe gesture
   * @param {number} startX - Start X position
   * @param {number} endX - End X position
   */
  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;

    if (Math.abs(diff) < threshold) return;

    if (diff > threshold) {
      // Swipe left - next image
      this.nextImage();
    } else {
      // Swipe right - previous image
      this.prevImage();
    }
  },

  /**
   * Initialize image zoom on drag
   * @param {HTMLImageElement} img - Image element
   */
  initImageZoom(img) {
    let isDragging = false;
    let startX = 0;
    let translateX = 0;
    let translateY = 0;

    const onStart = (e) => {
      isDragging = true;
      startX = e.clientX || e.touches?.[0]?.clientX || 0;
      img.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!isDragging) return;

      const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
      const diff = currentX - startX;
      translateX = diff;

      img.style.transform = `translateX(${translateX}px) scale(1.5)`;
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      // Reset position
      img.style.transform = 'translateX(0) scale(1)';
      img.style.cursor = 'grab';

      // Navigate if swiped enough
      const threshold = 100;
      if (translateX > threshold) {
        this.prevImage();
      } else if (translateX < -threshold) {
        this.nextImage();
      }

      translateX = 0;
    };

    // Mouse events
    img.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    // Touch events
    img.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FullscreenManager.init());
} else {
  FullscreenManager.init();
}

// Export for external use
if (typeof window !== 'undefined') {
  window.FullscreenManager = FullscreenManager;
}

console.log('[FullscreenManager] Loaded');
