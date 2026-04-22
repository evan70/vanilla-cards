/**
 * HTMX Card Extension
 *
 * Provides card-specific HTMX extensions for handling:
 * - Loading states
 * - Error handling
 * - Response processing
 *
 * @usage
 *   <form hx-post="/api/action" hx-ext="card" data-card-id="form-1">
 */

(function () {
  // Wait for HTMX to be available
  function initWhenReady() {
    if (typeof window.htmx === 'undefined') {
      // HTMX not loaded yet, wait and try again
      setTimeout(initWhenReady, 50);
      return;
    }

    initExtension();
  }

  /**
   * Initialize HTMX card extension
   */
  function initExtension() {
    /**
     * Show loading state on card
     * @param {HTMLElement} card - Card element
     */
    function showLoading(card) {
      card.classList.add('card--loading');
    }

  /**
   * Hide loading state on card
   * @param {HTMLElement} card - Card element
   */
  function hideLoading(card) {
    card.classList.remove('card--loading');
  }

  /**
   * Show success message on card
   * @param {HTMLElement} card - Card element
   * @param {string} message - Success message
   */
  function showSuccess(card, message) {
    // Remove any existing messages
    clearMessages(card);

    const successEl = document.createElement('div');
    successEl.className = 'action-card__success';
    successEl.textContent = message;

    const body = card.querySelector('.action-card__body') || card.querySelector('.card__body');
    if (body) {
      body.appendChild(successEl);
    }
  }

  /**
   * Show error message on card
   * @param {HTMLElement} card - Card element
   * @param {string} message - Error message
   */
  function showError(card, message) {
    // Remove any existing messages
    clearMessages(card);

    card.classList.add('card--error');

    const errorEl = document.createElement('div');
    errorEl.className = 'action-card__error';
    errorEl.textContent = message;

    const body = card.querySelector('.action-card__body') || card.querySelector('.card__body');
    if (body) {
      body.appendChild(errorEl);
    }
  }

  /**
   * Clear all messages from card
   * @param {HTMLElement} card - Card element
   */
  function clearMessages(card) {
    card.classList.remove('card--error');

    const existingMessages = card.querySelectorAll('.action-card__success, .action-card__error, .card__error-message');
    existingMessages.forEach((el) => el.remove());
  }

  /**
   * Find closest card element
   * @param {HTMLElement} el - Starting element
   * @returns {HTMLElement|null}
   */
  function findCard(el) {
    return el.closest('[data-card-type], .card');
  }

  // Define HTMX extension
  htmx.defineExtension('card', {
    /**
     * Called when an event is triggered
     * @param {string} name - Event name
     * @param {Event} evt - Event object
     */
    onEvent: function (name, evt) {
      const card = findCard(evt.detail.elt);
      if (!card) return;

      switch (name) {
        case 'htmx:beforeRequest':
          showLoading(card);
          break;

        case 'htmx:afterRequest':
          hideLoading(card);

          const xhr = evt.detail.xhr;
          const isSuccess = xhr.status >= 200 && xhr.status < 300;

          if (isSuccess) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.success) {
                showSuccess(card, response.message || 'Success!');
              } else if (response.error) {
                showError(card, response.error);
              }
            } catch (e) {
              // Not JSON, check for redirect or HTML response
              if (xhr.status === 200) {
                showSuccess(card, 'Request completed');
              }
            }
          } else {
            showError(card, `Error: ${xhr.status} ${xhr.statusText}`);
          }
          break;

        case 'htmx:beforeOnLoad':
          // Can modify response before it's swapped
          break;

        case 'htmx:responseError':
          hideLoading(card);
          showError(card, 'Network error');
          break;

        case 'htmx:timeout':
          hideLoading(card);
          showError(card, 'Request timed out');
          break;
      }
    },
  });

  console.log('[HTMX Card Extension] Loaded');
}

  // Start initialization
  initWhenReady();
})();
