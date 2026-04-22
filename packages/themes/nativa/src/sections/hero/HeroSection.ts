/**
 * HeroSection — Hero title reveal + description fade-in on scroll.
 *
 * Handles hero-section with title, description, and buttons animations.
 *
 * IMPORTANT: Check visibility BEFORE hiding to avoid flash on initial load.
 */

import './hero.css';
import { BaseSection } from '@vc/core';

export class HeroSection extends BaseSection {
  init(): void {
    this.initTitleReveal();
    this.initDescriptionFade();
  }

  private initTitleReveal(): void {
    const title = this.element.querySelector('.hero-section__title') as HTMLElement;
    if (!title) return;

    // Check visibility BEFORE hiding — avoid flash on initial page load
    if (this.isInViewport(title, 0.1)) {
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
      return;
    }

    // Not visible yet — hide and observe
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

    this.observe('.hero-section__title', { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }, (el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  }

  private initDescriptionFade(): void {
    const desc = this.element.querySelector('.hero-section__description') as HTMLElement;
    if (!desc) return;

    // Check visibility BEFORE hiding
    if (this.isInViewport(desc, 0.1)) {
      desc.style.opacity = '0.9';
      desc.style.transform = 'translateY(0)';
      return;
    }

    // Not visible yet — hide and observe
    desc.style.opacity = '0';
    desc.style.transform = 'translateY(20px)';
    desc.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';

    this.observe('.hero-section__description', { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }, (el) => {
      (el as HTMLElement).style.opacity = '0.9';
      (el as HTMLElement).style.transform = 'translateY(0)';
    });
  }
}
