/**
 * Login page — thin kernel page for mark login form.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from mark/entry-points/mark-login.ts.
 *
 * Uses Kernel.http for CSRF-protected POST.
 * Uses Kernel.auth.setUser() on success.
 * Uses Kernel.ui.notification for errors.
 */

import { AppKernel } from '@vc/core';

interface LoginElements {
  form: HTMLFormElement | null;
  emailInput: HTMLInputElement | null;
  passwordInput: HTMLInputElement | null;
  rememberCheckbox: HTMLInputElement | null;
  submitButton: HTMLButtonElement | null;
  errorContainer: HTMLElement | null;
}

interface LoginResponse {
  success: boolean;
  redirect_url?: string;
  error?: string;
  user?: {
    id: number | string;
    name: string;
    email: string;
    role: string;
  };
}

const MIN_PASSWORD_LEN = 8;

AppKernel.getInstance().registerPage('login', () => {
  const form = document.getElementById('admin-login-form') as HTMLFormElement | null;
  if (!form) return;

  const elements: LoginElements = {
    form,
    emailInput: form.querySelector<HTMLInputElement>('input[name="email"]'),
    passwordInput: form.querySelector<HTMLInputElement>('input[name="password"]'),
    rememberCheckbox: form.querySelector<HTMLInputElement>('input[name="remember_me"]'),
    submitButton: form.querySelector<HTMLButtonElement>('button[type="submit"]'),
    errorContainer: form.querySelector<HTMLElement>('[data-error]'),
  };

  let rememberMe = false;
  let isLoading = false;

  // --- UI helpers ---

  function setLoading(loading: boolean): void {
    isLoading = loading;
    elements.submitButton && (elements.submitButton.disabled = loading);
    elements.submitButton?.classList.toggle('auth-card__form-submit--loading', loading);
    const inputs = (form as HTMLFormElement).querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => { input.disabled = loading; });
  }

  function showError(message: string): void {
    const errEl = elements.errorContainer;
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.remove('auth-alert--success');
      errEl.classList.add('auth-alert', 'auth-alert--error');
      errEl.removeAttribute('hidden');
    }
  }

  function clearError(): void {
    const errEl = elements.errorContainer;
    if (!errEl?.textContent) return;
    errEl.setAttribute('hidden', '');
    errEl.textContent = '';
  }

  // --- Validation ---

  function validate(): boolean {
    const email = elements.emailInput?.value.trim() ?? '';
    const password = elements.passwordInput?.value ?? '';

    if (!email) {
      showError('Email is required.');
      elements.emailInput?.focus();
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      elements.emailInput?.focus();
      return false;
    }

    if (!password) {
      showError('Password is required.');
      elements.passwordInput?.focus();
      return false;
    }

    if (password.length < MIN_PASSWORD_LEN) {
      showError(`Password must be at least ${MIN_PASSWORD_LEN} characters.`);
      elements.passwordInput?.focus();
      return false;
    }

    return true;
  }

  // --- Submit ---

  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    if (isLoading) return;
    if (!validate()) return;

    setLoading(true);
    clearError();

    const kernel = AppKernel.getInstance();
    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

    try {
      const data = await kernel.http.post<LoginResponse>('/mark/login', {
        email: elements.emailInput?.value.trim() ?? '',
        password: elements.passwordInput?.value ?? '',
        remember_me: rememberMe,
        _token: csrfToken,
      });

      if (data.success) {
        if (data.user) {
          kernel.auth.setUser(data.user);
        }
        window.location.href = data.redirect_url ?? '/mark/cardboard';
      } else {
        showError(data.error ?? 'Action failed. Please try again.');
      }
    } catch (err) {
      kernel.ui.notification.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  // --- Events ---

  elements.emailInput?.addEventListener('input', clearError);
  elements.passwordInput?.addEventListener('input', clearError);

  elements.rememberCheckbox?.addEventListener('change', () => {
    rememberMe = elements.rememberCheckbox?.checked ?? false;
  });

  form.addEventListener('submit', (e) => {
    void handleSubmit(e);
  });
});
