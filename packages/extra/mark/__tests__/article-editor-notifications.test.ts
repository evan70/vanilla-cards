/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';

import { queueSuccessAndRedirect } from '../components/article-editor';
import { NotificationService } from '@vc/core';

function createStorageMock(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

describe('article-editor redirect notifications', () => {
  it('queues the success toast payload before redirecting', () => {
    const queueSpy = vi.spyOn(NotificationService, 'queueForNextPage').mockImplementation(() => undefined);
    const location = window.location;

    try {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { href: 'http://localhost:8000/editor' },
      });

      queueSuccessAndRedirect('Article saved successfully', '/mark/articles');

      expect(queueSpy).toHaveBeenCalledWith('Article saved successfully', 'success');
      expect(window.location.href).toBe('/mark/articles');
    } finally {
      queueSpy.mockRestore();
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: location,
      });
    }
  });

  it('stores and consumes queued notifications across page load', () => {
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: createStorageMock(),
    });

    const showSpy = vi.spyOn(NotificationService, 'show').mockImplementation(() => document.createElement('div') as any);

    NotificationService.queueForNextPage('Saved', 'success', 2500);

    expect(window.sessionStorage.getItem('mark_notification_redirect')).toContain('"message":"Saved"');

    NotificationService.consumeQueuedFromStorage();

    expect(showSpy).toHaveBeenCalledWith({
      message: 'Saved',
      type: 'success',
      duration: 2500,
    });
    expect(window.sessionStorage.getItem('mark_notification_redirect')).toBeNull();
  });
});
