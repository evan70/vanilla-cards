/**
 * Contact Page — Kernel-based Entry Point
 *
 * Shared kernel boot + contact page component.
 * Migrated from inline page object to kernel/pages/contact.ts.
 */

import '@vc/core/kernel/pages/contact.css';
import { AppKernel } from '@vc/core';
import '@vc/core/kernel/pages/contact';

AppKernel.init().boot();
