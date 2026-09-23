# Assignment 03

- Nama : Alin M
- Program : AI Product Engineering with Typescript
- Batch : 2
- Assignment Number : 3

# Restaurant Assistant with Anvia Memory and Prisma

Class 8 learning project for **Devscale Indonesia - AI Product Engineering II**.

This project is a mock restaurant assistant built with Anvia. It can search the menu, place pickup or delivery orders, and check mock order statuses. Conversation memory is persisted with Prisma and PostgreSQL, and older conversations are summarized with a memory compactor.

## Features

- Search one menu item or display the full menu.
- Place pickup orders with item quantities and a customer name.
- Place delivery orders with a required delivery address.
- Assign mock order IDs from separate pickup and delivery lists.
- Check the status of a pickup or delivery order.
- Persist agent memory with Prisma and PostgreSQL.
- Compact older memory into restaurant-specific summaries.

## Tools

| Tool | Purpose |
| --- | --- |
| `searchMenu` | Search for dishes or return the full menu |
| `placeOrder` | Place a pickup or delivery order |
| `checkOrderStatus` | Check an order by ID |

Pickup orders use IDs such as `PICK-1001`. Delivery orders use IDs such as `DEL-2001`. Delivery requires an address; pickup does not.

## Tech stack

- TypeScript
- Anvia Agent Framework
- Anvia Studio
- Zod
- Prisma ORM 8
- PostgreSQL 16
- pnpm

## Project structure

```text
.
├── prisma/
│   ├── contract.prisma    # Agent-memory data models
│   └── db.ts              # Prisma database client
├── migrations/            # Generated database migrations
├── src/
│   ├── agent.ts           # Agent, tools, memory, and compaction setup
│   ├── memory.ts          # Prisma-backed Anvia memory store
│   ├── models.ts          # OpenAI-compatible model client
│   ├── prompts.ts         # Restaurant assistant instructions
│   ├── logger.ts          # Agent logging setup
│   ├── runner.ts          # Direct agent smoke test
│   ├── services/          # Mock restaurant business logic
│   ├── tools/             # Restaurant tool definitions
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

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create the environment file:

   ```bash
   cp .env.example .env
   ```

3. Set `OPENAI_API_KEY` in `.env`. The default database URL is:

   ```env
   DATABASE_URL="postgresql://anvia:anvia@localhost:5544/anvia"
   ```

   Never commit `.env` or a real API key.

4. Start PostgreSQL:

   ```bash
   docker compose up -d db
   ```

5. Apply the Prisma migrations:

   ```bash
   pnpm exec prisma db migrate
   ```

6. Start Anvia Studio:

   ```bash
   pnpm dev
   ```

To stop the local services:

```bash
docker compose down
```

## Run the smoke test

`src/runner.ts` sends a delivery order through the agent with quantities, customer name, and address:

```bash
pnpm runner
```

## Memory and Prisma

The Prisma-backed memory store is created in `src/memory.ts` and enabled in `src/agent.ts`. It saves conversation turns and compacts older memory after the configured token threshold.

The memory contract contains:

| Model | Purpose |
| --- | --- |
| `AgentMemorySession` | Stores conversation sessions and metadata |
| `AgentMemoryMessage` | Stores messages in each session |
| `AgentMemoryError` | Stores memory-related errors and messages |

Useful commands:

```bash
pnpm run contract:emit          # Regenerate Prisma contract artifacts
pnpm exec prisma db verify      # Verify database and contract consistency
pnpm exec prisma migration status
pnpm exec prisma db migrate     # Apply pending migrations
pnpm exec tsc --noEmit          # Type-check the project
```

## Adminer

Start Adminer with:

```bash
docker compose up -d adminer
```

Open `http://localhost:8085` and use:

- System: `PostgreSQL`
- Server: `db`
- Username: `anvia`
- Password: `anvia`
- Database: `anvia`
