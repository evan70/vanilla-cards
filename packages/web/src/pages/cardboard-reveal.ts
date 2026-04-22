/**
 * cardboard-reveal.page.ts — Scroll-triggered entrance animations.
 *
 * Uses kernel ObserverPool instead of raw IntersectionObserver.
 * Respects prefers-reduced-motion.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('cardboard-reveal', () => {
  const kernel = AppKernel.getInstance();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  kernel.dom.observer.observeAll(
    document.querySelectorAll('.reveal, .reveal-stagger'),
    {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0,
      once: true,
      onReveal: (el) => el.classList.add('is-visible'),
    },
  );
});
