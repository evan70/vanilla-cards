[← Architecture](architecture.md) · [Back to README](../README.md) · [Configuration →](configuration.md)

# API Reference

The project uses Hono as a lightweight web framework for the API.

## Base URL
Default: `http://localhost:3000`

## Cards

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cards` | List all cards |
| `POST` | `/api/cards` | Create a new card |
| `GET` | `/api/cards/:id` | Get card by ID |
| `PUT` | `/api/cards/:id` | Update card |
| `DELETE` | `/api/cards/:id` | Delete card |

## Boards

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/boards` | List all boards |
| `POST` | `/api/boards` | Create a new board |

## System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/ws` | WebSocket connection endpoint |

## Real-time (WebSocket)

Connect to `ws://localhost:3000/ws` for real-time card updates.

## See Also

- [Architecture](architecture.md) — Project structure
- [Configuration](configuration.md) — Environment variables
