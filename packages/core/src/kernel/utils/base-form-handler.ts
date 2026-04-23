/**
 * BaseFormHandler — shared base for auth form handlers.
 *
 * Uses Kernel.http for CSRF-protected requests.
 * Subclasses implement resolveElements, validate, buildRequestBody.
 *
 * @example
 *   class LoginHandler extends BaseFormHandler {
 *     protected resolveElements(form) { ... }
 *     protected validate() { ... }
 *     protected buildRequestBody() { ... }
 *   }
 */

import { AppKernel } from '@kernel/app-kernel';

export interface BaseFormElements {
  form:            HTMLFormElement  | null;
  submitButton:    HTMLButtonElement | null;
  errorContainer:  HTMLElement      | null;
}

// ── Base Class ──────────────────────────────────────────────

export abstract class BaseFormHandler<TElements extends BaseFormElements = BaseFormElements> {
  protected isLoading = false;
  protected error     = '';

  constructor(
    public readonly logPrefix: string,
    public readonly elements: TElements,
  ) {}

  // ── Lifecycle ───────────────────────────────────────────

  init(): void {
    const formId = this.getFormId();
    this.elements.form = document.getElementById(formId) as HTMLFormElement;

    if (!this.elements.form) {
      console.error(`[${this.logPrefix}] Form #${formId} not found`);
      return;
    }

    this.resolveElements(this.elements.form);
    this.bindEvents();
  }

  // ── Subclass hooks ──────────────────────────────────────

  /** Return the form element ID */
  protected abstract getFormId(): string;

  /** Resolve form-specific elements (inputs, etc.) */
  protected abstract resolveElements(form: HTMLFormElement): void;

  /** Build the request body from form values */
  protected abstract buildRequestBody(): Record<string, unknown>;

  /** Validate form values. Return true if valid. */
  protected abstract validate(): boolean;

  /** Return the submit URL */
  protected abstract getSubmitUrl(): string;

  /** Handle successful submission (redirect, etc.) */
  protected abstract onSuccess(data: Record<string, unknown>): void;

  // ── Shared logic ────────────────────────────────────────

  protected bindEvents(): void {
    this.elements.form?.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      void this.handleSubmit();
    });
  }

  protected async handleSubmit(): Promise<void> {
    if (this.isLoading) return;
    if (!this.validate()) return;

    this.setLoading(true);
    this.clearError();

    const kernel = AppKernel.getInstance();

    try {
      const body = this.buildRequestBody();
      const data = await kernel.http.post<Record<string, unknown>>(this.getSubmitUrl(), body);

      if (data['success']) {
        this.onSuccess(data);
      } else {
        this.showError(String(data['error'] ?? 'Action failed. Please try again.'));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error. Please check your connection.';
      kernel.ui.notification.error(message);
      this.showError(message);
    } finally {
      this.setLoading(false);
    }
  }

  // ── UI helpers ──────────────────────────────────────────

  setLoading(loading: boolean): void {
    this.isLoading = loading;

    if (this.elements.submitButton) {
      this.elements.submitButton.disabled = loading;
      this.elements.submitButton.classList.toggle('auth-card__form-submit--loading', loading);
    }

    const inputs = this.elements.form?.querySelectorAll<HTMLInputElement>('input');
    inputs?.forEach(input => { input.disabled = loading; });
  }

  showError(message: string): void {
    this.error = message;
    const el = this.elements.errorContainer;
    if (!el) return;

    el.textContent = message;
    el.classList.remove('auth-alert--success');
    el.classList.add('auth-alert', 'auth-alert--error');
    el.removeAttribute('hidden');
  }

  clearError(): void {
    if (!this.error) return;
    this.error = '';

    const el = this.elements.errorContainer;
    if (!el) return;

    el.setAttribute('hidden', '');
    el.textContent = '';
  }
}
