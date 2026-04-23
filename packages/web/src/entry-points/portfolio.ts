/**
 * Portfolio Page — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/portfolio.ts
 */

// Page layout styles
import '../pages/portfolio.css';

// Portfolio-specific card components (not in core)
import '@vc/theme-nativa/components/card-project.css';
import '@vc/theme-nativa/components/card-case-study.css';
import '@vc/theme-nativa/components/card-client.css';
import '@vc/theme-nativa/components/card-skill.css';
import '@vc/theme-nativa/components/portfolio-filter.css';

import '@vc/theme-nativa';
import { AppKernel } from '@vc/core';
import '../pages/portfolio';

AppKernel.init().withNotifications().boot();

export { AppKernel };
