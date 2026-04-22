# Cardboard Example

> Complete admin cardboard with stats, charts, lists, and tables

## Overview

This example demonstrates a complete admin cardboard built with Vanilla Cards. It showcases how to combine multiple card variants to create a cohesive, functional cardboard interface.

## Quick Start

### Option 1: Open Directly in Browser

```bash
# Navigate to the example directory
cd src/Templates/vanilla-cards/examples/bootstrap/02-cardboard

# Start a local server
python -m http.server 8000
```

Then visit: `http://localhost:8000/src/Templates/vanilla-cards/examples/bootstrap/02-cardboard/index.html`

### Option 2: Build with Vite

```bash
cd src/Templates
npm run dev
```

Then visit: `http://localhost:5173/vanilla-cards/examples/bootstrap/02-cardboard/index.html`

## Cardboard Components

### 1. Stats Cards (4x)
Located in the top row, displaying:
- **Total Views** - With trend indicator (↑ 12.5%)
- **Active Users** - With trend indicator (↑ 8.2%)
- **Articles** - With weekly summary
- **Comments** - With trend indicator (↓ 2.1%)

**Variant:** `stats`

```html
<vanilla-card variant="stats">
    <div class="card--stats__icon" style="color: var(--brand-sapphire);">
        <!-- SVG icon -->
    </div>
    <p class="card--stats__value">24,565</p>
    <p class="card--stats__label">
        Total Views
        <span class="text-success">↑ 12.5%</span>
    </p>
</vanilla-card>
```

### 2. Views Chart Card
Large card displaying traffic over time with a CSS-only bar chart.

**Variant:** `chart`

**Features:**
- Header with title and subtitle
- CSS bar chart (simulated)
- Ready for Chart.js integration

```html
<vanilla-card variant="chart">
    <div class="card--chart__header">
        <h3 class="card__title">Views Over Time</h3>
        <p class="card--chart__subtitle">Last 30 days</p>
    </div>
    <div class="card--chart__canvas">
        <!-- Chart.js canvas or custom chart -->
    </div>
</vanilla-card>
```

### 3. Recent Activity Table
Data table showing recent user actions.

**Variant:** `table`

**Features:**
- User, Action, Item, Time, Status columns
- Color-coded status indicators
- Responsive layout

```html
<vanilla-card variant="table">
    <table class="card--table">
        <thead>
            <tr>
                <th>User</th>
                <th>Action</th>
                <th>Item</th>
                <th>Time</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>John Doe</strong></td>
                <td>Published</td>
                <td>Article: "Getting Started"</td>
                <td class="text-muted">2 min ago</td>
                <td><span style="color: var(--color-success);">✓ Complete</span></td>
            </tr>
        </tbody>
    </table>
</vanilla-card>
```

### 4. Recent Articles List
Vertical list of recent articles with status badges.

**Variant:** `list`

**Features:**
- Article titles with links
- Status badges (Published, Draft, Review)
- Date metadata

```html
<vanilla-card variant="list">
    <ul class="card--list">
        <li class="card--list__item">
            <a href="#" class="card--list__link">
                <span class="card--list__link-title">Article Title</span>
                <span class="card--list__meta">
                    <span class="card--list__meta-label">Published</span>
                    <span>Mar 15</span>
                </span>
            </a>
        </li>
    </ul>
</vanilla-card>
```

### 5. Quick Links Actions
Grid of action buttons for common tasks.

**Variant:** `actions`

**Features:**
- 2x2 button grid
- Icon + text buttons
- Primary and secondary variants

```html
<vanilla-card variant="actions">
    <h3 class="card__title">Common Actions</h3>
    <div class="card--actions">
        <button class="btn btn--primary">New Article</button>
        <button class="btn btn--secondary">Edit Page</button>
        <button class="btn btn--secondary">Cardboard</button>
        <button class="btn btn--secondary">Reports</button>
    </div>
</vanilla-card>
```

### 6. Recent Comments List
Compact list showing recent user comments.

**Variant:** `list`

**Features:**
- Comment author and timestamp
- Comment text preview
- Link to article

## Layout Structure

```
Cardboard
├── Header
│   ├── Title & Subtitle
│   └── Action Buttons
├── Stats Grid (4 columns)
│   ├── Views Stats
│   ├── Users Stats
│   ├── Articles Stats
│   └── Comments Stats
└── Main Grid (2 columns)
    ├── Left Column
    │   ├── Views Chart
    │   └── Activity Table
    └── Right Column
        ├── Recent Articles
        ├── Quick Links
        └── Recent Comments
```

## CSS Grid Layouts

### Stats Grid
```css
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-6);
}
```

### Main Cardboard Grid
```css
.cardboard-grid--main {
    display: grid;
    grid-template-columns: 2fr 1fr; /* 2/3 - 1/3 layout */
    gap: var(--space-6);
}

/* Responsive: Stack on mobile */
@media (max-width: 1024px) {
    .cardboard-grid--main {
        grid-template-columns: 1fr;
    }
}
```

## Chart.js Integration

To integrate real charts with Chart.js:

### Step 1: Install Chart.js
```bash
npm install chart.js
```

### Step 2: Import and Initialize
```typescript
import Chart from 'chart.js/auto';

const ctx = document.querySelector('.card--chart__canvas canvas');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
            label: 'Views',
            data: [40, 55, 45, 70, 65],
            backgroundColor: 'var(--brand-sapphire)',
            borderRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
```

## Customization

### Change Color Theme
```css
:root {
    --brand-gold: #your-primary_color;
    --brand-sapphire: #your_secondary_color;
    --brand-emerald: #your_tertiary_color;
}
```

### Adjust Grid Spacing
```css
:root {
    --space-6: 1.5rem; /* Increase/decrease gap */
}
```

### Add Custom Card Styles
```css
.cardboard-header {
    background: var(--color-bg-elevated);
    border-bottom: 2px solid var(--brand-gold);
}
```

## File Structure

```
02-cardboard/
├── index.html          # Complete cardboard example
├── cardboard.ts        # Cardboard entry-point with controller
└── README.md           # This file
```

## Features Demonstrated

| Feature | Component | Status |
|---------|-----------|--------|
| Stats Cards | `variant="stats"` | ✅ |
| Bar Chart | `variant="chart"` | ✅ (CSS only) |
| Data Table | `variant="table"` | ✅ |
| Article List | `variant="list"` | ✅ |
| Action Buttons | `variant="actions"` | ✅ |
| Comments List | `variant="list"` | ✅ |
| Responsive Grid | CSS Grid | ✅ |
| Trend Indicators | Custom CSS | ✅ |
| Status Badges | Custom CSS | ✅ |

## Browser Support

- Chrome/Edge: ✅ Latest
- Firefox: ✅ Latest
- Safari: ✅ Latest
- Mobile: ✅ Responsive

## Performance

- **First Paint:** < 500ms
- **Interactive:** < 1s
- **Bundle Size:** ~15KB (vanilla-card only)

## Next Steps

1. ✅ Customize the cardboard with your data
2. ✅ Integrate Chart.js for real charts
3. ✅ Connect to your backend API
4. ✅ Add real-time updates with WebSocket
5. ✅ Check out the form card example

## Related Examples

- **01-basic-card/** - All card variants reference
- **03-form-card/** - Form with validation

## Resources

- [BOOTSTRAP_GUIDE.md](../../BOOTSTRAP_GUIDE.md) - Main documentation
- [Card Variants](../../BOOTSTRAP_GUIDE.md#component-reference) - All 11 variants
- [Chart.js](https://www.chartjs.org/) - Chart library
