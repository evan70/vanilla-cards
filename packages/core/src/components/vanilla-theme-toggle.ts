/**
 * Vanilla Theme Toggle Web Component
 *
 * Structural component for theme switching.
 * Logic is handled by core ThemeManager.
 *
 * @element vanilla-theme-toggle
 */

import { AppKernel } from '../kernel/app-kernel';

export class VanillaThemeToggle extends HTMLElement {
  connectedCallback(): void {
    this.classList.add('theme-toggle');
    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', 'Toggle theme');
    this.setAttribute('tabindex', '0');

    this.addEventListener('click', () => this.toggle());
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });

    this.render();
  }

  private toggle(): void {
    AppKernel.getInstance().theme.toggle();
  }

  private render(): void {
    // Structural rendering - themes can override icons via CSS or by injecting content
    if (this.innerHTML.trim() === '') {
      this.innerHTML = `
        <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀️</span>
        <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">🌙</span>
      `;
    }
  }
}

if (!customElements.get('vanilla-theme-toggle')) {
  customElements.define('vanilla-theme-toggle', VanillaThemeToggle);
}
