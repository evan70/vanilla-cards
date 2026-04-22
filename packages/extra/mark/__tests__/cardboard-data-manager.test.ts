/**
 * Cardboard Data Manager - Tests
 *
 * Tests for cache, retry, subscribe, and invalidate functionality.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CardboardDataManagerClass } from '../lib/cardboard-data-manager';

describe('CardboardDataManager', () => {
  let manager: CardboardDataManagerClass;

  beforeEach(() => {
    manager = new CardboardDataManagerClass();
    manager.configure({ cacheTTL: 30_000, retryAttempts: 3, retryDelay: 10 });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('fetch', () => {
    it('should fetch data from URL', async () => {
      const mockData = { success: true, data: { count: 5 } };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await manager.fetch('https://api.example.com/stats');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/stats');
    });

    it('should throw on non-ok response after retries', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      });

      manager.configure({ retryAttempts: 3, retryDelay: 10, cacheTTL: 30_000 });

      // Suppress unhandled rejection from the retry internal promise
      const originalHandler = process.listeners('unhandledRejection');
      const handler = () => {};
      process.on('unhandledRejection', handler);

      try {
        const promise = manager.fetch('https://api.example.com/fail');
        await vi.advanceTimersByTimeAsync(100);
        await expect(promise).rejects.toThrow('HTTP 500');
        expect(global.fetch).toHaveBeenCalledTimes(3);
      } finally {
        process.off('unhandledRejection', handler);
      }
    });

    it('should return cached data within TTL', async () => {
      const mockData = { value: 42 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const r1 = await manager.fetch('https://api.example.com/data');
      const r2 = await manager.fetch('https://api.example.com/data');

      expect(r1).toEqual(mockData);
      expect(r2).toEqual(mockData);
      // Only 1 fetch because second hit cache
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should refetch after cache expires', async () => {
      manager.configure({ cacheTTL: 1_000, retryAttempts: 1, retryDelay: 10 });
      const mockData = { value: 1 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      await manager.fetch('https://api.example.com/data');

      // Advance past TTL
      vi.advanceTimersByTime(1_500);

      await manager.fetch('https://api.example.com/data');

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should deduplicate concurrent fetches', async () => {
      const mockData = { value: 'slow' };
      global.fetch = vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        }), 100)),
      );

      const promises = Promise.all([
        manager.fetch('https://api.example.com/slow'),
        manager.fetch('https://api.example.com/slow'),
        manager.fetch('https://api.example.com/slow'),
      ]);

      await vi.advanceTimersByTimeAsync(150);

      const [r1, r2, r3] = await promises;

      expect(r1).toEqual(mockData);
      expect(r2).toEqual(mockData);
      expect(r3).toEqual(mockData);
      // All 3 returned same promise — only 1 fetch
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribe', () => {
    it('should notify subscribers on fetch', async () => {
      const mockData = { count: 10 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const callback = vi.fn();
      manager.subscribe('https://api.example.com/data', callback);

      await manager.fetch('https://api.example.com/data');

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(mockData);
    });

    it('should return unsubscribe function', async () => {
      const mockData = { count: 10 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const callback = vi.fn();
      const unsubscribe = manager.subscribe('https://api.example.com/data', callback);

      unsubscribe();

      await manager.fetch('https://api.example.com/data');

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle subscriber errors gracefully', async () => {
      const mockData = { count: 10 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const badCallback = vi.fn().mockImplementation(() => {
        throw new Error('Subscriber error');
      });
      const goodCallback = vi.fn();

      manager.subscribe('https://api.example.com/data', badCallback);
      manager.subscribe('https://api.example.com/data', goodCallback);

      await manager.fetch('https://api.example.com/data');

      expect(badCallback).toHaveBeenCalled();
      expect(goodCallback).toHaveBeenCalledWith(mockData);
    });
  });

  describe('invalidate', () => {
    it('should force refetch after invalidate', async () => {
      const mockData = { value: 1 };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      await manager.fetch('https://api.example.com/data');
      manager.invalidate('https://api.example.com/data');
      await manager.fetch('https://api.example.com/data');

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should clear all cache on invalidateAll', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await manager.fetch('https://api.example.com/a');
      await manager.fetch('https://api.example.com/b');

      manager.invalidateAll();

      await manager.fetch('https://api.example.com/a');
      await manager.fetch('https://api.example.com/b');

      expect(global.fetch).toHaveBeenCalledTimes(4);
    });
  });

  describe('getStats', () => {
    it('should return cache size and keys', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await manager.fetch('https://api.example.com/a');
      await manager.fetch('https://api.example.com/b');

      const stats = manager.getStats();

      expect(stats.size).toBe(2);
      expect(stats.keys).toContain('https://api.example.com/a');
      expect(stats.keys).toContain('https://api.example.com/b');
    });
  });
});
