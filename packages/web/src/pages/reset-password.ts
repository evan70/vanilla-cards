/**
 * Reset password page — thin kernel page.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from mark/entry-points/mark-reset-password.ts.
 */

import { AppKernel } from '@vc/core';

AppKernel.getInstance().registerPage('reset-password', () => {
  const form = document.getElementById('admin-reset-password-form') as HTMLFormElement | null;
  if (!form) return;

  const passwordInput = form.querySelector<HTMLInputElement>('input[name="password"]');
  const confirmPasswordInput = form.querySelector<HTMLInputElement>('input[name="password_confirm"]');
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const errorContainer = form.querySelector<HTMLElement>('[data-error]');
  const successContainer = form.querySelector<HTMLElement>('[data-success]');
  const submitUrl = form.dataset.submitUrl || '/mark/reset-password';
  const loginUrl = form.dataset.loginUrl || '/mark/login';
  const token = form.getAttribute('data-token') || '';

  if (!token) {
    if (errorContainer) {
      errorContainer.removeAttribute('hidden');
      errorContainer.textContent = 'Invalid or missing reset token.';
    }
    return;
  }

  let isLoading = false;

  function setLoading(loading: boolean): void {
    isLoading = loading;
    if (passwordInput) passwordInput.disabled = loading;
    if (confirmPasswordInput) confirmPasswordInput.disabled = loading;
    if (submitButton) {
      submitButton.disabled = loading;
      submitButton.textContent = loading ? 'Resetting...' : 'Reset Password';
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
  }

  function showSuccess(message: string): void {
    if (successContainer) {
      successContainer.removeAttribute('hidden');
      successContainer.textContent = message;
    }
    if (errorContainer) {
      errorContainer.setAttribute('hidden', '');
    }
  }

  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    if (isLoading) return;

    const password = passwordInput?.value ?? '';
    const confirmPassword = confirmPasswordInput?.value ?? '';

    if (!password || !confirmPassword) {
      showError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      showError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    showError('');

    const kernel = AppKernel.getInstance();
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

    try {
      const data = await kernel.http.post<Record<string, unknown>>(submitUrl, {
        token,
        password,
        _token: csrfToken,
      });

      if (data['error']) {
        showError(String(data['error']));
      } else {
        showSuccess('Password reset successfully. Redirecting...');
        setTimeout(() => {
          window.location.href = loginUrl;
        }, 2000);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password.';
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener('submit', (e) => {
    void handleSubmit(e as SubmitEvent);
  });
});
