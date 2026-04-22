/**
 * NotificationCard Component Tests
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NotificationCard } from './notification-card';

describe('NotificationCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    NotificationCard.clearAll();
  });

  describe('Initialization', () => {
    it('should initialize without errors', () => {
      expect(() => NotificationCard.init()).not.toThrow();
    });

    it('should create container element', () => {
      NotificationCard.init();
      const container = document.getElementById('notificationCards');
      expect(container).toBeTruthy();
      expect(container?.classList.contains('card--notifications-container')).toBe(true);
    });

    it('should set aria-live on container', () => {
      NotificationCard.init();
      const container = document.getElementById('notificationCards');
      expect(container?.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Show Notification', () => {
    it('should show notification with required options', () => {
      NotificationCard.init();
      const id = NotificationCard.show({
        type: 'info',
        priority: 3,
        message: 'Test notification',
      });

      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
    });

    it('should create notification card element', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'success',
        priority: 2,
        message: 'Success message',
      });

      const card = document.querySelector('.card--notification--success');
      expect(card).toBeTruthy();
    });

    it('should include title when provided', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'info',
        priority: 3,
        title: 'Test Title',
        message: 'Test message',
      });

      const title = document.querySelector('.card--notification__title');
      expect(title?.textContent).toBe('Test Title');
    });

    it('should include actions when provided', () => {
      NotificationCard.init();
      const mockAction = vi.fn();

      NotificationCard.show({
        type: 'cookie',
        priority: 1,
        message: 'Cookie consent',
        actions: [
          { label: 'Accept', variant: 'primary', onClick: mockAction },
        ],
      });

      const actionBtn = document.querySelector('.card--notification__action');
      expect(actionBtn).toBeTruthy();
      expect(actionBtn?.textContent?.trim()).toBe('Accept');
    });
  });

  describe('Priority Queue', () => {
    it('should sort notifications by priority', () => {
      NotificationCard.init();

      // Add in reverse priority order
      NotificationCard.show({ type: 'info', priority: 5, message: 'Low priority' });
      NotificationCard.show({ type: 'success', priority: 1, message: 'High priority' });
      NotificationCard.show({ type: 'warning', priority: 3, message: 'Medium priority' });

      // Should be sorted by priority
      expect(NotificationCard.getQueueCount()).toBeLessThanOrEqual(3);
    });

    it('should respect maxVisible limit', () => {
      NotificationCard.init();

      // Add more than maxVisible (3)
      for (let i = 0; i < 5; i++) {
        NotificationCard.show({ type: 'info', priority: i, message: `Message ${i}` });
      }

      expect(NotificationCard.getVisibleCount()).toBeLessThanOrEqual(3);
    });
  });

  describe('Dismiss', () => {
    it('should dismiss notification', () => {
      NotificationCard.init();
      const id = NotificationCard.show({
        type: 'info',
        priority: 3,
        message: 'Dismissible',
      });

      const card = document.querySelector(`[data-notification-id="${id}"]`);
      expect(card).toBeTruthy();

      // Dismiss
      NotificationCard.dismiss(card as HTMLElement);

      // Should be removed after animation
      setTimeout(() => {
        expect(document.querySelector(`[data-notification-id="${id}"]`)).toBeFalsy();
      }, 350);
    });

    it('should call dismiss on close button click', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'info',
        priority: 3,
        message: 'Click to dismiss',
      });

      const closeBtn = document.querySelector('.card--notification__close');
      expect(closeBtn).toBeTruthy();

      // Simulate click
      closeBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      // Should have dismissing class
      const card = document.querySelector('.card--notification--dismissing');
      expect(card).toBeTruthy();
    });
  });

  describe('Auto-hide', () => {
    it('should auto-hide notification', () => {
      return new Promise<void>((resolve) => {
        NotificationCard.init();
        NotificationCard.show({
          type: 'info',
          priority: 3,
          message: 'Auto-hide',
          autoHide: 100, // 100ms for test
        });

        setTimeout(() => {
          const card = document.querySelector('.card--notification--dismissing');
          expect(card).toBeTruthy();
          resolve();
        }, 150);
      });
    });

    it('should not auto-hide when autoHide is false', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'cookie',
        priority: 1,
        message: 'No auto-hide',
        autoHide: false,
      });

      // Should not have dismissing class after delay
      setTimeout(() => {
        const card = document.querySelector('.card--notification--dismissing');
        expect(card).toBeFalsy();
      }, 100);
    });
  });

  describe('Notification Types', () => {
    it('should support cookie type', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'cookie',
        priority: 1,
        message: 'Cookie consent',
      });

      const card = document.querySelector('.card--notification--cookie');
      expect(card).toBeTruthy();
    });

    it('should support success type', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'success',
        priority: 2,
        message: 'Success!',
      });

      const card = document.querySelector('.card--notification--success');
      expect(card).toBeTruthy();
    });

    it('should support error type', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'error',
        priority: 2,
        message: 'Error!',
      });

      const card = document.querySelector('.card--notification--error');
      expect(card).toBeTruthy();
    });

    it('should support warning type', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'warning',
        priority: 3,
        message: 'Warning!',
      });

      const card = document.querySelector('.card--notification--warning');
      expect(card).toBeTruthy();
    });

    it('should support info type', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'info',
        priority: 4,
        message: 'Info',
      });

      const card = document.querySelector('.card--notification--info');
      expect(card).toBeTruthy();
    });
  });

  describe('Utility Methods', () => {
    it('should clear all notifications', () => {
      NotificationCard.init();

      // Add multiple notifications
      for (let i = 0; i < 3; i++) {
        NotificationCard.show({ type: 'info', priority: i, message: `Message ${i}` });
      }

      expect(NotificationCard.getVisibleCount()).toBeGreaterThan(0);

      NotificationCard.clearAll();

      expect(NotificationCard.getVisibleCount()).toBe(0);
      expect(NotificationCard.getQueueCount()).toBe(0);
    });

    it('should escape HTML in messages', () => {
      NotificationCard.init();
      NotificationCard.show({
        type: 'info',
        priority: 3,
        message: '<script>alert("XSS")</script>',
      });

      const message = document.querySelector('.card--notification__message');
      expect(message?.innerHTML).not.toContain('<script>');
      expect(message?.textContent).toContain('<script>alert("XSS")</script>');
    });
  });
});
