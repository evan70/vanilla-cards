/**
 * mark-article-editor.ts — Kernel-based Entry Point
 *
 * Article editor (markdown + Cloudinary).
 * Logic in kernel/pages/article-editor.page.ts
 */

import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/mark-crud.css';
import '../styles/article-editor.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/article-editor';

AppKernel.init().boot();

export { AppKernel };
