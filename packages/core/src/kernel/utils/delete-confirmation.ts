/**
 * delete-confirmation.ts
 * Shared delete confirmation handler for admin pages.
 *
 * Supports two patterns:
 *   1. Form-based: <form data-confirm="message"> — intercepts submit
 *   2. Button-based: <button data-delete-url="/path"> — triggers fetch DELETE
 *
 * Uses Kernel.http for CSRF-protected requests.
 */

import { AppKernel } from '../app-kernel';
import { NotificationService } from '../ui/notification';

/**
 * Initialize all delete confirmation handlers on the page.
 * Call once on DOMContentLoaded.
 */
export function initDeleteConfirmations(): void {
  initFormDeletes();
  initButtonDeletes();
}

/**
 * Handle forms with data-confirm or data-delete-url attribute.
 */
function initFormDeletes(): void {
  // Handle forms with data-confirm (uses browser confirm)
  const confirmForms = document.querySelectorAll<HTMLFormElement>('form[data-confirm]');
  confirmForms.forEach((form) => {
    const message = form.getAttribute('data-confirm') || 'Are you sure you want to delete this item?';
    form.addEventListener('submit', (e) => {
      if (!window.confirm(message)) {
        e.preventDefault();
      }
    });
  });

  // Handle forms with data-delete-url (uses NotificationService)
  const deleteUrlForms = document.querySelectorAll<HTMLFormElement>('form[data-delete-url]');
  deleteUrlForms.forEach((form) => {
    const message = form.getAttribute('data-delete-confirm') || 'Are you sure you want to delete this item?';
    const url = form.getAttribute('data-delete-url') || '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      NotificationService.showConfirm({
        message,
        confirmText: 'Delete',
        dismissText: 'Cancel',
        duration: 15000,
        onConfirm: () => {
          const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
          if (!csrfToken) {
            NotificationService.error('CSRF token not found. Please refresh the page.');
            return;
          }

          const formData = new FormData(form);
          AppKernel.getInstance().http.request<Record<string, unknown>>(url, {
            method: 'POST',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': csrfToken,
            },
            body: formData,
          })
            .then((data) => {
              if (data['success']) {
                NotificationService.success('Item deleted successfully', 3000);
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              } else {
                NotificationService.error(String(data['error'] || 'Failed to delete'), 8000);
              }
            })
            .catch((err) => {
              NotificationService.error(err.message || 'Error deleting item', 8000);
            });
        },
      });
    });
  });
}

/**
 * Handle buttons/links with data-delete-url attribute.
 */
function initButtonDeletes(): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-delete-url]');
    if (!btn) return;

    const url = btn.getAttribute('data-delete-url');
    if (!url) return;

    const message = btn.getAttribute('data-delete-confirm') || 'Are you sure you want to delete this item?';

    NotificationService.showConfirm({
      message,
      confirmText: 'Delete',
      dismissText: 'Cancel',
      duration: 15000,
      onConfirm: () => {
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        if (!csrfToken) {
          NotificationService.error('CSRF token not found. Please refresh the page.');
          return;
        }

        AppKernel.getInstance().http.request<Record<string, unknown>>(url, {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ _token: csrfToken }),
        })
          .then((data) => {
            if (data['success']) {
              NotificationService.success('Item deleted successfully', 3000);
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              NotificationService.error(String(data['error'] || 'Failed to delete'), 8000);
            }
          })
          .catch((err) => {
            NotificationService.error(err.message || 'Error deleting item', 8000);
          });
      },
    });
  });
}
