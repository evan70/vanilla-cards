/**
 * Blog Pages — Kernel-based Entry Point
 */

// 1. CORE STYLES
import '@vc/core/styles.css';
import '@vc/theme-nativa/components/card-content.css';

// 2. PAGE STYLES
import '../pages/blog.css';

// 3. THEME STYLES
import '@vc/theme-nativa';

// Logika
import { AppKernel } from '@vc/core';
import '../pages/blog';

AppKernel.init()
  .withNotifications()
  .boot();

export { AppKernel };
