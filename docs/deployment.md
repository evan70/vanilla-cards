[← Configuration](configuration.md) · [Back to README](../README.md) · [Contributing →](contributing.md)

# Deployment

Instructions for deploying the VC Skeleton project.

## Docker Deployment

The project is container-ready with Docker and Docker Compose.

### Build and Run

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Files

- `Dockerfile`: Multi-stage build for the monorepo.
- `docker-compose.yml`: Services configuration (API, Web).

## See Also

- [Configuration](configuration.md) — Environment variables
- [Getting Started](getting-started.md) — Local installation
