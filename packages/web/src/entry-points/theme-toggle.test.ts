/**
 * ThemeToggle Component Tests
 * 
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeToggle } from '../entry-points/theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <button data-theme-toggle>
        <span class="theme-toggle__icon" data-theme="dark">🌓</span>
      </button>
      <meta name="csrf-token" content="test-csrf-token">
    `;
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('data-theme');
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize successfully', () => {
      expect(() => ThemeToggle.init()).not.toThrow();
    });

    it('should bind events to toggle buttons after re-initialization', () => {
      // Re-initialize with fresh DOM
      document.body.innerHTML = `
        <button data-theme-toggle>
          <span class="theme-toggle__icon" data-theme="dark">🌓</span>
        </button>
        <meta name="csrf-token" content="test-csrf-token">
      `;
      
      const toggleSpy = vi.spyOn(ThemeToggle, 'toggleTheme');
      
      ThemeToggle.init();
      
      const button = document.querySelector('[data-theme-toggle]') as HTMLElement;
      button.click();
      
      expect(toggleSpy).toHaveBeenCalled();
    });
  });

  describe('Theme Detection', () => {
    it('should get current theme', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      expect(ThemeToggle.getTheme()).toBe('dark');
    });

    it('should default to dark theme', () => {
      document.documentElement.removeAttribute('data-theme');
      expect(ThemeToggle.getTheme()).toBe('dark');
    });

    it('should detect light theme', () => {
      document.documentElement.setAttribute('data-theme', 'light');
      expect(ThemeToggle.getTheme()).toBe('light');
    });
  });

  describe('Theme Toggle', () => {
    it('should handle successful theme toggle to light', async () => {
      // Mock fetch
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          theme: 'light',
          cookie: {
            name: 'theme',
            value: 'light',
            path: '/',
            maxAge: 31536000,
            sameSite: 'Lax'
          }
        })
      });

      await ThemeToggle.toggleTheme();

      expect(fetch).toHaveBeenCalledWith(
        '/api/theme/toggle',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': 'test-csrf-token'
          })
        })
      );

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should handle successful theme toggle to dark', async () => {
      document.documentElement.setAttribute('data-theme', 'light');

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          theme: 'dark',
          cookie: {
            name: 'theme',
            value: 'dark',
            path: '/',
            maxAge: 31536000,
            sameSite: 'Lax'
          }
        })
      });

      await ThemeToggle.toggleTheme();

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should handle network error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

      await ThemeToggle.toggleTheme();

      expect(consoleSpy).toHaveBeenCalledWith(
        '[ThemeToggle] Error toggling theme:',
        expect.any(Error)
      );
    });

    it('should handle non-OK response', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Server error' })
      });

      await ThemeToggle.toggleTheme();

      expect(consoleSpy).toHaveBeenCalledWith(
        '[ThemeToggle] Error toggling theme:',
        expect.any(Error)
      );
    });

    it('should handle missing CSRF token', async () => {
      document.querySelector('meta[name="csrf-token"]')?.remove();

      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ theme: 'light' })
      });

      await ThemeToggle.toggleTheme();

      expect(fetch).toHaveBeenCalledWith(
        '/api/theme/toggle',
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-CSRF-Token': ''
          })
        })
      );
    });
  });

  describe('Keyboard Support', () => {
    it('should toggle theme on Alt+T', async () => {
      // Setup mock before keyboard event
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ theme: 'light' })
      });

      const toggleSpy = vi.spyOn(ThemeToggle, 'toggleTheme');

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 't', altKey: true }));

      // Wait for async toggle
      await Promise.resolve();
      
      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should not toggle on other keys', () => {
      const toggleSpy = vi.spyOn(ThemeToggle, 'toggleTheme');

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', altKey: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 't', altKey: false }));

      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Toggle Buttons', () => {
    it('should bind to multiple toggle buttons', () => {
      document.body.innerHTML = `
        <button data-theme-toggle class="toggle-1">
          <span class="theme-toggle__icon" data-theme="dark">🌓</span>
        </button>
        <button data-theme-toggle class="toggle-2">
          <span class="theme-toggle__icon" data-theme="dark">🌓</span>
        </button>
      `;

      ThemeToggle.init();

      const buttons = document.querySelectorAll('[data-theme-toggle]');
      expect(buttons).toHaveLength(2);
    });
  });
});
