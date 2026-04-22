/**
 * mark-cardboard.ts — Kernel-based Entry Point
 */

// 1. CORE STYLES
import '@vc/core/styles.css';
import '@vc/core/kernel/components/card-grid.css';
import '@vc/core/kernel/components/card-stats.css';

// 2. PAGE STYLES
import '../styles/cardboard-tokens.css';
import '../styles/cardboard.css';
import '../styles/mark-crud.css';
import '../styles/views-chart.css';
import '../pages/cardboard.css'; // if exists

// 3. THEME STYLES
import '@vc/theme-nativa';

// Logika
import { AppKernel } from '@vc/core';
import '../pages/cardboard';

AppKernel.init()
  .withHttp()
  .withAuth()
  .withNotifications()
  .boot();

export { AppKernel };
