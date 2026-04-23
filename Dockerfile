FROM node:25-alpine

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.33.1 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY packages/*/package.json ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000 3001

# Default command
CMD ["pnpm", "dev"]
