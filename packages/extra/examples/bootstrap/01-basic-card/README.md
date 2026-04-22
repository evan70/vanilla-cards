# Basic Card Example

> Complete reference for all 11 vanilla-card variants

## Overview

This example demonstrates all card variants available in the Vanilla Cards library. Each variant is designed for specific use cases and comes with appropriate styling and behavior.

## Quick Start

### Option 1: Open Directly in Browser

```bash
# Navigate to the example directory
cd src/Templates/vanilla-cards/examples/bootstrap/01-basic-card

# Open in browser (requires local server)
open index.html
```

**Note:** For proper module loading, use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000/src/Templates/vanilla-cards/examples/bootstrap/01-basic-card/index.html`

### Option 2: Build with Vite

```bash
cd src/Templates
npm run dev
```

Then visit: `http://localhost:5173/vanilla-cards/examples/bootstrap/01-basic-card/index.html`

## Card Variants

### 1. Elevated (Default)
- **Use case:** General content cards, articles, products
- **Features:** Shadow elevation for depth
- **HTML:** `<vanilla-card variant="elevated">`

### 2. Filled
- **Use case:** Highlighted content, call-to-action
- **Features:** Background fill for emphasis
- **HTML:** `<vanilla-card variant="filled">`

### 3. Outlined
- **Use case:** Secondary content, settings, options
- **Features:** Border outline, minimal styling
- **HTML:** `<vanilla-card variant="outlined">`

### 4. Stats
- **Use case:** Cardboard metrics, KPIs, statistics
- **Features:** Icon, large value, label
- **HTML:** `<vanilla-card variant="stats">`

### 5. List
- **Use case:** Article lists, navigation menus, recent items
- **Features:** List with links and metadata
- **HTML:** `<vanilla-card variant="list">`

### 6. Table
- **Use case:** Data tables, comparisons, financial data
- **Features:** Structured table layout
- **HTML:** `<vanilla-card variant="table">`

### 7. Horizontal (with media)
- **Use case:** Product cards, media articles, profiles
- **Features:** Media slot, content slot, actions slot
- **HTML:** `<vanilla-card variant="horizontal">`

### 8. Actions
- **Use case:** Action menus, quick operations, cardboards
- **Features:** Button group layout
- **HTML:** `<vanilla-card variant="actions">`

### 9. Chart
- **Use case:** Analytics, trends, data visualization
- **Features:** Chart.js canvas container
- **HTML:** `<vanilla-card variant="chart">`

### 10. Form
- **Use case:** Contact forms, login, quick input
- **Features:** Form layout with inputs
- **HTML:** `<vanilla-card variant="form">`

### 11. Project
- **Use case:** Portfolio projects, case studies, work samples
- **Features:** Image, content, metadata
- **HTML:** `<vanilla-card variant="project">`

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | `'elevated'` | Card variant |
| `clickable` | boolean | `false` | Makes card clickable |
| `disabled` | boolean | `false` | Disables card interactions |
| `href` | string | `null` | URL for navigation |
| `tabindex` | number | `null` | Tab order |

## Slots

| Slot Name | Description |
|-----------|-------------|
| (default) | Default content slot |
| `media` | Media slot (image, video) for horizontal variant |
| `content` | Content slot for horizontal variant |
| `actions` | Actions slot (buttons) for horizontal variant |

## Events

```javascript
const card = document.querySelector('vanilla-card');

// Click event
card.addEventListener('click', (e) => {
    console.log('Card clicked!', e);
});

// Focus event
card.addEventListener('focus', () => {
    console.log('Card focused');
});

// Blur event
card.addEventListener('blur', () => {
    console.log('Card blurred');
});
```

## File Structure

```
01-basic-card/
├── index.html          # Complete example with all variants
├── basic-card.ts       # Minimal entry-point
└── README.md           # This file
```

## Customization

### CSS Variables

Override design tokens to customize appearance:

```css
:root {
    --brand-gold: #your-color;
    --radius-md: your-radius;
    --space-6: your-spacing;
}
```

### Custom Styles

Add custom styles after loading vanilla-cards CSS:

```html
<link rel="stylesheet" href="../../../styles/components/card.css">
<style>
    .my-custom-card {
        /* Your custom styles */
    }
</style>
```

## Related Examples

- **02-cardboard/** - Complete cardboard with stats, charts, and lists
- **03-form-card/** - Form with validation and submission

## Next Steps

1. ✅ Try all variants in your browser
2. ✅ Modify the HTML to create your own cards
3. ✅ Check out the cardboard example
4. ✅ Read the main [BOOTSTRAP_GUIDE.md](../../BOOTSTRAP_GUIDE.md)

## Support

For issues or questions, refer to the main [BOOTSTRAP_GUIDE.md](../../BOOTSTRAP_GUIDE.md) or check the [Troubleshooting section](../../BOOTSTRAP_GUIDE.md#troubleshooting).
