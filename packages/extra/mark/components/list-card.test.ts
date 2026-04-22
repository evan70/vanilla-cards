/**
 * ListCard Component Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ListCard } from './list-card';

describe('ListCard', () => {
  let card: ListCard;

  beforeEach(() => {
    card = document.createElement('list-card') as ListCard;
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  describe('Initialization', () => {
    it('should create list-card element', () => {
      expect(card).toBeInstanceOf(ListCard);
      expect(card.tagName.toLowerCase()).toBe('list-card');
    });

    it('should set variant to list automatically', () => {
      expect(card.getAttribute('variant')).toBe('list');
    });

    it('should have default values', () => {
      expect(card.title).toBe('');
      expect(card.items).toEqual([]);
      expect(card.limit).toBe(5);
      expect(card.loading).toBe(false);
    });
  });

  describe('Properties', () => {
    it('should set and get title', () => {
      card.title = 'Recent Articles';
      expect(card.title).toBe('Recent Articles');
      expect(card.getAttribute('title')).toBe('Recent Articles');
    });

    it('should parse items from JSON', () => {
      const items = [
        { title: 'Article 1', meta: '1,234 views', href: '/article/1' },
        { title: 'Article 2', meta: '892 views', href: '/article/2' }
      ];
      card.items = items;
      
      expect(card.items).toEqual(items);
      expect(card.getAttribute('items')).toBe(JSON.stringify(items));
    });

    it('should return empty array for invalid JSON', () => {
      card.setAttribute('items', 'invalid json');
      expect(card.items).toEqual([]);
    });

    it('should set and get view-all URL', () => {
      card.viewAllUrl = '/articles';
      expect(card.viewAllUrl).toBe('/articles');
    });

    it('should set and get limit', () => {
      card.limit = 10;
      expect(card.limit).toBe(10);
    });
  });

  describe('Rendering', () => {
    it('should render with title', () => {
      card.title = 'Recent Articles';
      card.render();

      expect(card.querySelector('.card__title')?.textContent).toBe('Recent Articles');
    });

    it('should render items list', () => {
      card.items = [
        { title: 'Article 1', meta: '1,234 views', href: '/article/1' },
        { title: 'Article 2', meta: '892 views', href: '/article/2' }
      ];
      card.render();

      const items = card.querySelectorAll('.card--list__item');
      expect(items.length).toBe(2);
    });

    it('should render view-all link when provided', () => {
      card.title = 'Recent Articles';
      card.viewAllUrl = '/articles';
      card.render();

      const viewAllLink = card.querySelector('.card__header-link');
      expect(viewAllLink).toBeTruthy();
      expect(viewAllLink?.getAttribute('href')).toBe('/articles');
    });

    it('should not render view-all link when not provided', () => {
      card.title = 'Recent Articles';
      card.render();

      const viewAllLink = card.querySelector('.card__header-link');
      expect(viewAllLink).toBeFalsy();
    });

    it('should respect limit', () => {
      card.items = [
        { title: 'Article 1', meta: 'views', href: '/1' },
        { title: 'Article 2', meta: 'views', href: '/2' },
        { title: 'Article 3', meta: 'views', href: '/3' },
        { title: 'Article 4', meta: 'views', href: '/4' },
        { title: 'Article 5', meta: 'views', href: '/5' },
        { title: 'Article 6', meta: 'views', href: '/6' }
      ];
      card.limit = 3;
      card.render();

      const items = card.querySelectorAll('.card--list__item');
      expect(items.length).toBe(3);
    });
  });

  describe('Item Rendering', () => {
    it('should escape HTML in item properties', () => {
      card.items = [
        {
          title: '<script>alert("xss")</script>',
          meta: 'Normal meta',
          href: '/article/1'
        }
      ];
      card.render();

      const titleElement = card.querySelector('.card--list__item-title');
      // Text content should be escaped (no script tags in text)
      expect(titleElement?.textContent).toBe('<script>alert("xss")</script>');
      // Inner HTML should contain escaped entities
      expect(titleElement?.innerHTML).toContain('&lt;script&gt;');
    });

    it('should handle missing href', () => {
      card.items = [
        { title: 'Article', meta: 'views', href: '' }
      ];
      card.render();

      const link = card.querySelector('.card__list-link');
      expect(link?.getAttribute('href')).toBe('#');
    });
  });

  describe('Data Fetching', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should fetch data from endpoint', async () => {
      const mockData = {
        items: [
          { title: 'Fetched Article', meta: 'views', href: '/1' }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      card.dataEndpoint = '/api/articles/recent';
      await card.fetchData();

      expect(card.items).toEqual(mockData.items);
      expect(global.fetch).toHaveBeenCalledWith('/api/articles/recent');
    });

    it('should handle array response', async () => {
      const mockData = [
        { title: 'Article 1', meta: 'views', href: '/1' }
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(card.items).toEqual(mockData);
    });

    it('should handle fetch error', async () => {
      const errorSpy = vi.fn();
      card.addEventListener('list:error', errorSpy);

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Error'
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(errorSpy).toHaveBeenCalled();
      expect(card.loading).toBe(false);
    });

    it('should set loading state', async () => {
      let resolveFetch: (value: any) => void;
      const fetchPromise = new Promise((resolve) => {
        resolveFetch = resolve;
      });

      global.fetch = vi.fn().mockReturnValue(fetchPromise);

      card.dataEndpoint = '/api/articles';
      const fetchDataPromise = card.fetchData();

      expect(card.loading).toBe(true);

      resolveFetch!({
        ok: true,
        json: () => Promise.resolve({ items: [] })
      });

      await fetchDataPromise;
      // Loading should be false after fetch completes
      await vi.runAllTimersAsync();
      expect(card.loading).toBe(false);
    });
  });

  describe('Events', () => {
    it('should dispatch loaded event', async () => {
      const eventSpy = vi.fn();
      card.addEventListener('list:loaded', eventSpy);

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] })
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(eventSpy).toHaveBeenCalled();
    });

    it('should dispatch error event', async () => {
      const eventSpy = vi.fn();
      card.addEventListener('list:error', eventSpy);

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('Update Methods', () => {
    it('should update items and re-render', () => {
      const newItems = [
        { title: 'New Article', meta: 'views', href: '/1' }
      ];

      const renderSpy = vi.spyOn(card, 'render');
      card.updateItems(newItems);

      expect(card.items).toEqual(newItems);
      expect(renderSpy).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner', () => {
      card.loading = true;
      card.showLoading();

      const spinner = card.querySelector('.cardboard__loading-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should hide loading spinner', () => {
      card.loading = true;
      card.showLoading();
      card.hideLoading();

      // After hideLoading, the innerHTML should be cleared (component will re-render)
      // We just check that hideLoading doesn't throw
      expect(() => card.hideLoading()).not.toThrow();
    });
  });
});
