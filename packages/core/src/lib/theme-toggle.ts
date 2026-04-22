/**
 * Theme Toggle — backward-compatible re-export.
 *
 * Actual implementation moved to kernel/ui/theme-manager.ts.
 * This file exists so existing imports continue to work during migration.
 */

import { AppKernel } from '@vc/core';

/**
 * @deprecated Use Kernel.ui.theme.toggle() instead.
 */
export function toggleTheme(): void {
  AppKernel.getInstance().ui.theme.toggle();
}

/**
 * @deprecated Use Kernel.ui.theme.getTheme().variant instead.
 */
export function getCurrentTheme(): 'light' | 'dark' {
  return AppKernel.getInstance().ui.theme.getTheme().variant as 'light' | 'dark';
}

/**
 * @deprecated Use Kernel.ui.theme.updateIcons() instead.
 */
export function updateIcons(theme?: string): void {
  AppKernel.getInstance().ui.theme.updateIcons(theme as 'light' | 'dark');
}

/**
 * @deprecated Use Kernel.ui.theme.bindToggle() instead.
 */
export function bindToggle(button: HTMLButtonElement): void {
  AppKernel.getInstance().ui.theme.bindToggle(button);
}

/**
 * @deprecated Use Kernel.ui.theme.init() instead.
 * Auto-init for backward compatibility.
 */
export function init(): void {
  AppKernel.getInstance().ui.theme.init();
}

// Auto-init on DOM ready (for backward compatibility)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
