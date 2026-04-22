/**
 * StatsCard Component Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StatsCard } from './stats-card';

describe('StatsCard', () => {
  let card: StatsCard;

  beforeEach(() => {
    card = document.createElement('stats-card') as StatsCard;
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.removeChild(card);
  });

  describe('Initialization', () => {
    it('should create stats-card element', () => {
      expect(card).toBeInstanceOf(StatsCard);
      expect(card.tagName.toLowerCase()).toBe('stats-card');
    });

    it('should set variant to stats automatically', () => {
      expect(card.getAttribute('variant')).toBe('stats');
    });

    it('should have default values', () => {
      expect(card.value).toBe('');
      expect(card.label).toBe('');
      expect(card.color).toBe('gold');
      expect(card.trend).toBe('');
    });
  });

  describe('Properties', () => {
    it('should set and get value', () => {
      card.value = '1,234';
      expect(card.value).toBe('1,234');
      expect(card.getAttribute('value')).toBe('1,234');
    });

    it('should set and get label', () => {
      card.label = 'Total Views';
      expect(card.label).toBe('Total Views');
      expect(card.getAttribute('label')).toBe('Total Views');
    });

    it('should set and get color', () => {
      const colors = ['gold', 'emerald', 'sapphire', 'amethyst', 'ruby', 'topaz'] as const;
      
      colors.forEach((color) => {
        card.color = color;
        expect(card.color).toBe(color);
      });
    });

    it('should default to gold for invalid color', () => {
      card.setAttribute('color', 'invalid');
      expect(card.color).toBe('gold');
    });

    it('should set and get trend', () => {
      card.trend = '+12.5%';
      expect(card.trend).toBe('+12.5%');
    });

    it('should set trend direction', () => {
      card.trendDirection = 'up';
      expect(card.trendDirection).toBe('up');
      
      card.trendDirection = 'down';
      expect(card.trendDirection).toBe('down');
      
      card.trendDirection = 'neutral';
      expect(card.trendDirection).toBe('neutral');
    });
  });

  describe('Rendering', () => {
    it('should render with value and label', () => {
      card.value = '1,234';
      card.label = 'Total Views';
      card.render();

      expect(card.querySelector('.card--stats__value')?.textContent).toBe('1,234');
      expect(card.querySelector('.card--stats__label')?.textContent).toBe('Total Views');
    });

    it('should render with icon', () => {
      const iconSvg = '<svg><circle cx="12" cy="12" r="10"/></svg>';
      card.icon = iconSvg;
      card.render();

      const iconContainer = card.querySelector('.card--stats__icon');
      expect(iconContainer).toBeTruthy();
      expect(iconContainer?.innerHTML).toContain('<svg');
    });

    it('should render with trend when provided', () => {
      card.value = '1,234';
      card.label = 'Total Views';
      card.trend = '+12.5%';
      card.trendDirection = 'up';
      card.render();

      const trendElement = card.querySelector('.card--stats__trend');
      expect(trendElement).toBeTruthy();
      expect(trendElement?.textContent).toBe('+12.5%');
      expect(trendElement?.className).toContain('card--stats__trend--positive');
    });

    it('should not render trend when not provided', () => {
      card.value = '1,234';
      card.label = 'Total Views';
      card.render();

      const trendElement = card.querySelector('.card--stats__trend');
      expect(trendElement).toBeFalsy();
    });

    it('should apply correct color class', () => {
      card.color = 'emerald';
      card.render();

      const iconContainer = card.querySelector('.card--stats__icon');
      expect(iconContainer?.className).toContain('card--stats__icon--emerald');
    });
  });

  describe('Trend Classes', () => {
    it('should return positive trend class', () => {
      card.trendDirection = 'up';
      // Access private method via any cast for testing
      const trendClass = (card as any).getTrendClass();
      expect(trendClass).toContain('card--stats__trend--positive');
    });

    it('should return negative trend class', () => {
      card.trendDirection = 'down';
      const trendClass = (card as any).getTrendClass();
      expect(trendClass).toContain('card--stats__trend--negative');
    });

    it('should return neutral trend class', () => {
      card.trendDirection = 'neutral';
      const trendClass = (card as any).getTrendClass();
      expect(trendClass).toContain('card--stats__trend--neutral');
    });
  });

  describe('Auto-Refresh', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should start auto-refresh when refreshUrl is provided', async () => {
      const localCard = document.createElement('stats-card') as StatsCard;
      document.body.appendChild(localCard);
      
      const refreshSpy = vi.fn().mockResolvedValue(undefined);
      vi.spyOn(localCard, 'refresh').mockImplementation(refreshSpy);
      
      localCard.refreshInterval = 5000;
      localCard.refreshUrl = '/api/stats/views';
      
      // The component's connectedCallback already ran when we appended,
      // but refreshUrl was empty then. We need to trigger startAutoRefresh.
      // Setting refresh-url attribute after connection does not start auto-refresh.
      // So we manually call connectedCallback again (which will start auto-refresh because refreshUrl is set).
      localCard.connectedCallback();
      
      // Fast-forward time past first refresh
      await vi.advanceTimersByTimeAsync(5000);
      
      expect(refreshSpy).toHaveBeenCalled();
      
      document.body.removeChild(localCard);
    });

    it('should stop auto-refresh on disconnect', () => {
      card.refreshUrl = '/api/stats/views';
      card.connectedCallback();
      
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
      card.disconnectedCallback();
      
      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('should not start auto-refresh without refreshUrl', () => {
      const refreshSpy = vi.spyOn(card, 'refresh');
      card.connectedCallback();
      
      vi.advanceTimersByTime(30000);
      expect(refreshSpy).not.toHaveBeenCalled();
    });
  });

  describe('Data Update', () => {
    it('should update from data object', () => {
      card.updateFromData({
        value: '2,000',
        label: 'Updated Views',
        trend: '+5%',
        trendDirection: 'up'
      });

      expect(card.value).toBe('2,000');
      expect(card.label).toBe('Updated Views');
      expect(card.trend).toBe('+5%');
      expect(card.trendDirection).toBe('up');
    });

    it('should handle partial data updates', () => {
      card.value = '1,000';
      card.label = 'Original';
      
      card.updateFromData({
        value: '1,500'
      });

      expect(card.value).toBe('1,500');
      expect(card.label).toBe('Original'); // Unchanged
    });
  });

  describe('Events', () => {
    it('should dispatch refresh event', async () => {
      const eventSpy = vi.fn();
      card.addEventListener('stats:refresh', eventSpy);

      // Mock fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ value: '500' })
      });

      card.refreshUrl = '/api/stats';
      await card.refresh();

      expect(eventSpy).toHaveBeenCalled();
    });

    it('should dispatch error event on failure', async () => {
      const eventSpy = vi.fn();
      card.addEventListener('stats:error', eventSpy);

      // Mock fetch error
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      card.refreshUrl = '/api/stats';
      await card.refresh();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('Icon Rendering', () => {
    it('should return SVG if icon is already SVG', () => {
      const svgIcon = '<svg xmlns="http://www.w3.org/2000/svg"><circle/></svg>';
      card.icon = svgIcon;
      
      const result = (card as any).getIconHtml();
      expect(result).toContain('<svg');
    });

    it('should return placeholder for icon name', () => {
      card.icon = 'eye';
      
      const result = (card as any).getIconHtml();
      expect(result).toContain('<svg');
      expect(result).toContain('circle');
    });
  });
});
