/**
 * Cookie Consent - Vanilla Cards Entry Point
 *
 * Integrated with NotificationCard system for unified glassmorphic display.
 * Server-side rendered cookie consent with client-side interactions.
 */

import { NotificationCard } from '@vc/core';

/**
 * Cookie consent functionality
 */
const CookieConsent = {
  /** Whether consent has been given */
  accepted: false,

  /** Notification card ID */
  cardId: '',

  /** Notification card element */
  cardElement: null as HTMLElement | null,

  /** Initialization delay (ms) */
  initDelay: 300,

  /** Thank you messages */
  messages: {
    accept: {
      title: '✓ Ďakujeme!',
      message: 'Ďakujeme za dôveru! <a href="/docs/cookies" target="_blank" rel="noopener noreferrer">Zásady používania cookies</a>',
      icon: 'success',
    },
    decline: {
      title: 'Rozumieme',
      message: 'Nepoužívame tracking cookies. <a href="/docs/privacy" target="_blank" rel="noopener noreferrer">Zásady ochrany súkromia</a>',
      icon: 'info',
    },
  },

  /**
   * Initialize cookie consent
   */
  init(): void {
    // Check if already decided
    if (this.hasConsent()) {
      console.info('[CookieConsent] Already decided ✓');
      return;
    }

    // Show after short delay
    setTimeout(() => this.show(), this.initDelay);

    console.info('[CookieConsent] Initialized ✓');
  },

  /**
   * Check if consent already given
   */
  hasConsent(): boolean {
    return document.cookie.includes('cookie-consent=');
  },

  /**
   * Show cookie consent notification
   */
  show(): void {
    // Check again in case it was set during delay
    if (this.hasConsent()) {
      return;
    }

    // Use NotificationCard system
    this.cardId = NotificationCard.show({
      type: 'cookie',
      priority: 1, // Highest priority
      title: 'Nastavenie Cookies',
      message: 'Táto stránka používa cookies na zlepšenie používateľského zážitku. <a href="/docs/cookies" target="_blank" rel="noopener noreferrer">Viac o cookies</a>',
      autoHide: false, // No auto-hide for cookie consent
      icon: 'cookie',
      actions: [
        {
          label: 'Odmietnuť',
          variant: 'secondary',
          onClick: () => this.decline(),
        },
        {
          label: 'Prijať všetky',
          variant: 'primary',
          onClick: () => this.accept(),
        },
      ],
    });

    console.log('[CookieConsent] Showing banner');
  },

  /**
   * Get card element by ID
   */
  getCardElement(): HTMLElement | null {
    // Try by data-notification-id first
    if (this.cardId) {
      const card = document.querySelector(`[data-notification-id="${this.cardId}"]`);
      if (card) {
        return card as HTMLElement;
      }
    }
    
    // Fallback: find the first cookie notification card
    const cookieCard = document.querySelector('.card--notification--cookie');
    if (cookieCard) {
      return cookieCard as HTMLElement;
    }
    
    console.error('[CookieConsent] Card element not found!');
    return null;
  },

  /**
   * Accept cookies
   */
  async accept(): Promise<void> {
    await this.submitConsent(true);
    this.accepted = true;

    // Get card element and update content
    const card = this.getCardElement();
    if (card) {
      NotificationCard.updateContent(card, this.messages.accept);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        NotificationCard.dismiss(card);
      }, 3000);
    }

    this.emit('consent:accepted');
    console.log('[CookieConsent] Accepted ✓');
  },

  /**
   * Decline cookies
   */
  async decline(): Promise<void> {
    await this.submitConsent(false);
    this.accepted = false;

    // Get card element and update content
    const card = this.getCardElement();
    if (card) {
      NotificationCard.updateContent(card, this.messages.decline);

      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        NotificationCard.dismiss(card);
      }, 4000);
    }

    this.emit('consent:declined');
    console.log('[CookieConsent] Declined ✗');
  },

  /**
   * Submit consent to server
   */
  async submitConsent(accepted: boolean): Promise<void> {
    // 1. Always set cookie client-side so the UI works immediately
    document.cookie = `cookie-consent=${accepted}; Path=/; Max-Age=31536000; SameSite=Lax`;

    // 2. Try to sync with server if available
    try {
      // Skip if on GitHub Pages or other known static hosts without API
      if (window.location.hostname.endsWith('github.io')) {
        return;
      }

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const response = await fetch('/api/cookie/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({ accepted }),
      });

      if (!response.ok) {
        // Silently fail for 404/405 as it just means the API is not there (static deployment)
        if (response.status === 404 || response.status === 405) {
          return;
        }
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      // Non-critical error, just log as warning
      console.warn('[CookieConsent] Server sync failed:', error);
    }
  },

  /**
   * Emit custom event
   */
  emit(event: string, data?: any): void {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  },

  /**
   * Get current consent status
   */
  getConsent(): boolean {
    return this.accepted;
  },
};

// Export for external use
export { CookieConsent };
