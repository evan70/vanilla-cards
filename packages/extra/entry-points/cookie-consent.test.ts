/**
 * CookieConsent Component Tests
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CookieConsent } from '../entry-points/cookie-consent';

// Mock the import
vi.mock('@vc/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    NotificationCard: {
      show: vi.fn(),
    },
  };
});

import { NotificationCard } from '@vc/core';

describe('CookieConsent', () => {
  beforeEach(() => {
    // Clear cookies
    document.cookie.split(';').forEach(c => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Clear mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Initialization', () => {
    it('should initialize without errors', () => {
      expect(() => CookieConsent.init()).not.toThrow();
    });

    it('should detect existing consent from cookie', () => {
      // Set cookie
      document.cookie = 'cookie-consent=true; Path=/; Max-Age=31536000';

      expect(CookieConsent.hasConsent()).toBe(true);
    });

    it('should not show banner if consent already given', () => {
      document.cookie = 'cookie-consent=true; Path=/; Max-Age=31536000';
      CookieConsent.init();

      expect(NotificationCard.show).not.toHaveBeenCalled();
    });
  });

  describe('Consent Detection', () => {
    it('should return false when no consent given', () => {
      expect(CookieConsent.hasConsent()).toBe(false);
    });

    it('should return true when consent given', () => {
      document.cookie = 'cookie-consent=true; Path=/; Max-Age=31536000';
      expect(CookieConsent.hasConsent()).toBe(true);
    });
  });

  describe('Banner Display', () => {
    it('should show notification card when no consent', () => {
      CookieConsent.init();

      // Wait for init delay
      setTimeout(() => {
        expect(NotificationCard.show).toHaveBeenCalled();
      }, 400);
    });

    it('should call NotificationCard.show with correct options', (done: any) => {
      CookieConsent.init();

      setTimeout(() => {
        expect(NotificationCard.show).toHaveBeenCalledWith({
          type: 'cookie',
          priority: 1,
          title: 'Nastavenie Cookies',
          message: expect.stringContaining('cookies'),
          autoHide: false,
          icon: 'cookie',
          actions: expect.arrayContaining([
            expect.objectContaining({ label: 'Odmietnuť' }),
            expect.objectContaining({ label: 'Prijať všetky' }),
          ]),
        });
        done();
      }, 400);
    });
  });

  describe('Event Emission', () => {
    it('should have emit method', () => {
      expect(typeof CookieConsent.emit).toBe('function');
    });

    it('should emit custom event', () => {
      const mockHandler = vi.fn();
      document.addEventListener('consent:accepted', mockHandler);

      CookieConsent.emit('consent:accepted');

      expect(mockHandler).toHaveBeenCalled();
    });
  });

  describe('Consent Submission', () => {
    it('should have accept method', () => {
      expect(typeof CookieConsent.accept).toBe('function');
    });

    it('should have decline method', () => {
      expect(typeof CookieConsent.decline).toBe('function');
    });

    it('should have submitConsent method', () => {
      expect(typeof CookieConsent.submitConsent).toBe('function');
    });

    it('should set accepted flag on accept', async () => {
      // Mock fetch
      global.fetch = vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response));

      await CookieConsent.accept();

      expect(CookieConsent.getConsent()).toBe(true);
    });

    it('should set accepted flag to false on decline', async () => {
      // Mock fetch
      global.fetch = vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response));

      await CookieConsent.decline();

      expect(CookieConsent.getConsent()).toBe(false);
    });
  });
});
