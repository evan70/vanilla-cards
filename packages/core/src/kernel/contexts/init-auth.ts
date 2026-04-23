/**
 * Auth Context — shared CSS + cards + utils for authenticated pages.
 *
 * Import once in any auth entry point. Vite deduplicates automatically.
 *
 * Replaces: mark/entry-points/mark.ts
 *
 * Usage:
 *   import { AppKernel } from '@vc/core';
 *   import '@vc/core/kernel/contexts/init-auth';
 *   import '@vc/core/kernel/pages/cardboard';
 *   AppKernel.init().withHttp().withAuth().withNotifications().boot();
 */

// Shared CSS
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';

// Nativa theme tokens (first registered theme)
import '@vc/theme-nativa';

// Register nativa theme

// Shared kernel utils (side-effects: auto-init on import)
import '@vc/core/kernel/utils/delete-confirmation';
