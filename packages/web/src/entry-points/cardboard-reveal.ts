/**
 * cardboard-reveal.ts — Kernel-based Entry Point
 *
 * Scroll-triggered reveal animations.
 * Logic migrated to kernel/pages/cardboard-reveal.page.ts
 */

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '../pages/cardboard-reveal';

AppKernel.init().withNotifications().boot();

export { AppKernel };
