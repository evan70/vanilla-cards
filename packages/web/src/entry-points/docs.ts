/**
 * Documentation Pages — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/docs.ts
 */

import '../pages/docs.css';

import '@vc/theme-nativa';
import { AppKernel } from '@vc/core';
import '../pages/docs';

AppKernel.init().withNotifications().boot();

export { AppKernel };
