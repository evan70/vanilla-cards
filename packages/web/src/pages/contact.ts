/**
 * Contact page — thin kernel page.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from entry-points/contact.ts.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('contact', () => {
  const messageTextarea = document.getElementById('message') as HTMLTextAreaElement | null;
  const charCount = document.getElementById('char-count');

  if (!messageTextarea || !charCount) {
    return;
  }

  const update = () => {
    if (!charCount) return;
    charCount.textContent = String(messageTextarea.value.length);
    const parent = charCount.parentElement;
    if (parent) {
      parent.classList.toggle(
        'contact-form__counter--warning',
        messageTextarea.value.length > 4500,
      );
    }
  };

  update();
  messageTextarea.addEventListener('input', update);
});
