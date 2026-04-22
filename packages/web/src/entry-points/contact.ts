/**
 * Contact Page — Kernel-based Entry Point
 *
 * Shared kernel boot + contact page component.
 * Migrated from inline page object to kernel/pages/contact.ts.
 */

import '../pages/contact.css';
import { AppKernel } from '@vc/core';
import '../pages/contact';

AppKernel.init().withNotifications().boot();
