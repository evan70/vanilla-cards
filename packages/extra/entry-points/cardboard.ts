/**
 * Cardboard Entry Point
 *
 * Imports and registers all Cardboard overview components.
 * Use this entry point for Mark Admin overview pages.
 *
 * @example
 * ```html
 * <script type="module" src="/assets/vanilla-cards/cardboard.v1.0.0.js"></script>
 * ```
 */

// Import Chart.js first (required for ChartCard)
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement);

// Make Chart globally available
(window as any).Chart = Chart;

// Import Cardboard components
import CardboardOverview from '../mark/components/cardboard';
import { StatsCard } from '../mark/components/stats-card';
import { ListCard } from '../mark/components/list-card';
import { TableCard } from '../mark/components/table-card';
import { ChartCard } from '../mark/components/chart-card';

// Import base vanilla-card (required by all components)
import { VanillaCard } from '@vc/core';

// Import utilities
import { CardboardDataManager } from '../mark/lib/cardboard-data-manager';
import { AutoRefreshSystem } from '../mark/lib/cardboard-auto-refresh';
import { RippleEffect } from '@vc/core/lib/ripple-effect';

// Auto-initialize ripple effects
RippleEffect.attachAll();

// Export components and utilities
export {
  VanillaCard,
  CardboardOverview,
  StatsCard,
  ListCard,
  TableCard,
  ChartCard,
  CardboardDataManager,
  AutoRefreshSystem,
  RippleEffect,
  Chart
};

// Log initialization
console.info('[Cardboard] Components loaded', {
  components: [
    'vanilla-card',
    'cardboard-overview',
    'stats-card',
    'list-card',
    'table-card',
    'chart-card'
  ],
  utilities: [
    'CardboardDataManager',
    'AutoRefreshSystem',
    'RippleEffect',
    'Chart'
  ]
});
