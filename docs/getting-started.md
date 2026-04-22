[Back to README](../README.md) · [Architecture →](architecture.md)

# Getting Started

A guide to getting up and running with the VC Skeleton project.

## Prerequisites

- **Node.js**: 18+
- **pnpm**: 8+
- **Docker**: (optional) For containerized deployment

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd vc

# Install dependencies
pnpm install

# Initialize database schema
pnpm db:push
```

## Quick Start

Run the development servers for both API and Web packages:

```bash
pnpm dev
```

The application will be available at:
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3000
- **WebSocket**: ws://localhost:3000/ws

## See Also

- [Architecture](architecture.md) — Project structure and patterns
- [Configuration](configuration.md) — Environment variables and ports
