// Import and register vanilla-card component
import { VanillaCard } from '../../../components/vanilla-card.js';

if (!customElements.get('vanilla-card')) {
    customElements.define('vanilla-card', VanillaCard);
}

// Form validation logic
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        if (!this.form) return;

        // Real-time validation
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('form-input--error')) {
                    this.validateField(input);
                }
            });
        });

        // Character counter
        const textarea = this.form.querySelector('.form-textarea');
        if (textarea) {
            const counter = document.getElementById('charCount');
            textarea.addEventListener('input', () => {
                if (counter) counter.textContent = textarea.value.length;
            });
        }

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(input) {
        const errorEl = document.getElementById(`${input.id}Error`);
        let isValid = true;

        // Required validation
        if (input.required && !input.value.trim()) {
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
            }
        }

        // Minimum length validation
        if (input.minLength > 0 && input.value.length < input.minLength) {
            isValid = false;
        }

        // Update UI
        if (isValid) {
            input.classList.remove('form-input--error');
            if (errorEl) errorEl.classList.remove('form-error--visible');
        } else {
            input.classList.add('form-input--error');
            if (errorEl) errorEl.classList.add('form-error--visible');
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitBtn = this.form.querySelector('#submitBtn') || this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('btn--loading');
            submitBtn.disabled = true;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Hide loading state
        if (submitBtn) {
            submitBtn.classList.remove('btn--loading');
            submitBtn.disabled = false;
        }

        // Show success message (for contact form)
        if (this.form.id === 'contactForm') {
            const successEl = document.getElementById('formSuccess');
            if (successEl) {
                successEl.classList.add('form-success--visible');
                this.form.reset();
                const charCount = document.getElementById('charCount');
                if (charCount) charCount.textContent = '0';
                
                // Hide success after 5 seconds
                setTimeout(() => {
                    successEl.classList.remove('form-success--visible');
                }, 5000);
            }
        } else if (this.form.id === 'loginForm') {
            alert('Login successful! (This is a demo)');
        }

        console.log('✅ Form submitted successfully');
    }
}

// Initialize forms
new FormValidator('contactForm');
new FormValidator('loginForm');

console.log('✅ Form Card example loaded successfully!');
