/**
 * CardManager - Lifecycle management for vanilla cards
 *
 * Handles initialization, auto-refresh for stats cards,
 * HTMX integration for action cards, and card state management.
 *
 * @usage
 *   Cards are auto-initialized on DOM ready via data attributes:
 *   <div class="card" data-card-type="stats" data-card-id="stat-1" data-card-refresh="/api/stats" data-card-refresh-interval="30000">
 */

export const CardManager = {
  /** @type {Map<string, {type: string, el: HTMLElement, config: object}>} */
  cards: new Map(),

  /**
   * Initialize all cards on the page
   */
  init() {
    console.log('[CardManager] Initializing...');

    document.querySelectorAll('[data-card-type]').forEach((el) => {
      const type = /** @type {string} */ (el.dataset.cardType);
      const id = /** @type {string} */ (el.dataset.cardId || el.id);

      if (!id) {
        console.warn('[CardManager] Card missing data-card-id or id attribute', el);
        return;
      }

      this.initCard(el, type, id);
    });

    console.log(`[CardManager] Initialized ${this.cards.size} cards`);
  },

  /**
   * Initialize a single card based on type
   * @param {HTMLElement} el - Card element
   * @param {string} type - Card type (stats, action, content)
   * @param {string} id - Card ID
   */
  initCard(el, type, id) {
    const config = {
      refreshUrl: el.dataset.cardRefresh,
      refreshInterval: parseInt(el.dataset.cardRefreshInterval || '30000', 10),
      actionUrl: el.dataset.cardAction,
    };

    console.log(`[CardManager] Initializing ${type} card: ${id}`);

    switch (type) {
      case 'stats':
        this.initStatsCard(el, id, config);
        break;
      case 'action':
        this.initActionCard(el, id, config);
        break;
      case 'content':
        this.initContentCard(el, id, config);
        break;
      default:
        console.warn(`[CardManager] Unknown card type: ${type}`);
    }

    this.cards.set(id, { type, el, config });
  },

  /**
   * Initialize stats card with auto-refresh
   * @param {HTMLElement} el - Card element
   * @param {string} id - Card ID
   * @param {object} config - Card configuration
   */
  initStatsCard(el, id, config) {
    // Check if this is a specialized <stats-card> web component
    const isWebComponent = el.tagName.toLowerCase() === 'stats-card';

    if (isWebComponent && typeof el.refresh === 'function') {
      // Use component's built-in auto-refresh
      if (config.refreshUrl) {
        el.setAttribute('refresh-url', config.refreshUrl);
      }
      if (config.refreshInterval) {
        el.setAttribute('refresh-interval', String(config.refreshInterval));
      }
      console.log(`[CardManager] Stats card ${id} using component auto-refresh`);
    } else {
      // Fall back to manual auto-refresh for legacy HTML cards
      console.log(`[CardManager] Stats card ${id} will refresh every ${config.refreshInterval}ms`);

      if (config.refreshUrl) {
        this.startAutoRefresh(id, config.refreshUrl, config.refreshInterval);
      }
    }
  },

  /**
   * Start auto-refresh interval for a card
   * @param {string} id - Card ID
   * @param {string} url - Refresh URL
   * @param {number} interval - Refresh interval in ms
   */
  startAutoRefresh(id, url, interval) {
    const timerId = setInterval(() => {
      this.refreshCard(id, url);
    }, interval);

    // Store timer ID for potential cleanup
    const card = this.cards.get(id);
    if (card) {
      card.timerId = timerId;
      this.cards.set(id, card);
    }
  },

  /**
   * Refresh card data from server
   * @param {string} id - Card ID
   * @param {string} url - Refresh URL
   */
  async refreshCard(id, url) {
    const card = this.cards.get(id);
    if (!card) {
      console.warn(`[CardManager] Card ${id} not found`);
      return;
    }

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      // Prefer specialized web component API if available
      if (card.el.tagName.toLowerCase() === 'stats-card' && typeof card.el.refresh === 'function') {
        // Use StatsCard component API
        card.el.updateFromData(data);
      } else {
        // Fall back to DOM manipulation for legacy HTML-only cards
        this.updateStatsCard(card.el, data);
      }

      console.log(`[CardManager] Refreshed card ${id}`);
    } catch (error) {
      console.error(`[CardManager] Refresh failed for ${id}:`, error);
      this.setCardError(card.el, 'Failed to refresh');
    }
  },

  /**
   * Update stats card with new data
   * @param {HTMLElement} el - Card element
   * @param {object} data - New data from server
   */
  updateStatsCard(el, data) {
    if (data.value) {
      const valueEl = el.querySelector('.stats-card__value');
      if (valueEl) {
        valueEl.textContent = data.value;
      }
    }

    if (data.trend) {
      const trendEl = el.querySelector('.stats-card__change');
      if (trendEl) {
        trendEl.textContent = data.trend;
        trendEl.classList.remove('stats-card__change--positive', 'stats-card__change--negative', 'stats-card__change--neutral');

        if (data.trend.startsWith('+')) {
          trendEl.classList.add('stats-card__change--positive');
        } else if (data.trend.startsWith('-')) {
          trendEl.classList.add('stats-card__change--negative');
        } else {
          trendEl.classList.add('stats-card__change--neutral');
        }
      }
    }
  },

  /**
   * Initialize action card with HTMX
   * @param {HTMLElement} el - Card element
   * @param {string} id - Card ID
   * @param {object} config - Card configuration
   */
  initActionCard(el, id, config) {
    console.log(`[CardManager] Action card ${id} initialized with HTMX`);

    // HTMX handles form submission automatically via hx-post attributes
    // This method is here for future enhancements
  },

  /**
   * Initialize content card
   * @param {HTMLElement} el - Card element
   * @param {string} id - Card ID
   * @param {object} config - Card configuration
   */
  initContentCard(el, id, config) {
    console.log(`[CardManager] Content card ${id} initialized`);

    // Lazy load images in content cards
    this.initLazyImages(el);
  },

  /**
   * Initialize lazy loading for images in a card
   * @param {HTMLElement} el - Card element
   */
  initLazyImages(el) {
    const images = el.querySelectorAll('img[data-src], img[data-srcset]');

    if (images.length === 0) return;

    // Use IntersectionObserver for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target;

        // Load image
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }

        // Remove lazy class and add loaded class
        img.classList.remove('lazy');
        img.classList.add('loaded');

        // Stop observing
        observer.unobserve(img);
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before visible
      threshold: 0.01,
    });

    images.forEach((img) => imageObserver.observe(img));
  },

  /**
   * Set card error state
   * @param {HTMLElement} el - Card element
   * @param {string} message - Error message
   */
  setCardError(el, message) {
    el.classList.add('card--error');

    const errorEl = document.createElement('div');
    errorEl.className = 'card__error-message';
    errorEl.textContent = message;

    const existingError = el.querySelector('.card__error-message');
    if (!existingError) {
      el.appendChild(errorEl);
    }
  },

  /**
   * Remove card error state
   * @param {HTMLElement} el - Card element
   */
  clearCardError(el) {
    el.classList.remove('card--error');

    const errorEl = el.querySelector('.card__error-message');
    if (errorEl) {
      errorEl.remove();
    }
  },

  /**
   * Get card by ID
   * @param {string} id - Card ID
   * @returns {{type: string, el: HTMLElement, config: object}|undefined}
   */
  get(id) {
    return this.cards.get(id);
  },

  /**
   * Get all cards
   * @returns {Array<{type: string, el: HTMLElement, config: object}>}
   */
  getAll() {
    return Array.from(this.cards.values());
  },

  /**
   * Get cards by type
   * @param {string} type - Card type
   * @returns {Array<{type: string, el: HTMLElement, config: object}>}
   */
  getByType(type) {
    return this.getAll().filter((card) => card.type === type);
  },

  /**
   * Destroy a card (cleanup)
   * @param {string} id - Card ID
   */
  destroy(id) {
    const card = this.cards.get(id);
    if (card && card.timerId) {
      clearInterval(card.timerId);
    }
    this.cards.delete(id);
    console.log(`[CardManager] Destroyed card ${id}`);
  },

  /**
   * Destroy all cards
   */
  destroyAll() {
    this.cards.forEach((card, id) => {
      this.destroy(id);
    });
    console.log('[CardManager] Destroyed all cards');
  },
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CardManager.init());
} else {
  CardManager.init();
}

// Expose globally
if (typeof window !== 'undefined') {
  window.CardManager = CardManager;
}

console.log('[CardManager] Loaded');
