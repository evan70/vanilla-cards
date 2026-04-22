/**
 * Home Page — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/home.ts
 */

import '@vc/core/kernel/components/card-content.css';
import '@vc/core/kernel/components/responsive.css';
import '@vc/core/kernel/pages/home-layout.css';
import '@vc/core/kernel/sections/hero/hero.css';
import '@vc/core/kernel/sections/features/features.css';
import '@vc/core/kernel/sections/stats/stats.css';
import '@vc/core/kernel/sections/cta/cta.css';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/home';

AppKernel.init().boot();

export { AppKernel };
