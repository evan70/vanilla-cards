# Vanilla Cards Bootstrap Guide

> Quick start guide for using Vanilla Cards web components in your projects

## Table of Contents

- [Quick Start (5 minutes)](#quick-start-5-minutes)
- [What are Vanilla Cards?](#what-are-vanilla-cards)
- [Architecture Overview](#architecture-overview)
- [Component Reference](#component-reference)
- [Build System](#build-system)
- [Integration with PHP CMS](#integration-with-php-cms)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Quick Start (5 minutes)

### Step 1: Include the Bootstrap Entry-Point

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla Cards Example</title>
    <link rel="stylesheet" href="/assets/vanilla-cards/styles/main.css">
</head>
<body>
    <!-- Your vanilla-card components here -->
    
    <script type="module" src="/assets/vanilla-cards/bootstrap.js" defer></script>
</body>
</html>
```

### Step 2: Use Your First Card

```html
<vanilla-card variant="elevated">
    <h3 class="card__title">Hello World!</h3>
    <p class="card__description">This is my first vanilla-card</p>
</vanilla-card>
```

### Step 3: Build (Development)

```bash
cd src/Templates
npm run build:vanilla-cards
```

That's it! Your card should now render with full styling and interactivity.

---

## What are Vanilla Cards?

**Vanilla Cards** is a lightweight web components library built with:

- ✅ **Vanilla TypeScript** - No framework dependencies
- ✅ **Web Components** - Native custom elements
- ✅ **BEM CSS** - Modular, maintainable styling
- ✅ **Design Tokens** - Consistent theming
- ✅ **Zero Runtime** - Compiled to static assets

### Key Features

| Feature | Description |
|---------|-------------|
| **11 Card Variants** | elevated, filled, outlined, horizontal, stats, list, table, chart, actions, form, project |
| **Slot-Based API** | Composable content with named slots |
| **Click & Focus** | Built-in interaction handling |
| **Ripple Effect** | Material Design ripple on click |
| **Accessible** | ARIA attributes, keyboard navigation |
| **Responsive** | Mobile-first design |

---

## Architecture Overview

```
vanilla-cards/
├── components/          # Web Components
│   ├── vanilla-card.ts  # Main card component
│   └── *.ts            # Other components
├── entry-points/        # Build entry points
│   ├── bootstrap.ts    # [STAR] Minimal starter (THIS)
│   ├── core.ts         # Frontend core
│   └── *.ts            # Other entry points
├── styles/             # CSS stylesheets
│   ├── core/          # Core styles
│   ├── components/    # Component styles
│   └── pages/         # Page-specific styles
├── lib/               # Utilities
│   ├── ripple-effect.ts
│   ├── dom-ready.ts
│   └── *.ts
└── examples/bootstrap/ # 📚 Bootstrap examples
    ├── 01-basic-card/
    ├── 02-cardboard/
    └── 03-form-card/
```

### How It Works

1. **Custom Element** - `<vanilla-card>` is registered via `customElements.define()`
2. **Light DOM** - Content stays in Light DOM for SEO and accessibility
3. **CSS Classes** - BEM naming for styling (`.card__title`, `.card__description`)
4. **TypeScript** - Compiled to ES2020 modules
5. **Vite Build** - Bundled and minified for production

---

## Component Reference

### `<vanilla-card>` Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | string | `'elevated'` | Card variant (see below) |
| `clickable` | boolean | `false` | Makes card clickable |
| `disabled` | boolean | `false` | Disables card interactions |
| `href` | string | `null` | URL for navigation |
| `tabindex` | number | `null` | Tab order (-1 for programmatic focus) |

### Card Variants

#### 1. Elevated (Default)
```html
<vanilla-card variant="elevated">
    <h3 class="card__title">Elevated Card</h3>
    <p class="card__description">With shadow elevation</p>
</vanilla-card>
```

#### 2. Filled
```html
<vanilla-card variant="filled">
    <h3 class="card__title">Filled Card</h3>
    <p class="card__description">With background fill</p>
</vanilla-card>
```

#### 3. Outlined
```html
<vanilla-card variant="outlined">
    <h3 class="card__title">Outlined Card</h3>
    <p class="card__description">With border outline</p>
</vanilla-card>
```

#### 4. Horizontal (with media)
```html
<vanilla-card variant="horizontal">
    <img slot="media" src="image.jpg" alt="Example" loading="lazy">
    <div slot="content">
        <h3 class="card__title">Horizontal Card</h3>
        <p class="card__description">Media on the side</p>
    </div>
    <div slot="actions">
        <button class="btn btn--primary">Action</button>
    </div>
</vanilla-card>
```

#### 5. Stats
```html
<vanilla-card variant="stats">
    <div class="card--stats__icon">
        <svg><!-- icon --></svg>
    </div>
    <p class="card--stats__value">1,234</p>
    <p class="card--stats__label">Total Views</p>
</vanilla-card>
```

#### 6. List
```html
<vanilla-card variant="list">
    <ul class="card--list">
        <li class="card--list__item">
            <a href="/article-1" class="card--list__link">Article 1</a>
        </li>
        <li class="card--list__item">
            <a href="/article-2" class="card--list__link">Article 2</a>
        </li>
    </ul>
</vanilla-card>
```

#### 7. Table
```html
<vanilla-card variant="table">
    <table class="card--table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Users</td>
                <td>150</td>
            </tr>
        </tbody>
    </table>
</vanilla-card>
```

#### 8. Chart
```html
<vanilla-card variant="chart">
    <div class="card--chart__header">
        <h3 class="card__title">Views Over Time</h3>
    </div>
    <div class="card--chart__canvas">
        <canvas id="viewsChart"></canvas>
    </div>
</vanilla-card>
```

#### 9. Actions
```html
<vanilla-card variant="actions">
    <h3 class="card__title">Quick Actions</h3>
    <div class="card--actions">
        <button class="btn btn--primary">Create</button>
        <button class="btn btn--secondary">Edit</button>
        <button class="btn btn--danger">Delete</button>
    </div>
</vanilla-card>
```

#### 10. Form
```html
<vanilla-card variant="form">
    <h3 class="card__title">Contact Form</h3>
    <form class="card--form">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-input">
        </div>
        <button type="submit" class="btn btn--primary">Submit</button>
    </form>
</vanilla-card>
```

#### 11. Project
```html
<vanilla-card variant="project">
    <div class="card--project__image-wrapper">
        <img src="project.jpg" alt="Project" class="card--project__image">
    </div>
    <div class="card--project__content">
        <h3 class="card__title">Project Name</h3>
        <p class="card__description">Project description...</p>
        <div class="card--project__meta">
            <span class="card--project__category">Web Development</span>
        </div>
    </div>
</vanilla-card>
```

### Events

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

---

## Build System

### Development Mode

```bash
cd src/Templates
npm run dev
```

- Hot module replacement (HMR)
- Source maps enabled
- Unminified output

### Production Build

```bash
npm run build:vanilla-cards
```

- Minified output
- Tree-shaking
- Optimized for production

### Build Output

```
public/assets/vanilla-cards/
├── bootstrap.js          # [STAR] Bootstrap entry-point
├── bootstrap.js.map      # Source map
├── styles/
│   └── main.css         # Compiled CSS
└── *.js                 # Other entry-points
```

### Vite Configuration

The bootstrap entry-point is defined in `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        bootstrap: 'src/Templates/vanilla-cards/entry-points/bootstrap.ts',
        // ... other entry points
      }
    }
  }
})
```

---

## Integration with PHP CMS

### Using in PHP Templates

```php
<?php
// In your PHP template file
$bootstrapJs = '/assets/vanilla-cards/bootstrap.js';
$bootstrapCss = '/assets/vanilla-cards/styles/main.css';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $this->e($pageTitle); ?></title>
    <link rel="stylesheet" href="<?php echo $bootstrapCss; ?>">
</head>
<body>
    <vanilla-card variant="elevated">
        <h3 class="card__title"><?php echo $this->e($cardTitle); ?></h3>
        <p class="card__description"><?php echo $this->e($cardDescription); ?></p>
    </vanilla-card>
    
    <script type="module" src="<?php echo $bootstrapJs; ?>" defer></script>
</body>
</html>
```

### Using with Smarty/Twig

```twig
{# Twig template #}
<vanilla-card variant="stats">
    <div class="card--stats__icon">
        {{ svg_icon('chart') }}
    </div>
    <p class="card--stats__value">{{ stats.views|number_format }}</p>
    <p class="card--stats__label">Total Views</p>
</vanilla-card>

<script type="module" src="{{ asset('vanilla-cards/bootstrap.js') }}" defer></script>
```

---

## Common Patterns

### Pattern 1: Card Grid Layout

```html
<div class="card-grid">
    <vanilla-card variant="stats">...</vanilla-card>
    <vanilla-card variant="stats">...</vanilla-card>
    <vanilla-card variant="stats">...</vanilla-card>
    <vanilla-card variant="stats">...</vanilla-card>
</div>

<style>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
}
</style>
```

### Pattern 2: Clickable Card with Navigation

```html
<vanilla-card clickable href="/article/slug" tabindex="0">
    <h3 class="card__title">Clickable Article</h3>
    <p class="card__description">Click to navigate</p>
</vanilla-card>
```

### Pattern 3: Card with Ripple Effect

```html
<vanilla-card clickable variant="filled">
    <h3 class="card__title">Ripple Card</h3>
    <p class="card__description">Click for ripple effect</p>
</vanilla-card>
```

### Pattern 4: Dynamic Content Loading

```javascript
// Fetch and populate card content
async function loadCardData(cardId) {
    const response = await fetch(`/api/cards/${cardId}`);
    const data = await response.json();
    
    const card = document.querySelector(`#card-${cardId}`);
    card.querySelector('.card__title').textContent = data.title;
    card.querySelector('.card__description').textContent = data.description;
}
```

### Pattern 5: Form Validation

```html
<vanilla-card variant="form">
    <form class="card--form" id="contactForm">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-input" required>
            <span class="form-error">Invalid email</span>
        </div>
        <button type="submit" class="btn btn--primary">Send</button>
    </form>
</vanilla-card>

<script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    // Validate and submit
});
</script>
```

---

## Troubleshooting

### Issue: Card Not Rendering

**Symptoms:** Card shows as plain HTML without styling

**Solutions:**
1. Check CSS is loaded: `<link rel="stylesheet" href="/assets/vanilla-cards/styles/main.css">`
2. Check JavaScript is loaded: `<script type="module" src="/assets/vanilla-cards/bootstrap.js" defer></script>`
3. Check for console errors (F12 → Console)
4. Verify custom element is registered: `console.log(customElements.get('vanilla-card'))`

---

### Issue: Styles Not Applying

**Symptoms:** Card renders but has no styling

**Solutions:**
1. Verify CSS file path is correct
2. Check for CSS loading errors in Network tab
3. Ensure no CSS conflicts with other stylesheets
4. Try adding `!important` to test specificity issues

---

### Issue: Clickable Card Not Navigating

**Symptoms:** Card is clickable but href doesn't work

**Solutions:**
1. Ensure `clickable` attribute is present: `<vanilla-card clickable href="...">`
2. Check `href` attribute value is valid URL
3. Verify no JavaScript errors preventing navigation
4. Try adding `tabindex="0"` for keyboard navigation

---

### Issue: Build Failing

**Symptoms:** `npm run build:vanilla-cards` fails with errors

**Solutions:**
1. Run `npm install` to ensure dependencies are installed
2. Check TypeScript errors: `npm run type-check`
3. Clear cache: `rm -rf node_modules/.vite`
4. Check Node.js version (requires 18+)

---

### Issue: TypeScript Errors

**Symptoms:** TypeScript compilation errors

**Solutions:**
1. Ensure `tsconfig.json` has correct module resolution
2. Check imports use `.js` extension: `import { x } from './file.js'`
3. Verify types for custom elements: `declare global { interface HTMLElementTagNameMap { 'vanilla-card': VanillaCard } }`

---

## Examples

See the [`examples/bootstrap/`](./examples/bootstrap/) directory for working examples:

- **01-basic-card/** - All card variants with examples
- **02-cardboard/** - Complete cardboard with stats, charts, and lists
- **03-form-card/** - Form with validation and submission

---

## Next Steps

1. ✅ **Try the examples** - Open `examples/bootstrap/01-basic-card/index.html` in your browser
2. ✅ **Customize the styles** - Modify CSS variables in `styles/core/design-tokens.css`
3. ✅ **Build for production** - Run `npm run build:vanilla-cards`
4. ✅ **Integrate with PHP** - Use in your PHP templates as shown above

---

## Resources

- [Vanilla Cards GitHub](#) (add your repo link)
- [Web Components Guide](https://webcomponents.guide)
- [BEM CSS Methodology](https://en.bem.info/methodology/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Coding!** 🎉
