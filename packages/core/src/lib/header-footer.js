/**
 * Header & Footer JavaScript — Backwards Compatibility Wrapper
 *
 * This file re-exports functionality from the new modular architecture:
 * - Header scroll → @lib/header-scroll
 * - Mobile menu → mobile-menu.ts entry point
 * - Theme toggle → @lib/theme-toggle (loaded via core)
 *
 * @deprecated Import @lib/header-scroll directly instead
 */

// Re-export header scroll functionality
import '@vc/core/lib/header-scroll';

// Provide backwards compatible API
console.log('[Header Footer] Loaded (compatibility wrapper)');
