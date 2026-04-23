/**
 * StatsSection — Scroll-triggered card reveals, fade-in-up animations.
 *
 * Handles .homepage__stats section with staggered card animations.
 */

import './stats.css';
import { BaseSection } from '@kernel/sections/BaseSection';

export class StatsSection extends BaseSection {
  init(): void {
    this.initCardReveal();
    this.initFadeInUp();
  }

  private initCardReveal(): void {
    this.observe('.grid .card, .demo-grid .card', { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }, (el) => {
      el.classList.add('is-visible');
    });

    this.element.querySelectorAll('.grid .card, .demo-grid .card').forEach((card) => {
      card.classList.add('fade-in-up');
    });
  }

  private initFadeInUp(): void {
    this.observe('.fade-in-up', { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }, (el) => {
      el.classList.add('fade-in-up-visible');
    });
  }
}
