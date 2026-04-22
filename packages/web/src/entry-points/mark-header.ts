/**
 * mark-header.ts — Shared CSS + Theme for Mark Admin Pages
 *
 * Provides unified CSS and nativa theme registration.
 * Does NOT boot the kernel — the page-specific entry point (mark-cardboard,
 * mark-article-editor, etc.) calls AppKernel.init().boot().
 */

// CSS imports
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';
