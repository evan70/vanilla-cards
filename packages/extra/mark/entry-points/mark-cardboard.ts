/**
 * mark-cardboard.ts — Kernel-based Entry Point
 *
 * Cardboard Dashboard.
 * Logic migrated to kernel/pages/cardboard.page.ts
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/cardboard-tokens.css';
import '../styles/cardboard.css';
import '../styles/mark-crud.css';
import '@vc/core/kernel/components/card-grid.css';
import '@vc/core/kernel/components/card-stats.css';
import '../styles/views-chart.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/cardboard';

AppKernel.init().boot();

export { AppKernel };
