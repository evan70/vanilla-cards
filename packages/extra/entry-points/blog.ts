/**
 * Blog Pages — Kernel-based Entry Point
 *
 * CSS imports + kernel boot.
 * Page logic in kernel/pages/blog.ts
 */

import '@vc/core/kernel/components/card-content.css';
import '@vc/core/kernel/pages/blog.css';
import '@vc/core/kernel/base/states.css';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/blog';

AppKernel.init().boot();

export { AppKernel };
