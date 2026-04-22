/**
 * Page Card Module - Type Definitions
 *
 * Type-safe interfaces for page card orchestrator component.
 */

/**
 * Navigation menu item
 */
export interface MenuItem {
  name: string;
  href: string;
  page: string;
  active?: boolean;
}

/**
 * Footer link item
 */
export interface FooterLink {
  label: string;
  href: string;
}

/**
 * Footer section with title and links
 */
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * Normalized UI model - camelCase, stable defaults
 * This is what the controller works with internally
 */
export interface PageCardModel {
  currentPage: string;
  menuItems: MenuItem[];
  footerSections: FooterSection[];
  isGuest: boolean;
  siteName: string;
  logoText: string;
  showSearch: boolean;
  showLanguageToggle: boolean;
  showThemeToggle: boolean;
}

/**
 * Raw payload from backend - may contain snake_case, null values, legacy fields
 */
export type RawPageCardPayload = Record<string, unknown> & {
  currentPage?: string | null;
  menuItems?: Array<Record<string, unknown>> & {
    name?: string | null;
    href?: string | null;
    page?: string | null;
    active?: boolean | null;
  };
  footerSections?: Array<Record<string, unknown>> & {
    title?: string | null;
    links?: Array<Record<string, unknown>> & {
      label?: string | null;
      href?: string | null;
    };
  };
  isGuest?: boolean | null;
  siteName?: string | null;
  logoText?: string | null;
  showSearch?: boolean | null;
  showLanguageToggle?: boolean | null;
  showThemeToggle?: boolean | null;
};

/**
 * Configuration object passed to controller
 */
export interface PageCardConfig {
  pageData: PageCardModel;
}
