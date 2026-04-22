/**
 * mark-forgot-password.ts — Kernel-based Entry Point
 *
 * Shared kernel boot + forgot password page component.
 * Migrated from inline ForgotPasswordForm to kernel/pages/forgot-password.page.ts.
 */

// CSS imports
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '../styles/auth-card.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '../pages/forgot-password';

AppKernel.init().withHttp().withAuth().withNotifications().boot();

export { AppKernel };
