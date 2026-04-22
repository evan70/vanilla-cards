/**
 * Blog Detail Page — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/blog-detail.ts
 */

import '@vc/core/kernel/pages/blog.css';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/blog-detail';

AppKernel.init().boot();

export { AppKernel };
