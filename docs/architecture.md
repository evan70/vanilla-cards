[← Getting Started](getting-started.md) · [Back to README](../README.md)

# Architecture

VC Skeleton follows a monorepo architecture using Turborepo and pnpm workspaces.

## Monorepo Structure

```
vc/
├── packages/
│   ├── core/            # Core system (EventBus, HttpClient, etc.)
│   │   └── src/
│   │       ├── components/
│   │       ├── kernel/
│   │       └── lib/
│   ├── themes/          # Pluggable themes
│   │   └── nativa/
│   └── web/             # Vite frontend with consolidated demos
│       ├── demo/        # Consolidated demos (vanilla-cards)
│       └── src/
│           └── main.ts
├── docker-compose.yml
├── Dockerfile
├── turbo.json
└── package.json
```

## Packages

### `packages/core`
Core kernel system with EventBus, HttpClient, ThemeManager, AuthState, NotificationService, and VanillaCard web component.

### `packages/themes`
Contains pluggable themes for the application.

### `packages/web`
Vanilla TypeScript frontend powered by Vite.

## See Also

- [Getting Started](getting-started.md) — Installation and first steps
