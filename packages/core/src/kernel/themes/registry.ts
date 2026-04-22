/**
 * Theme Registry
 *
 * Central registry for all available themes.
 * Themes register themselves via side-effect import.
 *
 * @example
 *   import '@vc/theme-nativa';
 *   const theme = ThemeRegistry.getTheme();        // current theme definition
 *   const all   = ThemeRegistry.listThemes();      // all registered themes
 *   const def   = ThemeRegistry.getDefaultTheme(); // admin default
 */

import type { ThemeDefinition } from './types';

const COOKIE_THEME_ID = 'theme-id';
const COOKIE_DEFAULT_THEME = 'theme-default';

export class ThemeRegistry {
  private static themes = new Map<string, ThemeDefinition>();

  /**
   * Register a theme definition.
   */
  static register(theme: ThemeDefinition): void {
    if (this.themes.has(theme.id)) {
      console.warn(`[ThemeRegistry] Theme "${theme.id}" already registered, overwriting`);
    }
    this.themes.set(theme.id, theme);
  }

  /**
   * Get the current active theme definition (from DOM or registry).
   */
  static getTheme(): ThemeDefinition | null {
    const id = this.getCurrentThemeId();
    if (!id) return null;
    return this.themes.get(id) ?? null;
  }

  /**
   * Get a theme definition by ID.
   */
  static getById(id: string): ThemeDefinition | null {
    return this.themes.get(id) ?? null;
  }

  /**
   * List all registered themes.
   */
  static listThemes(): ThemeDefinition[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get the admin default theme.
   * Priority: admin default cookie > first registered theme.
   */
  static getDefaultTheme(): ThemeDefinition | null {
    const adminDefault = this.getAdminDefault();
    if (adminDefault && this.themes.has(adminDefault)) {
      return this.themes.get(adminDefault)!;
    }
    // Fallback to first registered theme
    const first = this.themes.values().next();
    return first.done ? null : first.value;
  }

  /**
   * Get the current theme ID from DOM or cookie.
   * Priority: <html data-theme-id> > cookie.
   */
  static getCurrentThemeId(): string | null {
    // Check DOM first (server-rendered)
    const domId = document.documentElement.getAttribute('data-theme-id');
    if (domId) return domId;

    // Fallback to cookie
    return this.getCookie(COOKIE_THEME_ID);
  }

  /**
   * Get the current variant from DOM or cookie.
   * Priority: <html data-theme> > cookie.
   */
  static getCurrentVariant(): string | null {
    const domVariant = document.documentElement.getAttribute('data-theme');
    if (domVariant) return domVariant;

    const themeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='));

    return themeCookie ? themeCookie.split('=')[1] : null;
  }

  /**
   * Set the admin default theme (cookie-based, used by /mark/settings).
   */
  static setAdminDefault(themeId: string): void {
    document.cookie = `${COOKIE_DEFAULT_THEME}=${themeId}; Path=/mark; Max-Age=31536000; SameSite=Lax`;
  }

  /**
   * Get the admin default theme ID from cookie.
   */
  static getAdminDefault(): string | null {
    return this.getCookie(COOKIE_DEFAULT_THEME);
  }

  /**
   * Helper: read a cookie by name.
   */
  private static getCookie(name: string): string | null {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  }
}
