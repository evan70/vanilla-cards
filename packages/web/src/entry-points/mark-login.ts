/**
 * mark-login.ts — Kernel-based Entry Point
 *
 * Shared kernel boot + login page component.
 */

// 1. CORE STYLES (Základné tokeny a komponenty)
import '@vc/core/styles.css';

// 2. PAGE STYLES (Prepísanie core pre konkrétnu stránku)
// Poznámka: Login stránka momentálne zdieľa globálne štýly alebo ich má v login.ts

// 3. THEME STYLES (Globálne prepísanie témou)
import '@vc/theme-nativa';

// Logika
import { AppKernel } from '@vc/core';
import '../pages/login';

AppKernel.init()
  .withHttp()
  .withAuth()
  .withNotifications()
  .boot();

export { AppKernel };
