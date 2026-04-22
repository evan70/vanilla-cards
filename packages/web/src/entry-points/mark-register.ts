/**
 * mark-register.ts — Kernel-based Entry Point
 *
 * Shared kernel boot + register page component.
 * Migrated from inline MarkRegisterHandler class to kernel/pages/register.page.ts.
 */

// CSS imports
import '@vc/core/kernel/tokens/unified.css';
import '@vc/core/kernel/base/core.css';
import '@vc/core/kernel/components/action-card.css';
import '../styles/auth-card.css';

// Nativa theme (separate entry point — must register itself)
import '@vc/theme-nativa';

import { AppKernel } from '@vc/core';
import '../pages/register';

AppKernel.init().withHttp().withAuth().withNotifications().boot();

export { AppKernel };
