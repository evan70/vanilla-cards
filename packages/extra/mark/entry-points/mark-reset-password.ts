/**
 * mark-reset-password.ts — Kernel-based Entry Point
 *
 * Shared kernel boot + reset password page component.
 * Migrated from inline ResetPasswordForm to kernel/pages/reset-password.page.ts.
 */

// CSS imports
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/auth-card.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/reset-password';

AppKernel.init().boot();

export { AppKernel };
