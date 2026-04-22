/**
 * Forgot password page — thin kernel page.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from mark/entry-points/mark-forgot-password.ts.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('forgot-password', () => {
  const form = document.getElementById('admin-forgot-password-form') as HTMLFormElement | null;
  if (!form) return;

  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const errorContainer = form.querySelector<HTMLElement>('[data-error]');
  const successContainer = form.querySelector<HTMLElement>('[data-success]');
  const submitUrl = form.dataset.submitUrl || '/mark/forgot-password';

  let isLoading = false;

  function updateUI(): void {
    if (errorContainer) {
      const kernel = AppKernel.getInstance();
      const message = kernel.ui.notification;
      // Error container visibility is handled by showError/clearError
    }

    if (emailInput) {
      emailInput.disabled = isLoading;
    }
    if (submitButton) {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? 'Sending...' : 'Send Reset Link';
    }
  }

  function showError(message: string): void {
    if (errorContainer) {
      errorContainer.removeAttribute('hidden');
      errorContainer.textContent = message;
    }
    if (successContainer) {
      successContainer.setAttribute('hidden', '');
    }
    updateUI();
  }

  function showSuccess(message: string): void {
    if (successContainer) {
      successContainer.removeAttribute('hidden');
      successContainer.textContent = message;
    }
    if (errorContainer) {
      errorContainer.setAttribute('hidden', '');
    }
    updateUI();
  }

  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    if (isLoading) return;

    const email = emailInput?.value.trim() ?? '';
    if (!email) {
      showError('Please enter your email address.');
      return;
    }

    isLoading = true;
    updateUI();

    const kernel = AppKernel.getInstance();
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

    try {
      const data = await kernel.http.post<Record<string, unknown>>(submitUrl, {
        email,
        _token: csrfToken,
      });

      if (data['error']) {
        showError(String(data['error']));
      } else {
        showSuccess('Password reset link sent to your email.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset link.';
      showError(message);
    } finally {
      isLoading = false;
      updateUI();
    }
  }

  form.addEventListener('submit', (e) => {
    void handleSubmit(e as SubmitEvent);
  });
});
