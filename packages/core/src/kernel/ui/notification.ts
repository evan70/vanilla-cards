import { escapeHtml } from '../../lib/escape-html';

/**
 * Notification Service — toast notification utility.
 *
 * Moved from mark/utils/notification.ts to kernel/ui/.
 * API unchanged — all existing callers continue to work.
 */

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  message: string;
  type?: NotificationType;
  duration?: number;
  icon?: string;
}

interface ConfirmOptions {
  message: string;
  confirmText?: string;
  dismissText?: string;
  onConfirm: () => void;
  onDismiss?: () => void;
  duration?: number;
}

interface ToastElement extends HTMLElement {
  _hideTimer?: ReturnType<typeof setTimeout>;
}

interface QueuedNotification {
  message: string;
  type: NotificationType;
  duration: number;
}

const ICONS: Record<NotificationType, string> = {
  success: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  error: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
};

export class NotificationService {
  private static readonly REDIRECT_STORAGE_KEY = 'vc_notification_redirect';

  private static container: HTMLElement | null = null;

  private static getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'notification-container';
      this.container.style.cssText = 'position:fixed;top:80px;right:20px;z-index:1000;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  static show(options: NotificationOptions): ToastElement {
    const { message, type = 'info', duration = 5000, icon } = options;

    const toast = document.createElement('div') as ToastElement;
    toast.className = `notification-toast notification-toast--${type}`;
    toast.style.pointerEvents = 'auto';
    toast.innerHTML = `
      <div class="notification-toast__content">
        <span class="notification-toast__icon">${icon ?? ICONS[type]}</span>
        <span class="notification-toast__message">${escapeHtml(message)}</span>
      </div>
      <button class="notification-toast__close" aria-label="Close" type="button">&times;</button>
    `;

    const container = this.getContainer();
    container.appendChild(toast);

    const closeBtn = toast.querySelector('.notification-toast__close');
    closeBtn?.addEventListener('click', () => this.dismiss(toast));

    if (duration > 0) {
      toast._hideTimer = setTimeout(() => this.dismiss(toast), duration);
    }

    return toast;
  }

  static showConfirm(options: ConfirmOptions): ToastElement {
    const {
      message,
      confirmText = 'Confirm',
      dismissText = 'Dismiss',
      onConfirm,
      onDismiss,
      duration = 10000,
    } = options;

    const toast = document.createElement('div') as ToastElement;
    toast.className = 'notification-toast notification-toast--info';
    toast.style.pointerEvents = 'auto';
    toast.innerHTML = `
      <div class="notification-toast__content">
        <span class="notification-toast__icon">${ICONS.info}</span>
        <span class="notification-toast__message">${escapeHtml(message)}</span>
      </div>
      <div class="notification-toast__actions">
        <button class="notification-toast__btn notification-toast__btn--confirm" type="button">${escapeHtml(confirmText)}</button>
        <button class="notification-toast__btn notification-toast__btn--dismiss" type="button">${escapeHtml(dismissText)}</button>
      </div>
    `;

    const container = this.getContainer();
    container.appendChild(toast);

    const confirmBtn = toast.querySelector('.notification-toast__btn--confirm');
    confirmBtn?.addEventListener('click', () => {
      onConfirm();
      this.dismiss(toast);
    });

    const dismissBtn = toast.querySelector('.notification-toast__btn--dismiss');
    dismissBtn?.addEventListener('click', () => {
      onDismiss?.();
      this.dismiss(toast);
    });

    if (duration > 0) {
      toast._hideTimer = setTimeout(() => {
        onDismiss?.();
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

  static dismiss(toast: ToastElement): void {
    if (toast._hideTimer) {
      clearTimeout(toast._hideTimer);
    }

    toast.classList.add('notification-toast--sliding-out');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  static success(message: string, duration?: number): ToastElement {
    return this.show({ message, type: 'success', duration });
  }

  static error(message: string, duration?: number): ToastElement {
    return this.show({ message, type: 'error', duration });
  }

  static info(message: string, duration?: number): ToastElement {
    return this.show({ message, type: 'info', duration });
  }

  static warning(message: string, duration?: number): ToastElement {
    return this.show({ message, type: 'warning', duration });
  }

  static queueForNextPage(
    message: string,
    type: NotificationType = 'info',
    duration = 5000,
  ): void {
    try {
      const payload: QueuedNotification = { message, type, duration };
      window.sessionStorage.setItem(this.REDIRECT_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.warn('[NotificationService] Failed to queue redirect notification:', error);
    }
  }

  static consumeQueuedFromStorage(): void {
    try {
      const queued = window.sessionStorage.getItem(this.REDIRECT_STORAGE_KEY);
      if (!queued) {
        return;
      }

      window.sessionStorage.removeItem(this.REDIRECT_STORAGE_KEY);
      const payload = JSON.parse(queued) as Partial<QueuedNotification>;

      if (!payload.message || typeof payload.message !== 'string') {
        return;
      }

      this.show({
        message: payload.message,
        type: payload.type ?? 'info',
        duration: typeof payload.duration === 'number' ? payload.duration : 5000,
      });
    } catch (error) {
      window.sessionStorage.removeItem(this.REDIRECT_STORAGE_KEY);
      console.warn('[NotificationService] Failed to consume redirect notification:', error);
    }
  }
}

export default NotificationService;
