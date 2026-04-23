/**
 * Theme Definition Types
 *
 * Each theme defines its ID, display name, variants, fonts, and behavior.
 *
 * @example
 *   const nativa: ThemeDefinition = {
 *     id: 'nativa',
 *     name: 'Nativa',
 *     variants: ['dark', 'light'],
 *     defaultVariant: 'dark',
 *     fonts: { heading: 'Playfair Display', body: 'Inter' },
 *   };
 */

export interface ThemeFontConfig {
  heading: string;
  body: string;
}

export interface ThemeDefinition {
  /** Unique identifier, used in data-theme-id attribute and cookie */
  id: string;
  /** Display name for settings UI */
  name: string;
  /** Available variants (e.g., 'dark', 'light', 'amber', etc.) */
  variants: string[];
  /** Default variant when user has no preference */
  defaultVariant: string;
  /** Font configuration */
  fonts: ThemeFontConfig;
}
