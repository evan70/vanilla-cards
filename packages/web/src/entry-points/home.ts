/**
 * Home Page — Kernel-based Entry Point
 */

// 1. CORE STYLES (Základné tokeny a komponenty)
import '@vc/core/styles.css';

// Ostatné komponenty z core
import '@vc/theme-nativa/components/card-content.css';
import '@vc/theme-nativa/components/responsive.css';

// 2. PAGE STYLES (Prepísanie core pre konkrétnu stránku)
import '../pages/home-layout.css';
import '../pages/home.css';

// 3. THEME STYLES (Globálne prepísanie témou)
import '@vc/theme-nativa';

// Logika
import { AppKernel } from '@vc/core';
import '../pages/home';

AppKernel.init()
  .withNotifications()
  .boot();

export { AppKernel };
