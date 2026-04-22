<?php
/**
 * Vanilla Cards Bootstrap - PHP Integration Example.
 *
 * This file demonstrates how to integrate Vanilla Cards
 * into your PHP templates.
 *
 * Usage:
 *   Copy this file to your PHP templates directory
 *   Adjust paths as needed for your project structure
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Asset paths (adjust based on your build output)
$bootstrapJs = '/assets/vanilla-cards/bootstrap.v1.0.0.js';
$bootstrapCss = '/assets/vanilla-cards/css/main.v1.0.0.css';

// Or use the built version from public directory
// $bootstrapJs = '/vanilla-cards/bootstrap.js';
// $bootstrapCss = '/vanilla-cards/styles/main.css';

// ============================================================================
// EXAMPLE 1: Simple Card in PHP Template
// ============================================================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla Cards PHP Integration</title>

    <!-- Include Vanilla Cards CSS -->
    <link rel="stylesheet" href="<?php echo htmlspecialchars($bootstrapCss, ENT_QUOTES, 'UTF-8'); ?>">

    <style>
        /* Your custom styles */
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #f5f5f5;
            padding: 2rem;
            margin: 0;
        }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <h1>Vanilla Cards PHP Integration</h1>

    <div class="card-grid">
        <!-- Example 1: Basic Card -->
        <vanilla-card variant="elevated">
            <h3 class="card__title">Welcome!</h3>
            <p class="card__description">This is a vanilla-card rendered in PHP.</p>
        </vanilla-card>

        <!-- Example 2: Card with Dynamic Content -->
        <vanilla-card variant="stats">
            <div class="card--stats__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            </div>
            <p class="card--stats__value"><?php echo number_format(1234); ?></p>
            <p class="card--stats__label">Active Users</p>
        </vanilla-card>

        <!-- Example 3: Clickable Card with PHP Link -->
        <vanilla-card clickable href="/article/<?php echo htmlspecialchars($articleSlug ?? 'example', ENT_QUOTES, 'UTF-8'); ?>" tabindex="0">
            <h3 class="card__title"><?php echo htmlspecialchars($articleTitle ?? 'Article Title', ENT_QUOTES, 'UTF-8'); ?></h3>
            <p class="card__description"><?php echo htmlspecialchars($articleExcerpt ?? 'Article excerpt goes here...', ENT_QUOTES, 'UTF-8'); ?></p>
        </vanilla-card>
    </div>

    <!-- Include Vanilla Cards JavaScript -->
    <script type="module" src="<?php echo htmlspecialchars($bootstrapJs, ENT_QUOTES, 'UTF-8'); ?>" defer></script>
</body>
</html>

<?php
// ============================================================================
// EXAMPLE 2: Helper Function for Cards
// ============================================================================

/**
 * Render a vanilla-card in PHP.
 *
 * @param string $variant Card variant (elevated, filled, outlined, stats, etc.)
 * @param string $title   Card title
 * @param string $content Card content/description
 * @param array  $options Additional options (href, clickable, etc.)
 *
 * @return string HTML output
 */
function renderVanillaCard(
    string $variant = 'elevated',
    string $title = '',
    string $content = '',
    array $options = []
): string {
    $attributes = [];

    // Add variant attribute
    $attributes[] = 'variant="' . htmlspecialchars($variant, ENT_QUOTES, 'UTF-8') . '"';

    // Add optional attributes
    if (!empty($options['href'])) {
        $attributes[] = 'href="' . htmlspecialchars($options['href'], ENT_QUOTES, 'UTF-8') . '"';
        $attributes[] = 'clickable';
    }

    if (!empty($options['tabindex'])) {
        $attributes[] = 'tabindex="' . (int) $options['tabindex'] . '"';
    }

    if (!empty($options['disabled'])) {
        $attributes[] = 'disabled';
    }

    $attrsString = implode(' ', $attributes);

    // Escape content
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    $safeContent = htmlspecialchars($content, ENT_QUOTES, 'UTF-8');

    return <<<HTML
            <vanilla-card {$attrsString}>
                <h3 class="card__title">{$safeTitle}</h3>
                <p class="card__description">{$safeContent}</p>
            </vanilla-card>
        HTML;
}

// Usage example:
// echo renderVanillaCard(
//     'elevated',
//     'My Card',
//     'This is the card content',
//     ['href' => '/page', 'tabindex' => '0']
// );

// ============================================================================
// EXAMPLE 3: Stats Card Helper
// ============================================================================

/**
 * Render a stats card.
 *
 * @param string      $value The stat value (e.g., "1,234")
 * @param string      $label The stat label (e.g., "Total Users")
 * @param string      $icon  SVG icon HTML or icon name
 * @param string|null $trend Trend indicator (e.g., "↑ 12.5%" or "↓ 3.2%")
 *
 * @return string HTML output
 */
function renderStatsCard(
    string $value,
    string $label,
    string $icon,
    ?string $trend = null
): string {
    $safeValue = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    $safeLabel = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    $trendClass = '';

    if (null !== $trend) {
        if (false !== strpos($trend, '↑')) {
            $trendClass = 'text-success';
        } elseif (false !== strpos($trend, '↓')) {
            $trendClass = 'text-error';
        }
    }

    $trendHtml = $trend ? '<span class="' . $trendClass . '" style="margin-left: 0.5rem; font-size: var(--text-sm);">' . htmlspecialchars($trend, ENT_QUOTES, 'UTF-8') . '</span>' : '';

    return <<<HTML
            <vanilla-card variant="stats">
                <div class="card--stats__icon">
                    {$icon}
                </div>
                <p class="card--stats__value">{$safeValue}</p>
                <p class="card--stats__label">
                    {$safeLabel}
                    {$trendHtml}
                </p>
            </vanilla-card>
        HTML;
}

// Usage example:
// echo renderStatsCard(
//     '12,345',
//     'Total Views',
//     '<svg><!-- icon --></svg>',
//     '↑ 12.5%'
// );

// ============================================================================
// EXAMPLE 4: List Card Helper
// ============================================================================

/**
 * Render a list card.
 *
 * @param string $title Card title
 * @param array  $items Array of ['label' => string, 'href' => string, 'meta' => string|null]
 *
 * @return string HTML output
 */
function renderListCard(string $title, array $items): string
{
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

    $itemsHtml = '';
    foreach ($items as $item) {
        $label = htmlspecialchars($item['label'] ?? '', ENT_QUOTES, 'UTF-8');
        $href = htmlspecialchars($item['href'] ?? '#', ENT_QUOTES, 'UTF-8');
        $meta = isset($item['meta']) ? '<span class="card--list__meta">' . htmlspecialchars($item['meta'], ENT_QUOTES, 'UTF-8') . '</span>' : '';

        $itemsHtml .= <<<HTML
                <li class="card--list__item">
                    <a href="{$href}" class="card--list__link">
                        <span class="card--list__link-title">{$label}</span>
                        {$meta}
                    </a>
                </li>
            HTML;
    }

    return <<<HTML
            <vanilla-card variant="list">
                <h3 class="card__title">{$safeTitle}</h3>
                <ul class="card--list">
                    {$itemsHtml}
                </ul>
            </vanilla-card>
        HTML;
}

// Usage example:
// echo renderListCard(
//     'Recent Articles',
//     [
//         ['label' => 'Article 1', 'href' => '/article-1', 'meta' => 'Mar 15'],
//         ['label' => 'Article 2', 'href' => '/article-2', 'meta' => 'Mar 10'],
//     ]
// );

// ============================================================================
// EXAMPLE 5: Form Card Helper
// ============================================================================

/**
 * Render a contact form card.
 *
 * @param string $action     Form action URL
 * @param string $submitText Submit button text
 *
 * @return string HTML output
 */
function renderContactForm(string $action = '/api/contact', string $submitText = 'Send Message'): string
{
    $safeAction = htmlspecialchars($action, ENT_QUOTES, 'UTF-8');
    $safeSubmit = htmlspecialchars($submitText, ENT_QUOTES, 'UTF-8');

    return <<<HTML
            <vanilla-card variant="form">
                <h3 class="card__title">Contact Us</h3>
                <form class="card--form" action="{$safeAction}" method="POST">
                    <div class="form-group">
                        <label for="name" class="form-label form-label--required">Name</label>
                        <input type="text" id="name" name="name" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label form-label--required">Email</label>
                        <input type="email" id="email" name="email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="message" class="form-label form-label--required">Message</label>
                        <textarea id="message" name="message" class="form-textarea" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn--primary">{$safeSubmit}</button>
                    </div>
                </form>
            </vanilla-card>
        HTML;
}

// Usage example:
// echo renderContactForm('/api/contact', 'Send Message');

// ============================================================================
// NEXT STEPS
// ============================================================================

// 1. Copy this file to your PHP templates directory
// 2. Adjust asset paths for your project structure
// 3. Use the helper functions in your templates
// 4. Build the assets: npm run build:vanilla-cards
// 5. See BOOTSTRAP_GUIDE.md for more documentation
