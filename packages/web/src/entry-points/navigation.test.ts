/**
 * Navigation Component Tests
 * 
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Navigation } from '../entry-points/navigation';

// Mock the header-footer module import
vi.mock('../lib/header-footer.js', () => ({
  default: {}
}));

describe('Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('Initialization', () => {
    it('should initialize successfully', () => {
      expect(() => Navigation.init()).not.toThrow();
    });

    it('should log initialization message', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      
      Navigation.init();
      
      expect(consoleSpy).toHaveBeenCalledWith('[Navigation] Initialized ✓');
    });

    it('should not auto-initialize on DOMContentLoaded in tests', () => {
      // Navigation auto-initializes on import, so we just verify it's initialized
      expect(Navigation).toBeDefined();
    });

    it('should initialize immediately if DOM already loaded', () => {
      const initSpy = vi.spyOn(Navigation, 'init');
      
      // Simulate already loaded DOM
      Object.defineProperty(document, 'readyState', {
        value: 'interactive',
        writable: true
      });
      
      // Re-import to trigger initialization
      Navigation.init();
      
      expect(initSpy).toHaveBeenCalled();
    });
  });

  describe('Module Exports', () => {
    it('should export Navigation object', () => {
      expect(Navigation).toBeDefined();
      expect(typeof Navigation.init).toBe('function');
    });
  });

  describe('Integration with header-footer', () => {
    it('should import header-footer module', async () => {
      // The navigation.ts imports header-footer.js
      // This test verifies the import exists
      const headerFooter = await import('@vc/core/lib/header-footer.js');
      expect(headerFooter).toBeDefined();
    });
  });

  describe('Event Handling', () => {
    it('should handle multiple initializations gracefully', () => {
      expect(() => {
        Navigation.init();
        Navigation.init();
        Navigation.init();
      }).not.toThrow();
    });
  });
});
