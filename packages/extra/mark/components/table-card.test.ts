/**
 * TableCard Component Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TableCard } from './table-card';

describe('TableCard', () => {
  let card: TableCard;

  beforeEach(() => {
    card = document.createElement('table-card') as TableCard;
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  describe('Initialization', () => {
    it('should create table-card element', () => {
      expect(card).toBeInstanceOf(TableCard);
      expect(card.tagName.toLowerCase()).toBe('table-card');
    });

    it('should set variant to table automatically', () => {
      expect(card.getAttribute('variant')).toBe('table');
    });

    it('should have default values', () => {
      expect(card.title).toBe('');
      expect(card.columns).toEqual([]);
      expect(card.rows).toEqual([]);
      expect(card.page).toBe(1);
      expect(card.perPage).toBe(20);
      expect(card.sortable).toBe(false);
    });
  });

  describe('Properties', () => {
    it('should set and get title', () => {
      card.title = 'Articles';
      expect(card.title).toBe('Articles');
    });

    it('should parse columns from JSON', () => {
      const columns = [
        { label: 'Title', key: 'title', sortable: true },
        { label: 'Author', key: 'author' }
      ];
      card.columns = columns;
      
      expect(card.columns).toEqual(columns);
    });

    it('should parse rows from JSON', () => {
      const rows = [
        { title: 'Article 1', author: 'John' },
        { title: 'Article 2', author: 'Jane' }
      ];
      card.rows = rows;
      
      expect(card.rows).toEqual(rows);
    });

    it('should return empty array for invalid JSON', () => {
      card.setAttribute('columns', 'invalid');
      expect(card.columns).toEqual([]);
    });

    it('should set action URL and text', () => {
      card.actionUrl = '/articles/new';
      card.actionText = 'New Article';
      
      expect(card.actionUrl).toBe('/articles/new');
      expect(card.actionText).toBe('New Article');
    });
  });

  describe('Rendering', () => {
    it('should render with title', () => {
      card.title = 'Articles';
      card.render();

      expect(card.querySelector('.card__title')?.textContent).toBe('Articles');
    });

    it('should render column headers', () => {
      card.columns = [
        { label: 'Title', key: 'title' },
        { label: 'Author', key: 'author' }
      ];
      card.render();

      const headers = card.querySelectorAll('th');
      expect(headers.length).toBe(2);
      expect(headers[0].textContent).toContain('Title');
      expect(headers[1].textContent).toContain('Author');
    });

    it('should render rows', () => {
      card.columns = [
        { label: 'Title', key: 'title' }
      ];
      card.rows = [
        { title: 'Article 1' },
        { title: 'Article 2' }
      ];
      card.render();

      const rows = card.querySelectorAll('tbody tr');
      expect(rows.length).toBe(2);
    });

    it('should render action button', () => {
      card.title = 'Articles';
      card.actionUrl = '/articles/new';
      card.actionText = 'New Article';
      card.render();

      const actionBtn = card.querySelector('.btn--primary');
      expect(actionBtn).toBeTruthy();
      expect(actionBtn?.textContent).toBe('New Article');
    });

    it('should not render action button when not provided', () => {
      card.title = 'Articles';
      card.render();

      const actionBtn = card.querySelector('.btn--primary');
      expect(actionBtn).toBeFalsy();
    });
  });

  describe('Pagination', () => {
    it('should not render pagination for single page', () => {
      card.columns = [{ label: 'Title', key: 'title' }];
      card.rows = Array(10).fill({ title: 'Article' });
      card.perPage = 20;
      card.render();

      const pagination = card.querySelector('.card__pagination');
      expect(pagination).toBeFalsy();
    });

    it('should render pagination for multiple pages', () => {
      card.columns = [{ label: 'Title', key: 'title' }];
      card.rows = Array(50).fill({ title: 'Article' });
      card.perPage = 10;
      card.render();

      const pagination = card.querySelector('.card__pagination');
      expect(pagination).toBeTruthy();
    });

    it('should paginate rows', () => {
      card.columns = [{ label: 'Title', key: 'title' }];
      card.rows = Array(25).fill(null).map((_, i) => ({ title: `Article ${i + 1}` }));
      card.perPage = 10;
      card.page = 1;
      card.render();

      const rows = card.querySelectorAll('tbody tr');
      expect(rows.length).toBe(10); // First page only
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should not add sortable class when sortable is false', () => {
      card.columns = [
        { label: 'Title', key: 'title', sortable: true }
      ];
      card.sortable = false;
      card.render();

      const header = card.querySelector('th');
      expect(header?.className).not.toContain('card--table__header--sortable');
    });

    it('should add sortable class when sortable is true', () => {
      card.columns = [
        { label: 'Title', key: 'title', sortable: true }
      ];
      card.sortable = true;
      card.render();

      const header = card.querySelector('th');
      expect(header?.className).toContain('card--table__header--sortable');
    });

    it('should sort rows ascending', async () => {
      card.columns = [{ label: 'Title', key: 'title', sortable: true }];
      card.rows = [
        { title: 'C' },
        { title: 'A' },
        { title: 'B' }
      ];
      card.sortable = true;
      card.render();
      
      card.sortBy('title');

      expect(card.rows[0].title).toBe('A');
      expect(card.rows[1].title).toBe('B');
      expect(card.rows[2].title).toBe('C');
    });

    it('should sort rows descending', async () => {
      card.columns = [{ label: 'Title', key: 'title', sortable: true }];
      card.rows = [
        { title: 'A' },
        { title: 'C' },
        { title: 'B' }
      ];
      card.sortable = true;
      card.render();
      
      // First sort asc
      card.sortBy('title');
      
      // Then toggle to desc
      card.sortBy('title');

      expect(card.rows[0].title).toBe('C');
      expect(card.rows[1].title).toBe('B');
      expect(card.rows[2].title).toBe('A');
    });

    it('should dispatch sort event', () => {
      const eventSpy = vi.fn();
      card.addEventListener('table:sort', eventSpy);

      card.columns = [{ label: 'Title', key: 'title', sortable: true }];
      card.rows = [{ title: 'B' }, { title: 'A' }];
      card.sortable = true;
      card.render();
      card.sortBy('title');

      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            column: 'title',
            direction: 'asc'
          }
        })
      );
    });
  });

  describe('Page Navigation', () => {
    it('should go to next page', () => {
      card.rows = Array(30).fill({ title: 'Article' });
      card.perPage = 10;
      card.page = 1;

      card.goToPage(2);

      expect(card.page).toBe(2);
    });

    it('should not go to page less than 1', () => {
      card.page = 1;
      card.goToPage(0);

      expect(card.page).toBe(1);
    });

    it('should not go to page beyond total pages', () => {
      card.rows = Array(20).fill({ title: 'Article' });
      card.perPage = 10;
      card.page = 1;

      card.goToPage(5); // Only 2 pages exist

      expect(card.page).toBe(1);
    });

    it('should dispatch page event', () => {
      const eventSpy = vi.fn();
      card.addEventListener('table:page', eventSpy);

      card.rows = Array(30).fill({ title: 'Article' });
      card.perPage = 10;
      card.goToPage(2);

      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { page: 2 }
        })
      );
    });
  });

  describe('Data Fetching', () => {
    it('should fetch data from endpoint', async () => {
      const mockData = {
        rows: [
          { title: 'Fetched Article', author: 'API' }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(card.rows).toEqual(mockData.rows);
    });

    it('should handle array response', async () => {
      const mockData = [
        { title: 'Article 1', author: 'API' }
      ];

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

      card.dataEndpoint = '/api/articles';
      await card.fetchData();

      expect(card.rows).toEqual(mockData);
    });

    it('should dispatch error event on failure', async () => {
      const eventSpy = vi.fn();
      card.addEventListener('table:error', eventSpy);

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
    it('should update data and re-render', () => {
      const newRows = [
        { title: 'New Article', author: 'Updated' }
      ];

      const renderSpy = vi.spyOn(card, 'render');
      card.updateData(newRows);

      expect(card.rows).toEqual(newRows);
      expect(renderSpy).toHaveBeenCalled();
    });

    it('should update total items count', () => {
      card.updateData([], 100);
      expect((card as any).totalItems).toBe(100);
    });
  });
});
