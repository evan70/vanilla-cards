/**
 * mark-media.ts — Kernel-based Entry Point
 *
 * Admin Media Library.
 * Logic migrated to kernel/pages/media.page.ts
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/mark-media.css';
import '../styles/mark-crud.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '../pages/media';

AppKernel.init().withHttp().withAuth().withNotifications().boot();

export { AppKernel };
