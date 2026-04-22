# Page Card Module

> TypeScript orchestrátor pre kompletnú stránku s navigáciou, obsahom a pätičkou.

## Prehľad

Page Card Module je TypeScript orchestrátor, ktorý zjednocuje:

- **Nav Card** (`header-card`) - Header s logom, navigáciou a akciami
- **Body Card** (`page-card__body`) - Hlavný obsah so sekciami
- **Footer Card** (`footer-card`) - Pätička s odkazmi a copyright
- **Mobile Nav Card** (`mobile-nav-card`) - Mobilné menu s overlay

## Architektúra

```
┌─────────────────────────────────────────────┐
│         PageCardController (TS)             │
│  ┌─────────────┐ ┌────────────┐ ┌────────┐ │
│  │  Nav Card   │ │  Body Card │ │ Footer │ │
│  │ (header)    │ │  (main)    │ │ Card   │ │
│  └─────────────┘ └────────────┘ └────────┘ │
│         │                                    │
│  ┌─────────────┐                            │
│  │ Mobile Nav  │                            │
│  │   Card      │                            │
│  └─────────────┘                            │
└─────────────────────────────────────────────┘
           ▲
           │ data-* attributes (JSON)
           │
    ┌──────────────┐
    │   PHP (SSR)  │
    └──────────────┘
```

## Inštalácia

Module je súčasťou `vanilla-cards` balíka. Nie je potrebná žiadna ďalšia inštalácia.

## Použitie

### 1. Vytvoriť HTML kontajner

```php
<div
  id="page-card-root"
  data-page-card
  data-page-payload='<?php echo htmlspecialchars(json_encode($payload), ENT_QUOTES, 'UTF-8'); ?>'
>
  <!-- Server-side rendered fallback content -->
  <?php include __DIR__ . '/navigation.php'; ?>
  <main class="page-card__body">
    <!-- Page content -->
  </main>
  <?php include __DIR__ . '/layout/footer.php'; ?>
</div>
```

### 2. Pridať entry point

```php
$pageCardJs = AssetHelper::js('page-card', 'vanilla-cards');
?>
<script type="module" src="<?php echo $pageCardJs; ?>" defer></script>
```

### 3. Príprava dát (PHP)

```php
<?php
$payload = [
    'currentPage' => 'home',
    'menuItems' => [
        ['name' => 'Home', 'href' => '/', 'page' => 'home'],
        ['name' => 'Blog', 'href' => '/blog', 'page' => 'blog'],
        ['name' => 'Portfolio', 'href' => '/portfolio', 'page' => 'portfolio'],
        ['name' => 'Contact', 'href' => '/contact', 'page' => 'contact'],
    ],
    'footerSections' => [
        [
            'title' => 'Company',
            'links' => [
                ['label' => 'About', 'href' => '/about'],
                ['label' => 'Careers', 'href' => '/careers'],
            ],
        ],
        [
            'title' => 'Resources',
            'links' => [
                ['label' => 'Documentation', 'href' => '/docs'],
                ['label' => 'Help Center', 'href' => '/help'],
            ],
        ],
    ],
    'isGuest' => true,
    'siteName' => 'Nativa CMS',
    'logoText' => 'responsive.sk',
    'showSearch' => true,
    'showLanguageToggle' => true,
    'showThemeToggle' => true,
];
```

## Dáta

### Raw Payload (z backendu)

```typescript
type RawPageCardPayload = {
  currentPage?: string | null;
  menuItems?: Array<{
    name?: string | null;
    href?: string | null;
    page?: string | null;
    active?: boolean | null;
  }>;
  footerSections?: Array<{
    title?: string | null;
    links?: Array<{
      label?: string | null;
      href?: string | null;
    }>;
  }>;
  isGuest?: boolean | null;
  siteName?: string | null;
  logoText?: string | null;
  showSearch?: boolean | null;
  showLanguageToggle?: boolean | null;
  showThemeToggle?: boolean | null;
};
```

### Normalized UI Model

```typescript
interface PageCardModel {
  currentPage: string;              // Default: 'home'
  menuItems: MenuItem[];            // Default: []
  footerSections: FooterSection[];  // Default: []
  isGuest: boolean;                 // Default: true
  siteName: string;                 // Default: 'Nativa CMS'
  logoText: string;                 // Default: 'responsive.sk'
  showSearch: boolean;              // Default: true
  showLanguageToggle: boolean;      // Default: true
  showThemeToggle: boolean;         // Default: true
}
```

### Normalizácia

Module automaticky normalizuje dáta:

- `snake_case` → `camelCase`
- `null` → defaultné hodnoty
- Chýbajúce polia → safe defaults

```typescript
import { normalizePageCardPayload } from './page-card';

const raw = {
  currentPage: 'blog',
  siteName: null,           // → 'Nativa CMS'
  logo_text: 'custom.logo', // → logoText: 'custom.logo'
};

const model = normalizePageCardPayload(raw);
```

## API

### PageCardController

```typescript
import { PageCardController } from './page-card';

const root = document.querySelector('[data-page-card]');
const config = { pageData: normalizePageCardPayload(rawPayload) };

const controller = new PageCardController(root, config);
controller.init();      // Initialize orchestrator
controller.destroy();   // Cleanup
```

### Metódy

| Metóda | Popis |
|--------|-------|
| `init()` | Inicializuje orchestrátor, vykreslí všetky karty, naviaže eventy |
| `destroy()` | Zničí controller, vyčistí DOM |

## Eventy

### Mobile Menu

- **Otvorenie:** Klik na `.header-card__mobile-toggle`
- **Zatvorenie:** Klik na overlay, klik na link, stlačenie Escape
- **Stav:** `aria-expanded` na toggle button

### Theme Toggle

- **Event:** Klik na `.header-card__theme-toggle`
- **API:** `POST /api/theme/toggle`
- **Fallback:** Lokálne prepnutie `data-theme` atribútu

## BEM Štruktúra

```
.header-card (block)
├── .header-card__inner
├── .header-card__logo
├── .header-card__nav
│   └── .header-card__nav-item
│       └── .header-card__nav-link
│           └── .header-card__nav-link--active
├── .header-card__actions
│   ├── .header-card__theme-toggle
│   └── .header-card__mobile-toggle
└── .header-card__mobile-icon

.page-card__body (block)

.footer-card (block)
├── .footer-card__inner
├── .footer-card__content
│   └── .footer-card__section
│       ├── .footer-card__title
│       └── .footer-card__links
│           └── .footer-card__link
└── .footer-card__bottom

.mobile-nav-card (block)
├── .mobile-nav-card__nav
├── .mobile-nav-card__item
├── .mobile-nav-card__link
│   └── .mobile-nav-card__link--active
└── .mobile-nav-card--open (modifier)

.mobile-nav-overlay (block)
```

## Testovanie

### Vitest

```bash
cd src/Templates
pnpm test lib/page-card/page-card.test.ts
```

### Testovacie scenáre

- ✅ Normalizácia payloadu (snake_case → camelCase)
- ✅ Defaultné hodnoty pre null/undefined
- ✅ Renderovanie header-card s navigáciou
- ✅ Renderovanie body-card
- ✅ Renderovanie footer-card so sekciami
- ✅ Renderovanie mobile-nav-card
- ✅ Active states pre navigáciu
- ✅ Mobile menu toggle
- ✅ Theme toggle
- ✅ Destroy cleanup

## Príklady

### Minimálny príklad

```php
<div data-page-card data-page-payload='{"currentPage":"home"}'>
  <main class="page-card__body">Obsah</main>
</div>
<script type="module" src="/assets/vanilla-cards/page-card.js"></script>
```

### Kompletný príklad

```php
<?php
$payload = [
    'currentPage' => 'blog',
    'menuItems' => [
        ['name' => 'Home', 'href' => '/', 'page' => 'home'],
        ['name' => 'Blog', 'href' => '/blog', 'page' => 'blog', 'active' => true],
    ],
    'footerSections' => [
        [
            'title' => 'Links',
            'links' => [
                ['label' => 'Privacy', 'href' => '/privacy'],
                ['label' => 'Terms', 'href' => '/terms'],
            ],
        ],
    ],
    'isGuest' => false,
    'showSearch' => false,
];
?>

<div
  data-page-card
  data-page-payload='<?php echo htmlspecialchars(json_encode($payload), ENT_QUOTES); ?>'
>
  <main class="page-card__body">
    <h1>Blog Page</h1>
  </main>
</div>
```

## Rozšírenia

### Dynamické dáta z API

```typescript
const controller = new PageCardController(root, config);
controller.init();

// Načítať dynamické dáta
controller.loadDynamicData?.(); // Future feature
```

### Vlastné event handlere

```typescript
root.addEventListener('page-card:menu-open', () => {
  console.log('Menu opened');
});

root.addEventListener('page-card:theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

## Súbory modulu

```
lib/page-card/
├── index.ts           # Public API exports
├── types.ts           # TypeScript interfaces
├── normalizers.ts     # Payload normalization
├── controller.ts      # PageCardController orchestrator
├── page-card.test.ts  # Vitest tests
└── README.md          # This documentation
```

## Related

- [Header Card](../components/header-card.ts) - Header komponenta
- [Footer Card](../components/footer-card.ts) - Footer komponenta
- [Mobile Nav Card](../components/mobile-nav-card.ts) - Mobile menu
- [AssetHelper](../../Infrastructure/View/AssetHelper.php) - PHP helper pre assety

---

*Last updated: 2026-03-29*
