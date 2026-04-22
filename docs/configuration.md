[← API Reference](api.md) · [Back to README](../README.md) · [Deployment →](deployment.md)

# Configuration

Settings and environment variables for the project.

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

- `DATABASE_URL`: Path to the SQLite database file.
- `PORT`: Port number for the API server.
- `NODE_ENV`: Application environment (`development`, `production`).

## Ports

| Service | Port | URL |
|---------|------|-----|
| API Server | 3000 | http://localhost:3000 |
| Web Frontend | 3001 | http://localhost:3001 |
| WebSocket | 3000 | ws://localhost:3000/ws |

## See Also

- [API Reference](api.md) — Endpoints
- [Deployment](deployment.md) — Docker setup
