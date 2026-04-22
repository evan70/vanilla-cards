/**
 * Page Card Module - Normalizers
 *
 * Transform raw backend payload into stable UI model.
 * Handles snake_case → camelCase, null values, and legacy fallbacks.
 */

import type { PageCardModel, RawPageCardPayload, MenuItem, FooterLink, FooterSection } from './types';

/**
 * Safe string conversion - returns empty string for null/undefined
 */
function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Safe boolean conversion - returns default for null/undefined
 */
function asBoolean(value: unknown, defaultValue: boolean = false): boolean {
  return typeof value === 'boolean' ? value : defaultValue;
}

/**
 * Normalize menu item from raw payload
 */
function normalizeMenuItem(raw: Record<string, unknown>): MenuItem {
  return {
    name: asString(raw.name),
    href: asString(raw.href),
    page: asString(raw.page),
    active: asBoolean(raw.active, false),
  };
}

/**
 * Normalize footer link from raw payload
 */
function normalizeFooterLink(raw: Record<string, unknown>): FooterLink {
  return {
    label: asString(raw.label),
    href: asString(raw.href),
  };
}

/**
 * Normalize footer section from raw payload
 */
function normalizeFooterSection(raw: Record<string, unknown>): FooterSection {
  const links = raw.links as Array<Record<string, unknown>> | undefined;
  return {
    title: asString(raw.title),
    links: Array.isArray(links) ? links.map(normalizeFooterLink) : [],
  };
}

/**
 * Transform raw backend payload into stable UI model
 *
 * @param raw - Raw payload from data-* attributes (may contain snake_case, null)
 * @returns Normalized UI model with camelCase and safe defaults
 */
export function normalizePageCardPayload(raw: RawPageCardPayload): PageCardModel {
  const menuItems = raw.menuItems as Array<Record<string, unknown>> | undefined;
  const footerSections = raw.footerSections as Array<Record<string, unknown>> | undefined;

  return {
    currentPage: asString(raw.currentPage) || 'home',
    menuItems: Array.isArray(menuItems) ? menuItems.map(normalizeMenuItem) : [],
    footerSections: Array.isArray(footerSections) ? footerSections.map(normalizeFooterSection) : [],
    isGuest: asBoolean(raw.isGuest, true),
    siteName: asString(raw.siteName) || 'Nativa CMS',
    logoText: asString(raw.logoText) || 'responsive.sk',
    showSearch: asBoolean(raw.showSearch, true),
    showLanguageToggle: asBoolean(raw.showLanguageToggle, true),
    showThemeToggle: asBoolean(raw.showThemeToggle, true),
  };
}
