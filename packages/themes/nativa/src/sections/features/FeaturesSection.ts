/**
 * FeaturesSection — Viewport peek, mystery reveal, stagger animations.
 *
 * Handles viewport-section with --peek, --mystery, --stagger variants.
 */

import './features.css';
import { BaseSection } from '@vc/core';

export class FeaturesSection extends BaseSection {
  init(): void {
    this.initMystery();
    this.initStagger();
    this.initProgress();
  }

  private initMystery(): void {
    if (!this.element.classList.contains('viewport-section--mystery')) return;

    this.observeSelfImmediate({ threshold: 0.2, rootMargin: '-10% 0px' }, (el) => {
      el.classList.add('is-revealed');
    });
  }

  private initStagger(): void {
    if (!this.element.classList.contains('viewport-section--stagger')) return;

    const triggerStagger = () => {
      this.element.classList.add('is-revealed');
      const cards = this.element.querySelectorAll('.card, .token-card');
      cards.forEach((card, index) => {
        (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
      });
    };

    this.observeSelfImmediate({ threshold: 0.3 }, () => {
      triggerStagger();
    });
  }

  private initProgress(): void {
    if (!this.element.classList.contains('viewport-section--peek')) return;

    const progressEl = this.element.querySelector('.viewport-section__progress');
    if (!progressEl) return;

    const updateProgress = () => {
      const rect = this.element.getBoundingClientRect();
      const progress = Math.min(
        100,
        Math.max(0, ((window.innerHeight - rect.top) / (window.innerHeight + rect.height)) * 100)
      );
      (progressEl as HTMLElement).style.width = `${progress}%`;
    };

    this.observeSelf({ threshold: 0 }, () => {
      updateProgress();
      window.addEventListener('scroll', updateProgress, { passive: true });
    });
  }
}
