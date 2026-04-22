/**
 * categories.page.ts — Category tree toggle.
 *
 * Migrated from mark-categories.ts.
 * No HTTP — pure DOM logic.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('categories', () => {
  document.querySelectorAll<HTMLButtonElement>('[data-action="toggle-children"]').forEach((btn) => {
    btn.addEventListener('click', function () {
      const node     = this.closest('.category-node');
      const children = node?.querySelector('.category-node__children');
      if (!children) return;

      children.classList.toggle('hidden');
      this.textContent = children.classList.contains('hidden') ? 'Show Children' : 'Hide Children';
    });
  });
});
