/**
 * Public Context — shared CSS + cards for public/frontend pages.
 *
 * Import once in any public entry point. Vite deduplicates automatically.
 *
 * Replaces: vanilla-cards/entry-points/public.ts
 *
 * Usage:
 *   import { AppKernel } from '@vc/core';
 *   import '@vc/core/kernel/contexts/init-public';
 *   import '@vc/core/kernel/pages/home';
 *   AppKernel.init().withNotifications().boot();
 */

// Shared CSS
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// Nativa theme tokens (first registered theme)
import '@vc/theme-nativa';

// Register nativa theme

// Shared base card (Web Component)
import '@components/vanilla-card';
