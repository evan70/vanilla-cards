[← Architecture](architecture.md) · [Back to README](../README.md) · [Deployment →](deployment.md)

# Configuration

Settings and environment variables for the project.

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
NODE_ENV=development
```

- `NODE_ENV`: Application environment (`development`, `production`).

## Ports

| Service | Port | URL |
|---------|------|-----|
| Web Frontend | 3001 | http://localhost:3001 |

## See Also

- [Deployment](deployment.md) — Docker setup
