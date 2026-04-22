# Form Card Example

> Complete form with validation, error states, and success feedback

## Overview

This example demonstrates a fully functional form card with client-side validation, real-time error feedback, and success states. It includes two form examples:

1. **Contact Form** - Full-featured contact form with validation
2. **Login Form** - Simple authentication form

## Quick Start

### Option 1: Open Directly in Browser

```bash
cd src/Templates/vanilla-cards/examples/bootstrap/03-form-card
python -m http.server 8000
```

Then visit: `http://localhost:8000/src/Templates/vanilla-cards/examples/bootstrap/03-form-card/index.html`

### Option 2: Build with Vite

```bash
cd src/Templates
npm run dev
```

Then visit: `http://localhost:5173/vanilla-cards/examples/bootstrap/03-form-card/index.html`

## Features

### ✅ Client-Side Validation
- Required field validation
- Email format validation
- Minimum/maximum length validation
- Real-time validation on blur and input

### ✅ Error States
- Visual error indicators (red border)
- Error messages below each field
- Error messages hidden when valid

### ✅ Success Feedback
- Success message on form submission
- Loading state during submission
- Form reset after successful submission

### ✅ Accessibility
- Proper label associations
- ARIA attributes for error states
- Keyboard navigation support
- Focus indicators

## Form Components

### 1. Contact Form

**Fields:**
- Name (required, text)
- Email (required, email format)
- Subject (required, select dropdown)
- Message (required, textarea with character counter)
- Newsletter subscription (optional checkbox)

**Variant:** `form`

```html
<vanilla-card variant="form">
    <form class="card--form" id="contactForm">
        <div class="form-group">
            <label for="name" class="form-label form-label--required">Name</label>
            <input type="text" id="name" class="form-input" required>
            <span class="form-error">Please enter your name</span>
        </div>
        <!-- More fields... -->
    </form>
</vanilla-card>
```

### 2. Login Form

**Fields:**
- Email (required, email format)
- Password (required, min 8 characters)
- Remember me (optional checkbox)

**Variant:** `form`

```html
<vanilla-card variant="form">
    <form class="card--form" id="loginForm">
        <div class="form-group">
            <label for="email" class="form-label form-label--required">Email</label>
            <input type="email" id="email" class="form-input" required>
        </div>
        <div class="form-group">
            <label for="password" class="form-label form-label--required">Password</label>
            <input type="password" id="password" class="form-input" required minlength="8">
        </div>
        <button type="submit" class="btn btn--primary">Sign In</button>
    </form>
</vanilla-card>
```

## CSS Classes

### Form Layout

| Class | Description |
|-------|-------------|
| `.card--form` | Form container with flex layout |
| `.form-group` | Individual form field wrapper |
| `.form-actions` | Button container |

### Labels

| Class | Description |
|-------|-------------|
| `.form-label` | Standard label styling |
| `.form-label--required` | Label with required asterisk |

### Inputs

| Class | Description |
|-------|-------------|
| `.form-input` | Text/email/password input |
| `.form-textarea` | Multi-line textarea |
| `.form-select` | Select dropdown |
| `.form-checkbox` | Checkbox input |
| `.form-input--error` | Error state (red border) |

### Messages

| Class | Description |
|-------|-------------|
| `.form-error` | Error message (hidden by default) |
| `.form-error--visible` | Show error message |
| `.form-hint` | Helper text below input |
| `.form-success` | Success message container |
| `.form-success--visible` | Show success message |

## Validation Rules

### Built-in Validators

| Validator | Description | Example |
|-----------|-------------|---------|
| `required` | Field cannot be empty | `required` |
| `email` | Must be valid email format | `type="email"` |
| `minlength` | Minimum character count | `minlength="8"` |
| `maxlength` | Maximum character count | `maxlength="500"` |
| `pattern` | Custom regex pattern | `pattern="[A-Za-z]+"` |

### Custom Validation

Add custom validation via the `FormValidator` class:

```typescript
const validator = new FormValidator('myForm');

// Custom validation logic
validator.validateField(input, {
    customValidator: (value) => {
        return value.length >= 10 && value.includes('@');
    }
});
```

## JavaScript API

### FormValidator Class

```typescript
import { FormValidator } from './form-card.js';

// Initialize validator
const validator = new FormValidator('formId');

// Methods
validator.validateField(input);     // Validate single field
validator.reset();                   // Reset form and validation
validator.showSuccess('Message!');  // Show success message
```

### Events

```javascript
// Listen for form validation success
document.getElementById('contactForm').addEventListener('formValidated', (e) => {
    const formData = e.detail.formData;
    // Handle form submission
});
```

## Form Submission

### Default Behavior

The example includes a simulated API call with loading state:

```javascript
async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    if (!this.validateAll()) return;
    
    // Show loading state
    submitBtn.classList.add('btn--loading');
    
    // Simulate API call
    await fetch('/api/submit', {
        method: 'POST',
        body: new FormData(this.form)
    });
    
    // Hide loading state
    submitBtn.classList.remove('btn--loading');
    
    // Show success
    this.showSuccess('Message sent!');
}
```

### Integration with Backend

Replace the simulated API call with your actual backend:

```javascript
// PHP Backend
const response = await fetch('/api/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    })
});

// Node.js Backend
const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData
});
```

## Character Counter

The message textarea includes a character counter:

```html
<textarea class="form-textarea" maxlength="500"></textarea>
<div class="form-counter">
    <span id="charCount">0</span> / 500 characters
</div>
```

```javascript
// Update counter on input
textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
});
```

## Loading State

Button loading state during form submission:

```css
.btn--loading {
    position: relative;
    color: transparent !important;
    pointer-events: none;
}

.btn--loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
```

## File Structure

```
03-form-card/
├── index.html          # Complete form example
├── form-card.ts        # Form entry-point with validator
└── README.md           # This file
```

## Customization

### Change Error Color

```css
.form-input--error {
    border-color: #your-error-color;
}

.form-input--error:focus {
    box-shadow: 0 0 0 3px rgba(your-error-rgb, 0.1);
}
```

### Add Custom Validation

```javascript
// Add phone number validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('blur', () => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.classList.add('form-input--error');
    }
});
```

### Add File Upload

```html
<div class="form-group">
    <label for="attachment" class="form-label">Attachment</label>
    <input type="file" id="attachment" class="form-input" accept=".pdf,.doc,.docx">
    <span class="form-hint">Max file size: 5MB</span>
</div>
```

## Browser Support

- Chrome/Edge: ✅ Latest
- Firefox: ✅ Latest
- Safari: ✅ Latest
- Mobile: ✅ Responsive

## Accessibility

| Feature | Status |
|---------|--------|
| Label associations | ✅ |
| Error announcements | ✅ |
| Focus indicators | ✅ |
| Keyboard navigation | ✅ |
| Screen reader support | ✅ |

## Best Practices

1. ✅ **Always use labels** - Never rely on placeholders alone
2. ✅ **Show errors inline** - Display errors near the relevant field
3. ✅ **Validate on blur** - Don't wait for submission to show errors
4. ✅ **Provide clear messages** - Tell users exactly what's wrong
5. ✅ **Preserve user input** - Don't clear valid fields on error
6. ✅ **Show success feedback** - Confirm successful submissions
7. ✅ **Handle loading states** - Show progress during async operations

## Next Steps

1. ✅ Customize form fields for your use case
2. ✅ Connect to your backend API
3. ✅ Add file upload support
4. ✅ Implement CAPTCHA for spam protection
5. ✅ Add email notifications

## Related Examples

- **01-basic-card/** - All card variants reference
- **02-cardboard/** - Complete admin dashboard

## Resources

- [BOOTSTRAP_GUIDE.md](../../BOOTSTRAP_GUIDE.md) - Main documentation
- [MDN Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [Web Accessibility Forms](https://www.w3.org/WAI/tutorials/forms/)
