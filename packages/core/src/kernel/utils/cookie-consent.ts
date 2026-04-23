/**
 * Cookie Consent — unified with NotificationCard system.
 *
 * Moved from entry-points/cookie-consent.ts.
 */

import NotificationCard from '@components/notification-card';

export interface CookieConsentMessages {
  accept: {
    title: string;
    message: string;
    icon: string;
  };
  decline: {
    title: string;
    message: string;
    icon: string;
  };
}

export class CookieConsent {
  accepted = false;
  cardId = '';
  cardElement: HTMLElement | null = null;
  initDelay = 300;

  readonly messages: CookieConsentMessages = {
    accept: {
      title: '✓ Ďakujeme!',
      message:
        'Ďakujeme za dôveru! <a href="/docs/cookies" target="_blank" rel="noopener noreferrer">Zásady používania cookies</a>',
      icon: 'success',
    },
    decline: {
      title: 'Rozumieme',
      message:
        'Nepoužívame tracking cookies. <a href="/docs/privacy" target="_blank" rel="noopener noreferrer">Zásady ochrany súkromia</a>',
      icon: 'info',
    },
  };

  /**
   * Check if consent already given (cookie exists).
   */
  hasConsent(): boolean {
    return document.cookie.includes('cookie-consent=');
  }

  /**
   * Show cookie consent notification.
   */
  show(): void {
    if (this.hasConsent()) {
      return;
    }

    this.cardId = NotificationCard.show({
      type: 'cookie',
      priority: 1,
      title: 'Nastavenie Cookies',
      message:
        'Táto stránka používa cookies na zlepšenie používateľského zážitku. <a href="/docs/cookies" target="_blank" rel="noopener noreferrer">Viac o cookies</a>',
      autoHide: false,
      icon: 'cookie',
      actions: [
        { label: 'Odmietnuť', variant: 'secondary', onClick: () => this.decline() },
        { label: 'Prijať všetky', variant: 'primary', onClick: () => this.accept() },
      ],
    });
  }

  /**
   * Initialize — check consent and show if not given.
   */
  init(): void {
    if (this.hasConsent()) {
      return;
    }

    setTimeout(() => this.show(), this.initDelay);
  }

  /**
   * Accept cookies.
   */
  async accept(): Promise<void> {
    await this.submitConsent(true);
    this.accepted = true;

    const card = this.getCardElement();
    if (card) {
      NotificationCard.updateContent(card, this.messages.accept);
      setTimeout(() => NotificationCard.dismiss(card), 3000);
    }

    this.emit('consent:accepted');
  }

  /**
   * Decline cookies.
   */
  async decline(): Promise<void> {
    await this.submitConsent(false);
    this.accepted = false;

    const card = this.getCardElement();
    if (card) {
      NotificationCard.updateContent(card, this.messages.decline);
      setTimeout(() => NotificationCard.dismiss(card), 4000);
    }

    this.emit('consent:declined');
  }

  /**
   * Submit consent to server.
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

      const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

      const response = await fetch('/api/cookie/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
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
  }

  /**
   * Get the card DOM element.
   */
  getCardElement(): HTMLElement | null {
    if (this.cardId) {
      const card = document.querySelector(`[data-notification-id="${this.cardId}"]`);
      if (card) return card as HTMLElement;
    }

    const cookieCard = document.querySelector('.card--notification--cookie');
    return cookieCard as HTMLElement | null;
  }

  /**
   * Emit custom event.
   */
  emit(event: string, data?: unknown): void {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  /**
   * Get current consent status.
   */
  getConsent(): boolean {
    return this.accepted;
  }
}
