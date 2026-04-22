/**
 * categories.ts — Kernel-based Entry Point
 *
 * Category tree toggle.
 * Logic migrated to kernel/pages/categories.page.ts
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/mark-crud.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/categories';

AppKernel.init().boot();

export { AppKernel };
