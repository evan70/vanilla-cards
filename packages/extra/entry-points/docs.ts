/**
 * Documentation Pages — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/docs.ts
 */

import '@vc/core/kernel/pages/docs.css';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/docs';

AppKernel.init().boot();

export { AppKernel };
