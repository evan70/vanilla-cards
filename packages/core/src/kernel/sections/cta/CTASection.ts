/**
 * CTASection — Back-to-top button + share section interactions.
 *
 * Handles #back-to-top button visibility and smooth scroll.
 */

import './cta.css';
import { BaseSection } from '@kernel/sections/BaseSection';

export class CTASection extends BaseSection {
  init(): void {
    this.initBackToTop();
  }

  private initBackToTop(): void {
    const button = this.element.querySelector<HTMLButtonElement>('.btn--back-to-top')
      ?? document.querySelector('.btn--back-to-top') as HTMLButtonElement | null;
    if (!button) return;

    const toggleButton = () => {
      const scrolled = window.scrollY > 300;
      button.style.opacity = scrolled ? '1' : '0';
      button.style.pointerEvents = scrolled ? 'auto' : 'none';
      button.style.transform = scrolled ? 'translateY(0)' : 'translateY(20px)';
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleButton();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleButton();
  }
}
