import { escapeHtml } from '../lib/escape-html';

/**
 * Notification Card Component
 *
 * Unified glassmorphic notification card system for cookies, alerts, and messages.
 * Supports priority-based animation queue, zoom-in animations, and auto-hide.
 *
 * Features:
 * - Glassmorphic design with backdrop blur
 * - Zoom-in animation (bottom-right position)
 * - Priority-based queue (lower number = higher priority)
 * - Auto-hide for notifications (configurable)
 * - No auto-hide for cookie consent
 * - Dark theme support
 * - Accessible (ARIA live regions, keyboard support)
 *
 * @example
 * ```typescript
 * // Show cookie consent (priority 1, no auto-hide)
 * NotificationCard.show({
 *   type: 'cookie',
 *   priority: 1,
 *   title: 'Nastavenie Cookies',
 *   message: 'Táto stránka používa cookies...',
 *   actions: [
 *     { label: 'Odmietnuť', variant: 'secondary', onClick: () => {...} },
 *     { label: 'Prijať', variant: 'primary', onClick: () => {...} }
 *   ]
 * });
 *
 * // Show notification (priority 2, auto-hide 5s)
 * NotificationCard.show({
 *   type: 'success',
 *   priority: 2,
 *   message: 'Správa bola odoslaná!',
 *   autoHide: 5000
 * });
 * ```
 */

export type NotificationType = 'cookie' | 'success' | 'error' | 'warning' | 'info';

export interface NotificationAction {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void | Promise<void>;
}

export interface NotificationCardOptions {
  type: NotificationType;
  priority: number; // 1 = highest priority
  title?: string;
  message: string;
  actions?: NotificationAction[];
  autoHide?: number | false; // milliseconds, false = no auto-hide
  icon?: 'check' | 'error' | 'warning' | 'info' | 'cookie';
}

/**
 * Notification Card Manager
 */
export const NotificationCard = {
  /** Container element */
  container: null as HTMLElement | null,

  /** Maximum visible cards */
  maxVisible: 3,

  /** Queue of pending notifications */
  queue: [] as Array<NotificationCardOptions & { id: string }>,

  /** Visible cards */
  visible: [] as Array<HTMLElement>,

  /**
   * Initialize notification system
   */
  init(): void {
    this.createContainer();
    console.info('[NotificationCard] Initialized ✓');
  },

  /**
   * Create fixed container (bottom-right)
   */
  createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'notificationCards';
    this.container.className = 'card--notifications-container';
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(this.container);
  },

  /**
   * Show a notification card
   */
  show(options: NotificationCardOptions): string {
    const id = this.generateId();
    const cardOptions = { ...options, id };

    // Add to queue
    this.queue.push(cardOptions);

    // Sort by priority (lower number = higher priority)
    this.queue.sort((a, b) => a.priority - b.priority);

    // Process queue
    this.processQueue();

    return id;
  },

  /**
   * Process notification queue
   */
  processQueue(): void {
    // If we have space and items in queue, show next
    while (this.visible.length < this.maxVisible && this.queue.length > 0) {
      const options = this.queue.shift();
      if (options) {
        this.renderCard(options);
      }
    }
  },

  /**
   * Render a notification card
   */
  renderCard(options: NotificationCardOptions & { id: string }): void {
    const card = document.createElement('div');
    card.id = `notification-${options.id}`;
    card.className = `card--notification card--notification--${options.type}`;
    card.setAttribute('role', 'alert');
    card.setAttribute('data-notification-id', options.id);

    // Build card HTML
    card.innerHTML = this.buildCardHTML(options);

    // Insert at beginning (newest first)
    if (this.container?.firstChild) {
      this.container.insertBefore(card, this.container.firstChild);
    } else {
      this.container?.appendChild(card);
    }

    // Add to visible list
    this.visible.push(card);

    // Trigger zoom-in animation after short delay
    requestAnimationFrame(() => {
      card.classList.remove('card--notification--hidden');
    });

    // Setup auto-hide
    if (options.autoHide && options.autoHide > 0) {
      setTimeout(() => this.dismiss(card), options.autoHide);
    }

    // Setup event listeners
    this.setupCardListeners(card, options);

    console.log(`[NotificationCard] Showed: ${options.type} (priority: ${options.priority})`);
  },

  /**
   * Build card HTML
   */
  buildCardHTML(options: NotificationCardOptions & { id: string }): string {
    const icon = this.getIcon(options.type, options.icon);
    const hasActions = options.actions && options.actions.length > 0;

    return `
      <div class="card--notification__content">
        ${options.title ? `<h3 class="card--notification__title">${escapeHtml(options.title)}</h3>` : ''}
        <div class="card--notification__body">
          ${icon ? `<span class="card--notification__icon" aria-hidden="true">${icon}</span>` : ''}
          <p class="card--notification__message">${escapeHtml(options.message)}</p>
        </div>
        ${hasActions ? `
          <div class="card--notification__actions">
            ${options.actions!.map((action, index) => `
              <button
                type="button"
                class="btn btn--${action.variant} card--notification__action"
                data-action-index="${index}"
              >
                ${escapeHtml(action.label)}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <button
        type="button"
        class="card--notification__close"
        aria-label="Close notification"
        data-close
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
  },

  /**
   * Get icon SVG for notification type
   */
  getIcon(type: NotificationType, customIcon?: string): string {
    const iconType = customIcon || type;

    const icons: Record<string, string> = {
      cookie: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1.5" fill="white"/><circle cx="15" cy="8" r="1.5" fill="white"/><circle cx="9" cy="15" r="1.5" fill="white"/><circle cx="16" cy="14" r="1.5" fill="white"/></svg>`,
      success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    };

    return icons[iconType] || '';
  },

  /**
   * Setup card event listeners
   */
  setupCardListeners(card: HTMLElement, options: NotificationCardOptions & { id: string }): void {
    // Close button
    const closeBtn = card.querySelector('[data-close]');
    closeBtn?.addEventListener('click', () => this.dismiss(card));

    // Action buttons
    const actionButtons = card.querySelectorAll('[data-action-index]');
    actionButtons.forEach((btn) => {
      const index = parseInt((btn as HTMLElement).dataset.actionIndex || '0', 10);
      const action = options.actions?.[index];

      if (action) {
        btn.addEventListener('click', async () => {
          // Call action handler
          await action.onClick();

          // Dismiss card after action (unless it's cookie consent)
          if (options.type !== 'cookie') {
            this.dismiss(card);
          }
        });
      }
    });

    // Keyboard support (Escape to dismiss)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && options.type !== 'cookie') {
        this.dismiss(card);
      }
    });
  },

  /**
   * Update card content with smooth transition
   */
  updateContent(card: HTMLElement, options: { title?: string; message: string; icon?: string }): void {
    const contentEl = card.querySelector('.card--notification__content');
    if (!contentEl) return;

    // Fade out
    contentEl.classList.add('card--notification__content--fading');

    // Wait for fade out, then update content
    setTimeout(() => {
      const icon = options.icon ? this.getIcon(options.icon as NotificationType, options.icon) : '';
      
      contentEl.innerHTML = `
        ${options.title ? `<h3 class="card--notification__title">${escapeHtml(options.title)}</h3>` : ''}
        <div class="card--notification__body">
          ${icon ? `<span class="card--notification__icon" aria-hidden="true">${icon}</span>` : ''}
          <p class="card--notification__message">${escapeHtml(options.message)}</p>
        </div>
      `;

      // Fade in
      contentEl.classList.remove('card--notification__content--fading');
      contentEl.classList.add('card--notification__content--fading-in');

      // Remove fade-in class after animation
      setTimeout(() => {
        contentEl.classList.remove('card--notification__content--fading-in');
      }, 300);
    }, 300);
  },

  /**
   * Dismiss a notification card
   */
  dismiss(card: HTMLElement): void {
    if (!card || !this.container) return;

    // Add dismiss animation
    card.classList.add('card--notification--dismissing');

    // Wait for animation to complete
    setTimeout(() => {
      card.remove();

      // Remove from visible list
      this.visible = this.visible.filter((c) => c !== card);

      // Process queue to show next card
      this.processQueue();

      console.log('[NotificationCard] Dismissed');
    }, 300);
  },

  /**
   * Generate unique ID
   */
  generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Get visible count
   */
  getVisibleCount(): number {
    return this.visible.length;
  },

  /**
   * Get queue count
   */
  getQueueCount(): number {
    return this.queue.length;
  },

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.visible.forEach((card) => card.remove());
    this.visible = [];
    this.queue = [];
  },
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => NotificationCard.init());
} else {
  NotificationCard.init();
}

// Export for external use
export default NotificationCard;
