/**
 * Blog Detail Page — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/blog-detail.ts
 */

import '../pages/blog.css';

import { AppKernel } from '@vc/core';
import '../pages/blog-detail';

AppKernel.init().withNotifications().boot();

export { AppKernel };
