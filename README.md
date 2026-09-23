# AI Agent with Anvia Memory + Prisma

Class 8 learning project for **Devscale Indonesia — AI Product Engineering II**.

This repository demonstrates how to build an AI agent with the Anvia framework, give it tools, and prepare persistent conversation memory backed by Prisma ORM and PostgreSQL.

## Learning objectives

- Create and configure an AI agent with `@anvia/core`
- Connect an OpenAI-compatible language model with `@anvia/openai`
- Build type-safe agent tools with Zod
- Store agent sessions, messages, and errors with `@anvia/memory-prisma`
- Model and migrate the memory tables with Prisma ORM 8
- Run and inspect the agent through Anvia Studio

## Tech stack

- TypeScript
- Anvia Agent Framework
- Anvia Memory Prisma adapter
- Prisma ORM 8
- PostgreSQL 16
- Anvia Studio
- pnpm

## Project structure

```text
.
├── prisma/
│   ├── contract.prisma    # Agent-memory data models
│   └── db.ts              # Prisma database client
├── migrations/            # Generated database migration
├── src/
│   ├── agents.ts          # Agent factory and configuration
│   ├── memory.ts          # Prisma-backed Anvia memory store
│   ├── models.ts          # OpenAI-compatible model client
│   ├── prompts.ts         # Agent system instructions
│   ├── tools/             # Agent tools
│   ├── runner.ts          # Direct agent execution example
│   └── index.ts           # Anvia Studio entry point
├── docker-compose.yml     # PostgreSQL and Adminer
└── prisma.config.ts       # Prisma ORM configuration
```

## Prerequisites

- Node.js 24 or newer
- pnpm 11 or newer
- Docker and Docker Compose
- An API key for OpenAI or another OpenAI-compatible provider

## Getting started

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Configure `.env`:

   ```env
   OPENAI_API_KEY=your-api-key
   # Optional: set this when using an OpenAI-compatible provider.
   OPENAI_BASE_URL=https://api.openai.com/v1
   DATABASE_URL=postgresql://anvia:anvia@localhost:5544/anvia
   ```

   Never commit `.env` or a real API key.

4. Start PostgreSQL:

   ```bash
   docker compose up -d db
   ```

5. Initialize the database from the Prisma contract:

   ```bash
   pnpm exec prisma db init
   ```

6. Start Anvia Studio:

   ```bash
   pnpm dev
   ```

To stop the local database, run `docker compose down`.

## Running the order-tool example

`src/runner.ts` shows direct agent execution with a dependency-injected mock order service:

```bash
pnpm tsx src/runner.ts
```

The example asks the agent to retrieve the status of order `1001` through the order tool.

## Memory and database

The Prisma contract defines three tables used by Anvia memory:

| Model | Purpose |
| --- | --- |
| `AgentMemorySession` | Stores a conversation scope and its metadata |
| `AgentMemoryMessage` | Stores ordered messages for each session |
| `AgentMemoryError` | Stores failed runs and their related messages |

The Prisma-backed memory store is created in `src/memory.ts`. The contract and generated artifacts live in `prisma/`, while migration history lives in `migrations/`.

Useful database commands:

```bash
pnpm run contract:emit          # Regenerate contract artifacts
pnpm exec prisma db verify      # Verify database and contract consistency
pnpm exec prisma migration status
pnpm exec prisma db migrate     # Apply pending migrations
```

Adminer is also available for inspecting PostgreSQL:

```bash
docker compose up -d adminer
```

Open `http://localhost:8085` and connect with:

- System: `PostgreSQL`
- Server: `db`
- Username: `anvia`
- Password: `anvia`
- Database: `anvia`

## Key teaching points

1. `src/models.ts` creates the model client.
2. `src/agents.ts` combines the model, instructions, tools, and observability.
3. Tools keep business logic separate through dependency injection.
4. `src/memory.ts` adapts the Prisma client into an Anvia memory store.
5. Prisma persists memory across agent runs instead of keeping it only in process.

## About

Created for Class 8 of **Devscale Indonesia's AI Product Engineering II bootcamp**.
