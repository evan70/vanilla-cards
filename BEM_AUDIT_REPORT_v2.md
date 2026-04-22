# BEM Audit Report - Nová Kontrola

**Dátum:** 2026-04-22 06:02

**Celkový počet CSS súborov:** 101

**Súbory s problémami:** 49

## Summary Issues

| Typ problému | Počet |
|-------------|-------|
| Forbidden Double Element | 24 |
| Id Selectors | 191 |
| Nested Selectors | 196 |
| Tag Selectors | 11 |
| Non Bem Classes | 11 |

**Celkový počet problémov:** 433

## Detaily podľa súborov

### `packages/extra/mark/styles/article-editor.css`

**Forbidden Double Element:**
- `.article-editor__toolbar__separator`
- `.article-editor__toolbar__btn--preview`
- `.article-editor__toolbar__btn--preview`
- `.article-editor__toolbar__btn--preview`
- `.article-editor__toolbar__btn-label`
- `.article-editor__toolbar__btn`
- `.article-editor__toolbar__btn`
- `.article-editor__toolbar__btn`
- `.article-editor__toolbar__btn`
- `.article-editor__toolbar__btn`
- ... a ešte 14 ďalších

**Id Selectors:**
- `#e5e7eb`
- `#ffffff`
- `#e5e7eb`
- `#ffffff`
- `#e5e7eb`
- `#ffffff`
- `#f9fafb`
- `#e5e7eb`
- `#e5e7eb`
- `#ffffff`
- ... a ešte 44 ďalších

**Non Bem Classes:**
- `article-editor__media-item__remove`
- `article-editor__dropzone__hint`
- `article-editor__media-item__file`
- `article-editor__toolbar__btn-label`
- `article-editor__toolbar__btn`
- `article-editor__toolbar__separator`
- `article-editor__dropzone__link`
- `article-editor__toolbar__btn--preview`
- `article-editor__media-item__preview`
- `article-editor__media-item__caption`
- ... a ešte 1 ďalších

### `packages/extra/mark/styles/auth-card.css`

**Id Selectors:**
- `#ffffff0d`
- `#ffffff05`
- `#ffffff0d`
- `#ffffff1a`
- `#ffffff26`

**Nested Selectors:**
- `.password-wrapper .form-group`

### `packages/extra/mark/styles/auth-centered.css`

**Nested Selectors:**
- `.auth-centered .card`
- `.auth-centered .card`
- `.auth-centered .card`
- `.auth-centered .card`
- `.auth-centered .card`

### `packages/extra/mark/styles/cardboard-card.css`

**Id Selectors:**
- `#f59e0b`

### `packages/extra/mark/styles/cardboard-components.css`

**Nested Selectors:**
- `.cardboard .reveal`
- `.cardboard .reveal`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- `.cardboard .reveal-stagger`
- ... a ešte 2 ďalších

### `packages/extra/mark/styles/cardboard-tokens.css`

**Id Selectors:**
- `#d4af37`
- `#f4cf57`
- `#b48f17`
- `#b986dc`
- `#e0115f`
- `#ff317f`
- `#c0003f`
- `#ffc87c`
- `#ffe8bc`
- `#e0a85c`

### `packages/extra/mark/styles/cardboard.css`

**Id Selectors:**
- `#f5d56e`
- `#ef4444`
- `#ef4444`
- `#ef4444`
- `#ef4444`
- `#dc2626`
- `#ef4444`
- `#ef4444`
- `#dc2626`

**Nested Selectors:**
- `.sorted-asc .sort-indicator`
- `.sorted-desc .sort-indicator`
- `.card--list--grid .card-list`
- `.card--list--grid .card-list`
- `.card--form--max .card--form`
- `.card--form--max .auth-form`
- `.card--form--max .card-grid--2-col`
- `.notification-toast--error .notification-toast`
- `.card--form--collapsed .card--form`
- `.card--form--collapsed .card--form`

### `packages/extra/mark/styles/header.css`

**Id Selectors:**
- `#main-content`

### `packages/extra/mark/styles/mark-auth.css`

**Nested Selectors:**
- `.password-wrapper .auth-form`

### `packages/extra/mark/styles/mark-crud.css`

**Nested Selectors:**
- `.admin-pagination .btn--outline`
- `.admin-pagination .btn--outline`
- `.admin-pagination .btn--outline`
- `.admin-pagination .btn--outline`
- `.empty-state .btn--primary`
- `.empty-state .btn--primary`
- `.btn-group--icons .btn`
- `.btn-group--icons .btn`
- `.card--form--editor .card--form`
- `.card--form--editor .auth-form`
- ... a ešte 2 ďalších

### `packages/extra/mark/styles/mark-media.css`

**Id Selectors:**
- `#cloudinary-sync-status`

### `packages/extra/mark/styles/mark-settings.css`

**Nested Selectors:**
- `.form-actions .btn`

### `packages/extra/mark/styles/mark-theme.css`

**Id Selectors:**
- `#ffffff`
- `#a0a0a0`
- `#ffffff`
- `#f5f5f5`
- `#f0f0f0`
- `#ffffff`
- `#ffffff`
- `#ffffff`
- `#d0d0d0`
- `#a0a0a0`
- ... a ešte 5 ďalších

### `packages/themes/nativa/src/components/action-card.css`

**Id Selectors:**
- `#e5c145`

### `packages/themes/nativa/src/components/button.css`

**Nested Selectors:**
- `.btn .icon`
- `.btn--sm .icon`
- `.btn--lg .icon`
- `.btn--icon .icon`

**Tag Selectors:**
- `to {`

### `packages/themes/nativa/src/components/card-client.css`

**Nested Selectors:**
- `.card--client--compact .card--client`
- `.card--client--compact .card--client`
- `.card--client--compact .card--client`
- `.card--client--compact .card--client`

### `packages/themes/nativa/src/components/card-content.css`

**Nested Selectors:**
- `.card--content--horizontal .card--content`
- `.card--content--horizontal .card--content`
- `.card--content--no-image .card--content`
- `.card--content--full-image .card--content`
- `.card--content--full-image .card--content`
- `.card--content--full-image .card`
- `.card--content--full-image .card`
- `.card--content--full-image .card--content`
- `.card--content--full-image .card--content`
- `.card--content--full-image .card--content`
- ... a ešte 5 ďalších

### `packages/themes/nativa/src/components/card-footer.css`

**Nested Selectors:**
- `.card--footer--compact .card--footer`
- `.card--footer--compact .card--footer`

### `packages/themes/nativa/src/components/card-form.css`

**Nested Selectors:**
- `.card--form--collapsed .card--form`
- `.card--form--collapsed .card--form`

### `packages/themes/nativa/src/components/card-fullscreen.css`

**Tag Selectors:**
- `to {`

### `packages/themes/nativa/src/components/card-grid.css`

**Nested Selectors:**
- `.card--hide-content-mobile .card`

### `packages/themes/nativa/src/components/card-header.css`

**Id Selectors:**
- `#b8941f`

### `packages/themes/nativa/src/components/card-list.css`

**Id Selectors:**
- `#f5d56e`

**Nested Selectors:**
- `.card--list--grid .card--list`
- `.card--list--grid .card--list`

### `packages/themes/nativa/src/components/card-nav-mobile.css`

**Id Selectors:**
- `#ffffff`

### `packages/themes/nativa/src/components/card-notification.css`

**Id Selectors:**
- `#ef4444`
- `#dc2626`
- `#a5b4fc`
- `#c7d2fe`
- `#ef4444`
- `#ef4444`
- `#f59e0b`
- `#f59e0b`
- `#f0f0f0`
- `#f0f0f0`
- ... a ešte 1 ďalších

**Tag Selectors:**
- `from {`
- `to {`

### `packages/themes/nativa/src/components/card-project.css`

**Nested Selectors:**
- `.card--project .card`
- `.card--project .card`
- `.card--project .card`
- `.card--project .card`
- `.card--project .card`
- `.card--project--horizontal .card--project`
- `.card--project--horizontal .card--project`
- `.card--project--horizontal .card--project`
- `.card--project--horizontal .card--project`

### `packages/themes/nativa/src/components/card-skill.css`

**Id Selectors:**
- `#f9d96e`
- `#f87171`
- `#c084fc`

**Nested Selectors:**
- `.card--skill--compact .card--skill`
- `.card--skill--compact .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--minimal .card--skill`
- `.card--skill--gold .card--skill`
- ... a ešte 9 ďalších

### `packages/themes/nativa/src/components/card-table.css`

**Nested Selectors:**
- `.sorted-asc .sort-indicator`
- `.sorted-desc .sort-indicator`

### `packages/themes/nativa/src/components/card-variants.css`

**Nested Selectors:**
- `.card--horizontal .card`
- `.card--horizontal .card`
- `.card--horizontal .card`
- `.card--horizontal .card`
- `.card--horizontal .card`
- `.card--horizontal .card`
- `.card--horizontal .card`

### `packages/themes/nativa/src/components/card-viewport.css`

**Id Selectors:**
- `#e5c145`

**Nested Selectors:**
- `.card--viewport--dark .card--viewport`
- `.card--viewport--light .card--viewport`
- `.card--viewport--light .card--viewport`
- `.card--viewport--light .card--viewport`

### `packages/themes/nativa/src/components/color-variants.css`

**Id Selectors:**
- `#f9d96e`
- `#f87171`
- `#a78bfa`
- `#f9d96e`
- `#f87171`
- `#c084fc`

### `packages/themes/nativa/src/components/cookie-consent.css`

**Id Selectors:**
- `#ffffff`
- `#ffffff`
- `#cccccc`

### `packages/themes/nativa/src/components/icon-button.css`

**Nested Selectors:**
- `.icon-btn .icon`
- `.icon-btn--sm .icon`
- `.icon-btn--lg .icon`
- `.icon-btn--lg .icon`
- `.icon-btn--theme .icon`

### `packages/themes/nativa/src/components/icon.css`

**Id Selectors:**
- `#d4af37`
- `#ef4444`
- `#ef4444`

**Nested Selectors:**
- `.btn .icon`
- `.btn--primary .icon`
- `.btn--outline .icon`

### `packages/themes/nativa/src/components/portfolio-filter.css`

**Id Selectors:**
- `#e5c145`
- `#e5c145`

### `packages/themes/nativa/src/nativa.css`

**Id Selectors:**
- `#d4af37`
- `#f4cf57`
- `#b48f17`
- `#ef4444`
- `#ff317f`
- `#c0003f`
- `#b986dc`
- `#ffc87c`
- `#ffe8bc`
- `#e0a85c`
- ... a ešte 4 ďalších

**Nested Selectors:**
- `.card--stats .vanilla-ripple`
- `.card--list .vanilla-ripple`
- `.card--table .vanilla-ripple`
- `.card--chart .vanilla-ripple`

### `packages/themes/nativa/src/sections/cta/cta.css`

**Id Selectors:**
- `#back-to-top`
- `#back-to-top`
- `#f5d76e`
- `#back-to-top`
- `#back-to-top`

**Tag Selectors:**
- `to {`

### `packages/themes/nativa/src/sections/features/features.css`

**Id Selectors:**
- `#ffffff`

**Nested Selectors:**
- `.viewport-section--mystery .viewport-section`
- `.viewport-section--mystery .viewport-section`
- `.is-revealed .viewport-section`
- `.is-revealed .viewport-section`
- `.viewport-section--stagger .card`
- `.viewport-section--stagger .token-card`
- `.is-revealed .card`
- `.is-revealed .token-card`
- `.viewport-section--mystery .viewport-section`
- `.viewport-section--mystery .viewport-section`
- ... a ešte 5 ďalších

**Tag Selectors:**
- `from {`
- `to {`

### `packages/themes/nativa/src/sections/hero/hero.css`

**Id Selectors:**
- `#d4af37`
- `#ef4444`
- `#ff5f56`
- `#ffbd2e`
- `#f8f8f2`
- `#ff79c6`
- `#f1fa8c`
- `#f1fa8c`

**Nested Selectors:**
- `.hero-section .card--horizontal`
- `.hero-section--fw .card--horizontal`
- `.hero-section--fw .card`
- `.hero-section--fw .card`
- `.is-visible .token-card`

**Tag Selectors:**
- `to { stroke-dashoffset: 0; }`
- `to { opacity: 1; transform: scale(1); }`
- `from {`
- `to {`

### `packages/themes/nativa/src/sections/stats/stats.css`

**Nested Selectors:**
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- `.grid .card`
- ... a ešte 2 ďalších

### `packages/themes/nativa/src/states.css`

**Nested Selectors:**
- `.card-group--equal-height .card`

### `packages/web/src/kernel/components/theme-toggle.css`

**Nested Selectors:**
- `.theme-toggle .icon`

### `packages/web/src/pages/blog.css`

**Id Selectors:**
- `#d4af37`
- `#e8edf5`
- `#d4af37`
- `#f6e19d`

### `packages/web/src/pages/contact.css`

**Id Selectors:**
- `#d4af37`
- `#e8edf5`
- `#e8edf5`
- `#f87171`
- `#f59e0b`

### `packages/web/src/pages/home-layout.css`

**Nested Selectors:**
- `.demo-grid .card`
- `.card-grid .card`

### `packages/web/src/pages/home.css`

**Id Selectors:**
- `#d4af37`
- `#ef4444`
- `#ff5f56`
- `#ffbd2e`
- `#f8f8f2`
- `#ff79c6`
- `#f1fa8c`
- `#f1fa8c`
- `#ffffff`
- `#d4af37`
- ... a ešte 1 ďalších

**Nested Selectors:**
- `.demo-grid .card`
- `.card-grid .card`
- `.hero-section .card--horizontal`
- `.hero-section--fw .card--horizontal`
- `.hero-section--fw .card`
- `.hero-section--fw .card`
- `.is-visible .token-card`
- `.viewport-section--mystery .viewport-section`
- `.viewport-section--mystery .viewport-section`
- `.is-revealed .viewport-section`
- ... a ešte 23 ďalších

### `packages/web/src/pages/page.css`

**Id Selectors:**
- `#e8edf5`

### `packages/web/src/pages/portfolio.css`

**Id Selectors:**
- `#e5c145`

**Nested Selectors:**
- `.portfolio .container`
- `.is-visible .card--skill`

### `packages/web/src/styles.css`

**Id Selectors:**
- `#ffffff`
- `#f8f9fa`
- `#e9ecef`
- `#d4af37`
- `#e0e0e0`
- `#a0a0a0`
- `#fef2f2`
- `#fecaca`
- `#dc2626`
- `#ef4444`
- ... a ešte 2 ďalších


## Skóre: 2.0/10

❌ **Veľký počet problémov - vyžaduje sa refactoring.**
