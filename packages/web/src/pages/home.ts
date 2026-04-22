/**
 * Home page — section lazy loading via SectionLoader.
 *
 * Registers itself with the kernel.
 */

import { AppKernel, SectionLoader } from '@vc/core';

AppKernel.getInstance().registerPage('home', () => {
  const loader = SectionLoader.getInstance();
  loader.register('[data-section="hero"]', () => import('@vc/core/kernel/sections/hero'));
  loader.register('[data-section="features"]', () => import('@vc/core/kernel/sections/features'));
  loader.register('[data-section="stats"]', () => import('@vc/core/kernel/sections/stats'));
  loader.register('[data-section="cta"]', () => import('@vc/core/kernel/sections/cta'));
});
