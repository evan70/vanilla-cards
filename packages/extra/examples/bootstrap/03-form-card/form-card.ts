/**
 * Vanilla Cards Bootstrap - Form Card Entry-Point
 * 
 * Entry-point for form examples with validation utilities.
 * Includes core vanilla-card component and form validation.
 */

// Import core component
import { VanillaCard } from '@vc/core';

// Import utilities
import { RippleEffect } from '@vc/core/lib/ripple-effect';
import { onDomReady } from '@vc/core/lib/dom-ready';

/**
 * Form Validation Options
 */
interface ValidationOptions {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    pattern?: RegExp;
    customValidator?: (value: string) => boolean;
}

/**
 * Form Validator Class
 * Handles client-side form validation
 */
class FormValidator {
    private form: HTMLFormElement | null;
    private errorClass = 'form-input--error';
    private visibleClass = 'form-error--visible';

    constructor(formId: string) {
        this.form = document.getElementById(formId) as HTMLFormElement | null;
        if (this.form) {
            this.init();
        }
    }

    /**
     * Initialize form validator
     */
    private init(): void {
        if (!this.form) return;

        // Register vanilla-card if not already registered
        if (!customElements.get('vanilla-card')) {
            customElements.define('vanilla-card', VanillaCard);
        }

        // Add blur validators to required fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input as any));
            input.addEventListener('input', () => {
                if ((input as HTMLElement).classList.contains(this.errorClass)) {
                    this.validateField(input as any);
                }
            });
        });

        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Validate a single field
     */
    validateField(input: HTMLElement & { value: string; type: string; required: boolean; minLength: number }): boolean {
        const errorEl = document.getElementById(`${input.id}Error`);
        let isValid = true;
        const value = input.value.trim();

        // Required validation
        if (input.required && !value) {
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Minimum length validation
        if (input.minLength > 0 && value.length < input.minLength) {
            isValid = false;
        }

        // Update UI
        this.setFieldValidity(input, errorEl, isValid);

        return isValid;
    }

    /**
     * Set field validity UI
     */
    private setFieldValidity(input: HTMLElement, errorEl: HTMLElement | null, isValid: boolean): void {
        if (isValid) {
            input.classList.remove(this.errorClass);
            if (errorEl) errorEl.classList.remove(this.visibleClass);
        } else {
            input.classList.add(this.errorClass);
            if (errorEl) errorEl.classList.add(this.visibleClass);
        }
    }

    /**
     * Handle form submission
     */
    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.form) return;

        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input as any)) {
                isValid = false;
            }
        });

        if (!isValid) {
            console.warn('❌ Form validation failed');
            return;
        }

        console.log('✅ Form validation passed - ready to submit');
        
        // Dispatch custom event for parent components to handle
        this.form.dispatchEvent(new CustomEvent('formValidated', {
            bubbles: true,
            detail: { formData: new FormData(this.form) }
        }));
    }

    /**
     * Reset form and validation state
     */
    reset(): void {
        if (!this.form) return;

        this.form.reset();
        
        // Clear all error states
        const errorInputs = this.form.querySelectorAll(`.${this.errorClass}`);
        errorInputs.forEach(input => {
            input.classList.remove(this.errorClass);
        });

        const errorMessages = this.form.querySelectorAll(`.${this.visibleClass}`);
        errorMessages.forEach(error => {
            error.classList.remove(this.visibleClass);
        });
    }

    /**
     * Show success message
     */
    showSuccess(message: string, duration = 5000): void {
        if (!this.form) return;

        let successEl = this.form.querySelector('.form-success');
        if (!successEl) {
            successEl = document.createElement('div');
            successEl.className = 'form-success';
            this.form.insertBefore(successEl, this.form.firstChild);
        }

        successEl.textContent = message;
        successEl.classList.add('form-success--visible');

        setTimeout(() => {
            successEl?.classList.remove('form-success--visible');
        }, duration);
    }
}

/**
 * Initialize form validators on DOM ready
 */
onDomReady(() => {
    console.log('✅ Form Card Bootstrap initialized');
});

// Export for programmatic usage
export { VanillaCard, FormValidator, RippleEffect };
