[← Getting Started](getting-started.md) · [Back to README](../README.md) · [API Reference →](api.md)

# Architecture

VC Skeleton follows a monorepo architecture using Turborepo and pnpm workspaces.

## Monorepo Structure

```
vc/
├── packages/
│   ├── shared/          # Shared code: Database schema & Drizzle ORM
│   │   ├── src/
│   │   │   ├── schema/  # Database tables (cards, boards, users)
│   │   │   └── index.ts # DB connection & exports
│   │   └── drizzle.config.ts
│   ├── api/             # Hono API server with WebSocket
│   │   └── src/
│   │       ├── routes/  # API endpoints
│   │       ├── websocket.ts
│   │       └── index.ts
│   └── web/             # Vite frontend with consolidated demos
│       ├── demo/        # Consolidated demos (vanilla-cards)
│       └── src/
│           ├── kernel/  # Kernel design system (tokens, components)
│           └── main.ts
├── docker-compose.yml
├── Dockerfile
├── turbo.json
└── package.json
```

## Packages

### `packages/shared`
Contains shared types, database schema definitions, and Drizzle ORM configuration. Used by both API and web packages.

### `packages/api`
Hono-based API server with REST endpoints and WebSocket support for real-time updates.

### `packages/web`
Vanilla TypeScript frontend powered by Vite, consuming the API and WebSocket for live updates. Includes the Kernel design system (`src/kernel`) with tokens and vanilla card components.

## See Also

- [Getting Started](getting-started.md) — Installation and first steps
- [API Reference](api.md) — Endpoints and WebSocket
