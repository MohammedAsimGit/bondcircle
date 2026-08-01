# packages/database

## Purpose

This package contains the BondCircle database client, schema, and migrations powered by Prisma ORM with PostgreSQL.

## Technology Stack

- **ORM:** Prisma 6.x
- **Database:** PostgreSQL 16
- **Language:** TypeScript (strict mode)

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Scripts

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `db:generate`     | Generate Prisma client         |
| `db:push`         | Push schema to database        |
| `db:migrate`      | Create and apply migrations    |
| `db:migrate:prod` | Apply migrations in production |
| `db:seed`         | Seed development data          |
| `db:studio`       | Open Prisma Studio             |
| `db:reset`        | Reset database and re-seed     |
| `build`           | Compile TypeScript             |
| `lint`            | Run ESLint                     |
| `typecheck`       | TypeScript type checking       |

## Schema Overview

### Models

| Model               | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `User`              | Platform users with authentication data  |
| `Profile`           | User display information and preferences |
| `Friendship`        | Bidirectional friend connections         |
| `Memory`            | Core memory records                      |
| `MemoryParticipant` | Users associated with a memory           |
| `Reminder`          | Scheduled memory reminders               |
| `Session`           | User authentication sessions             |

### Enums

| Enum               | Values                                   |
| ------------------ | ---------------------------------------- |
| `UserStatus`       | ACTIVE, INACTIVE, SUSPENDED, DEACTIVATED |
| `FriendshipStatus` | PENDING, ACCEPTED, DECLINED, BLOCKED     |
| `Visibility`       | PRIVATE, FRIENDS, PUBLIC                 |
| `ParticipantRole`  | CREATOR, PARTICIPANT, VIEWER             |
| `ReminderStatus`   | PENDING, SENT, FAILED, CANCELLED         |

## Project Structure

```
packages/database/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed script
│   └── migrations/        # Migration history
├── src/
│   ├── index.ts           # Package entry point
│   └── client.ts          # Prisma client singleton
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bondcircle?schema=public
DATABASE_DIRECT_URL=postgresql://user:password@localhost:5432/bondcircle?schema=public
```

## Local Development

1. Start PostgreSQL with Docker:

   ```bash
   docker compose up -d
   ```

2. Generate Prisma client:

   ```bash
   npm run db:generate
   ```

3. Push schema to database:

   ```bash
   npm run db:push
   ```

4. Seed development data:
   ```bash
   npm run db:seed
   ```

## Status

**Active** — Sprint 03 complete
