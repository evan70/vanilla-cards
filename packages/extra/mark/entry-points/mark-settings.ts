/**
 * mark-settings.ts — Kernel-based Entry Point
 *
 * Shared kernel boot + settings page component.
 * Migrated from inline initSettingsTabs/initServerNotification to kernel/pages/settings.page.ts.
 *
 * Server flash messages are now consumed via <meta name="flash-message">
 * which the kernel processes automatically in boot().
 */

// CSS imports
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/mark-settings.css';
import '../styles/mark-crud.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/settings';

AppKernel.init().boot();

export { AppKernel };
