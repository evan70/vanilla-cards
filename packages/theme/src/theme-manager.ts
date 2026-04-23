/**
 * ThemeManager — single source of truth for theme toggling.
 *
 * Base implementation focused on state management and DOM synchronization.
 * Visual components (icons, specific font handling) belong in theme-specific managers.
 */

import { ThemeRegistry } from '@vc/theme/registry';
import type { ThemeDefinition } from '@vc/theme/types';

export type ThemeName = 'light' | 'dark' | string;

export interface ThemeEventBus {
  emit<T = unknown>(event: string, data?: T): void;
}

export interface ActiveTheme {
  id: string;
  variant: ThemeName;
  definition: ThemeDefinition | null;
}

export class ThemeManager {
  constructor(protected bus?: ThemeEventBus) {}

  /**
   * Set EventBus for theme synchronization.
   */
  setBus(bus: ThemeEventBus): void {
    this.bus = bus;
  }

  /**
   * Initialize theme from DOM/cookies and sync DOM.
   */
  init(): void {
    const current = this.getTheme();
    this.applyDom(current);
  }

  /**
   * Get current active theme (id + variant + definition).
   */
  getTheme(): ActiveTheme {
    const id = ThemeRegistry.getCurrentThemeId() ?? ThemeRegistry.getDefaultTheme()?.id ?? 'default';
    const variant = ThemeRegistry.getCurrentVariant() ?? 'dark';
    const definition = ThemeRegistry.getById(id) ?? null;

    return { id, variant, definition };
  }

  /**
   * Set the full theme (id + variant).
   * Updates DOM, cookies, and syncs to server.
   */
  async setTheme(id: string, variant: ThemeName): Promise<void> {
    const definition = ThemeRegistry.getById(id);
    
    // Update DOM
    this.applyDom({ id, variant, definition: definition ?? null });

    if (!definition) {
      if (id !== 'default') {
        console.error(`[ThemeManager] Theme "${id}" not found in registry`);
      }
    }

    // Update cookies
    document.cookie = `theme-id=${id}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.cookie = `theme=${variant}; Path=/; Max-Age=31536000; SameSite=Lax`;

    // Sync to server
    await this.syncToServer(id, variant);
  }

  /**
   * Set variant only (within current theme).
   */
  async setVariant(variant: ThemeName): Promise<void> {
    const current = this.getTheme();
    await this.setTheme(current.id, variant);
  }

  /**
   * Toggle between light and dark within current theme.
   */
  toggle(): void {
    const current = this.getTheme();
    const next: ThemeName = current.variant === 'dark' ? 'light' : 'dark';
    void this.setTheme(current.id, next);
  }

  /**
   * Apply theme to DOM (html attributes).
   */
  protected applyDom(theme: ActiveTheme): void {
    document.documentElement.setAttribute('data-theme-id', theme.id);
    document.documentElement.setAttribute('data-theme', theme.variant);
  }

  /**
   * Placeholder for icon updates (implemented in theme-specific managers).
   */
  updateIcons(_theme?: ThemeName): void {
    // Base implementation does nothing
  }

  /**
   * Placeholder for toggle binding (implemented in theme-specific managers).
   */
  bindToggle(_button: HTMLButtonElement): void {
    // Base implementation does nothing
  }

  /**
   * Sync theme to server via EventBus.
   */
  private async syncToServer(id: string, variant: ThemeName): Promise<void> {
    if (this.bus) {
      this.bus.emit('theme:changed', { id, variant });
    }
  }
}
