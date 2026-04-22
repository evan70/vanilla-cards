# Vanilla Cards Bootstrap Examples

> Complete working examples for getting started with Vanilla Cards

## Overview

This directory contains complete, working examples of Vanilla Cards components. Each example is self-contained and can be opened directly in a browser or integrated into your project.

## Quick Start

### Option 1: View Examples Directly

Start a local server and open the examples:

```bash
cd src/Templates/vanilla-cards/examples/bootstrap
python -m http.server 8000
```

Then visit:
- **Main Guide:** `http://localhost:8000/../BOOTSTRAP_GUIDE.md`
- **Example 1:** `http://localhost:8000/01-basic-card/index.html`
- **Example 2:** `http://localhost:8000/02-cardboard/index.html`
- **Example 3:** `http://localhost:8000/03-form-card/index.html`

### Option 2: Build with Vite

```bash
cd src/Templates
npm run build:vanilla-cards
```

Built assets will be in: `public/assets/vanilla-cards/`

## Examples

### 1. Basic Card (01-basic-card/)

**Complete reference for all 11 card variants**

- ✅ Elevated, Filled, Outlined
- ✅ Stats, List, Table
- ✅ Horizontal, Actions, Chart
- ✅ Form, Project

**Files:**
- `index.html` - Interactive demo with all variants
- `basic-card.ts` - Minimal entry-point
- `README.md` - Usage guide

**Best for:** Learning all card variants

---

### 2. Cardboard (02-cardboard/)

**Complete admin cardboard example**

- ✅ 4x Stats cards with trends
- ✅ Bar chart (CSS-only demo)
- ✅ Activity table
- ✅ Recent articles list
- ✅ Quick links actions
- ✅ Recent comments list

**Files:**
- `index.html` - Full cardboard layout
- `cardboard.ts` - Cardboard controller
- `README.md` - Integration guide

**Best for:** Admin panels, analytics cardboards

---

### 3. Form Card (03-form-card/)

**Complete forms with validation**

- ✅ Contact form with validation
- ✅ Login form
- ✅ Real-time error feedback
- ✅ Success states
- ✅ Loading states
- ✅ Character counter

**Files:**
- `index.html` - Working form examples
- `form-card.ts` - Form validator class
- `README.md` - Validation guide

**Best for:** Contact forms, login, user input

---

### 4. PHP Integration (php-integration.php)

**PHP template integration examples**

- ✅ Basic card rendering
- ✅ Helper functions
- ✅ Stats card helper
- ✅ List card helper
- ✅ Form card helper

**Files:**
- `php-integration.php` - Complete PHP examples

**Best for:** PHP CMS integration

---

## File Structure

```
bootstrap/
├── 01-basic-card/
│   ├── index.html          # All 11 variants demo
│   ├── basic-card.ts       # Entry-point
│   └── README.md           # Usage guide
├── 02-cardboard/
│   ├── index.html          # Cardboard layout
│   ├── cardboard.ts        # Cardboard controller
│   └── README.md           # Integration guide
├── 03-form-card/
│   ├── index.html          # Form examples
│   ├── form-card.ts        # Form validator
│   └── README.md           # Validation guide
├── php-integration.php     # PHP helpers
└── README.md               # This file
```

## Usage in Your Project

### Step 1: Copy Examples

```bash
# Copy the examples directory to your project
cp -r vanilla-cards/examples/bootstrap my-project/examples
```

### Step 2: Build Assets

```bash
cd vanilla-cards
npm run build:vanilla-cards
```

### Step 3: Include in HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/assets/vanilla-cards/bootstrap.v1.0.0.js">
</head>
<body>
    <vanilla-card variant="elevated">
        <h3 class="card__title">Hello!</h3>
    </vanilla-card>
    
    <script type="module" src="/assets/vanilla-cards/bootstrap.v1.0.0.js" defer></script>
</body>
</html>
```

## Entry-Points

The bootstrap entry-point exports minimal components:

```typescript
// bootstrap.ts exports:
export { 
    VanillaCard,      // Main card component
    RippleEffect,     // Ripple effect utility
    escapeHtml,       // HTML escape helper
    onDomReady,       // DOM ready helper
    init              // Initialization function
};
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest ✅ |
| Firefox | Latest ✅ |
| Safari | Latest ✅ |
| Edge | Latest ✅ |
| Mobile Safari | iOS 12+ ✅ |
| Chrome Mobile | Android 5+ ✅ |

## Performance

| Metric | Value |
|--------|-------|
| Bundle Size (gzip) | ~8KB |
| First Paint | < 200ms |
| Interactive | < 500ms |
| No Dependencies | ✅ |

## Customization

### Change Theme Colors

```css
:root {
    --brand-gold: #your-primary;
    --brand-sapphire: #your-secondary;
    --brand-emerald: #your-accent;
}
```

### Add Custom Styles

```css
/* After loading vanilla-cards CSS */
.my-custom-card {
    /* Your overrides */
}
```

## Troubleshooting

### Cards Not Rendering

1. Check CSS is loaded
2. Check JavaScript is loaded
3. Verify custom element is registered: `customElements.get('vanilla-card')`

### Styles Not Applying

1. Verify CSS file path
2. Check for CSS conflicts
3. Inspect element for applied styles

### Build Failing

1. Run `npm install`
2. Clear cache: `rm -rf node_modules/.vite`
3. Check Node.js version (18+)

## Resources

- **[BOOTSTRAP_GUIDE.md](../BOOTSTRAP_GUIDE.md)** - Main documentation
- **[Card Variants](../BOOTSTRAP_GUIDE.md#component-reference)** - All 11 variants
- **[Troubleshooting](../BOOTSTRAP_GUIDE.md#troubleshooting)** - Common issues

## Next Steps

1. ✅ Try all examples in your browser
2. ✅ Copy examples to your project
3. ✅ Customize for your needs
4. ✅ Read the main BOOTSTRAP_GUIDE.md
5. ✅ Build for production

## License

Same as Vanilla Cards main project.

---

**Happy Coding!** 🎴
