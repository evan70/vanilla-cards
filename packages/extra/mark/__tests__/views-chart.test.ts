/**
 * ViewsChart Component Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ViewsChart } from '../components/views-chart';

describe('ViewsChart', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'chart-container';
    document.body.appendChild(container);
  });

  describe('render', () => {
    it('should render chart with data', () => {
      const data = [
        { date: '2026-03-11', views: 100 },
        { date: '2026-03-12', views: 150 },
        { date: '2026-03-13', views: 200 },
      ];

      ViewsChart.render(container, data);

      expect(container.querySelector('svg')).toBeTruthy();
      expect(container.querySelector('.views-chart')).toBeTruthy();
    });

    it('should render empty state when no data', () => {
      ViewsChart.render(container, []);

      expect(container.innerHTML).toContain('No data available');
    });

    it('should render empty state when data is null', () => {
      ViewsChart.render(container, null as any);

      expect(container.innerHTML).toContain('No data available');
    });

    it('should use custom width option', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data, { width: 600 });

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should use custom height option', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data, { height: 300 });

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toContain('300');
    });

    it('should use custom color option', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data, { color: '#FF0000' });

      expect(container.innerHTML).toContain('#FF0000');
    });

    it('should render grid lines when showGrid is true', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data, { showGrid: true });

      expect(container.innerHTML).toContain('<line');
    });

    it('should not render grid lines when showGrid is false', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data, { showGrid: false });

      // Should not have grid lines
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(0);
    });
  });

  describe('update', () => {
    it('should update chart with new data', () => {
      const initialData = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, initialData);

      const newData = [
        { date: '2026-03-11', views: 100 },
        { date: '2026-03-12', views: 200 },
      ];
      ViewsChart.update(container, newData);

      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  describe('destroy', () => {
    it('should clear container content', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data);

      expect(container.innerHTML).not.toBe('');

      ViewsChart.destroy(container);

      expect(container.innerHTML).toBe('');
    });
  });

  describe('data handling', () => {
    it('should handle single data point', () => {
      const data = [{ date: '2026-03-11', views: 100 }];
      ViewsChart.render(container, data);

      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('should handle large values', () => {
      const data = [{ date: '2026-03-11', views: 1000000 }];
      ViewsChart.render(container, data);

      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('should handle zero values', () => {
      const data = [{ date: '2026-03-11', views: 0 }];
      ViewsChart.render(container, data);

      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('should handle multiple data points', () => {
      const data = Array.from({ length: 30 }, (_, i) => ({
        date: `2026-03-${String(i + 1).padStart(2, '0')}`,
        views: Math.random() * 1000,
      }));

      ViewsChart.render(container, data);

      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
