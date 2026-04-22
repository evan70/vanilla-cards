/**
 * Portfolio Page — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/portfolio.ts
 */

// Page layout styles
import '@vc/core/kernel/pages/portfolio.css';

// Portfolio-specific card components (not in core)
import '@vc/core/kernel/components/card-project.css';
import '@vc/core/kernel/components/card-case-study.css';
import '@vc/core/kernel/components/card-client.css';
import '@vc/core/kernel/components/card-skill.css';
import '@vc/core/kernel/components/portfolio-filter.css';

import '@vc/theme-nativa';
import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/portfolio';

AppKernel.init().boot();

export { AppKernel };
