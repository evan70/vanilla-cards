/**
 * NativaThemeManager — visual/branding biased theme management.
 *
 * Extends core ThemeManager with specific Nativa icons,
 * font-property syncing, and BEM selectors.
 */

import { ThemeManager } from '@vc/core';
import type { ActiveTheme, ThemeName } from '@vc/core';
import type { ThemeDefinition } from '@vc/core';

const SUN_ICON = `<svg class="card--header__theme-icon card--header__theme-icon--sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
const MOON_ICON = `<svg class="card--header__theme-icon card--header__theme-icon--moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export class NativaThemeManager extends ThemeManager {
  /**
   * Initialize theme from DOM/cookies, sync DOM, bind all toggle buttons.
   */
  override init(): void {
    super.init();
    const current = this.getTheme();
    this.updateIcons(current.variant as any);
    this.bindAll();
  }

  /**
   * Apply theme to DOM (html attributes + font classes).
   */
  protected override applyDom(theme: ActiveTheme): void {
    super.applyDom(theme);

    if (theme.definition) {
      this.applyFonts(theme.definition);
    }
    
    this.updateIcons(theme.variant as any);
  }

  /**
   * Apply theme fonts to document.
   */
  private applyFonts(definition: ThemeDefinition): void {
    document.documentElement.style.setProperty('--font-heading', definition.fonts.heading);
    document.documentElement.style.setProperty('--font-body', definition.fonts.body);
  }

  /**
   * Bind click + touchend to a toggle button.
   */
  bindToggle(button: HTMLButtonElement): void {
    if (!button.querySelector('.card--header__theme-icon')) {
      button.innerHTML = SUN_ICON + MOON_ICON;
    }

    button.addEventListener('click', () => this.toggle());
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  /**
   * Update icon visibility across all theme toggle buttons.
   */
  updateIcons(theme?: ThemeName): void {
    const current = theme ?? this.getTheme().variant;

    document.querySelectorAll('.card--header__theme-icon--sun').forEach(el => {
      (el as SVGElement).style.display = current === 'dark' ? 'none' : 'block';
    });
    document.querySelectorAll('.card--header__theme-icon--moon').forEach(el => {
      (el as SVGElement).style.display = current === 'dark' ? 'block' : 'none';
    });
  }

  /**
   * Find and bind all theme toggle buttons on the page.
   */
  private bindAll(): void {
    const selectors = [
      '.card--header__theme-toggle',
      '.card--nav-mobile__theme-toggle',
      '[data-theme-toggle]',
      '#themeToggle',
      '#theme-toggle',
    ];

    selectors.forEach(selector => {
      document.querySelectorAll<HTMLButtonElement>(selector).forEach(btn => {
        // Prevent multiple bindings
        if (btn.dataset.themeBound) return;
        btn.dataset.themeBound = 'true';

        this.bindToggle(btn);
      });
    });
  }
}
