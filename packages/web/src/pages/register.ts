/**
 * Register page — kernel page with password strength indicator.
 *
 * Registers itself with the kernel via side-effect import.
 * Migrated from mark/entry-points/mark-register.ts.
 */

import { AppKernel, BaseFormHandler, type BaseFormElements } from '@vc/core';

interface RegisterElements extends BaseFormElements {
  nameInput:            HTMLInputElement | null;
  emailInput:           HTMLInputElement | null;
  passwordInput:        HTMLInputElement | null;
  passwordConfirmInput: HTMLInputElement | null;
  passwordStrength:     HTMLElement      | null;
}

type PasswordStrengthLevel = 'weak' | 'fair' | 'strong' | 'very-strong';

interface PasswordStrengthResult {
  level: PasswordStrengthLevel;
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
}

const MIN_PASSWORD_LEN = 8;

class RegisterHandler extends BaseFormHandler<RegisterElements> {
  constructor(elements: RegisterElements) {
    super('MarkRegister', elements);
  }

  protected getFormId(): string {
    return 'admin-register-form';
  }

  protected getSubmitUrl(): string {
    return '/mark/register';
  }

  protected resolveElements(form: HTMLFormElement): void {
    this.elements.form                 = form;
    this.elements.nameInput            = form.querySelector<HTMLInputElement>('input[name="name"]');
    this.elements.emailInput           = form.querySelector<HTMLInputElement>('input[name="email"]');
    this.elements.passwordInput        = form.querySelector<HTMLInputElement>('input[name="password"]');
    this.elements.passwordConfirmInput = form.querySelector<HTMLInputElement>('input[name="password_confirm"]');
    this.elements.submitButton         = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    this.elements.errorContainer       = form.querySelector<HTMLElement>('[data-error]');
    this.elements.passwordStrength     = form.querySelector<HTMLElement>('[data-password-strength]');
  }

  protected bindEvents(): void {
    super.bindEvents();

    this.elements.nameInput?.addEventListener('input', () => this.clearError());
    this.elements.emailInput?.addEventListener('input', () => this.clearError());

    this.elements.passwordInput?.addEventListener('input', () => {
      this.updatePasswordStrength(this.elements.passwordInput?.value ?? '');
      this.clearError();
    });

    this.elements.passwordConfirmInput?.addEventListener('input', () => this.clearError());
  }

  protected validate(): boolean {
    const name            = this.elements.nameInput?.value.trim()            ?? '';
    const email           = this.elements.emailInput?.value.trim()           ?? '';
    const password        = this.elements.passwordInput?.value               ?? '';
    const passwordConfirm = this.elements.passwordConfirmInput?.value        ?? '';

    if (!name) {
      this.showError('Name is required.');
      this.elements.nameInput?.focus();
      return false;
    }

    if (!email) {
      this.showError('Email is required.');
      this.elements.emailInput?.focus();
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showError('Please enter a valid email address.');
      this.elements.emailInput?.focus();
      return false;
    }

    if (!password) {
      this.showError('Password is required.');
      this.elements.passwordInput?.focus();
      return false;
    }

    if (password.length < MIN_PASSWORD_LEN) {
      this.showError(`Password must be at least ${MIN_PASSWORD_LEN} characters.`);
      this.elements.passwordInput?.focus();
      return false;
    }

    if (password !== passwordConfirm) {
      this.showError('Passwords do not match.');
      this.elements.passwordConfirmInput?.focus();
      return false;
    }

    return true;
  }

  protected buildRequestBody(): Record<string, unknown> {
    return {
      name:             this.elements.nameInput?.value.trim()            ?? '',
      email:            this.elements.emailInput?.value.trim()           ?? '',
      password:         this.elements.passwordInput?.value               ?? '',
      password_confirm: this.elements.passwordConfirmInput?.value        ?? '',
    };
  }

  protected onSuccess(data: Record<string, unknown>): void {
    const redirectUrl = typeof data['redirect_url'] === 'string'
      ? data['redirect_url']
      : '/mark/cardboard';
    window.location.href = redirectUrl;
  }

  // ── Password strength ───────────────────────────────────

  private checkPasswordStrength(password: string): PasswordStrengthResult {
    let score = 0;
    if (password.length >= 8)          score++;
    if (password.length >= 12)         score++;
    if (/[A-Z]/.test(password))        score++;
    if (/[0-9]/.test(password))        score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const capped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
    const map: Record<0 | 1 | 2 | 3 | 4, PasswordStrengthResult> = {
      0: { level: 'weak',        score: 0, label: 'Too short'   },
      1: { level: 'weak',        score: 1, label: 'Weak'        },
      2: { level: 'fair',        score: 2, label: 'Fair'        },
      3: { level: 'strong',      score: 3, label: 'Strong'      },
      4: { level: 'very-strong', score: 4, label: 'Very strong' },
    };

    return map[capped];
  }

  private updatePasswordStrength(password: string): void {
    const el = this.elements.passwordStrength;
    if (!el) return;

    if (!password) {
      el.setAttribute('hidden', '');
      return;
    }

    const result = this.checkPasswordStrength(password);
    el.removeAttribute('hidden');
    el.dataset['level'] = result.level;
    el.textContent = result.label;
  }
}

AppKernel.getInstance().registerPage('register', () => {
  const handler = new RegisterHandler({
    form:                 null,
    nameInput:            null,
    emailInput:           null,
    passwordInput:        null,
    passwordConfirmInput: null,
    submitButton:         null,
    errorContainer:       null,
    passwordStrength:     null,
  });
  handler.init();
});
