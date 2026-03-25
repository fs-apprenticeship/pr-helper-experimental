# PR Helper Experimental

This branch adds Prisma-backed PostgreSQL setup to the Next.js app. The application UI is still the default starter, but the project now includes Prisma configuration, an initial schema, and a checked-in migration.

## What's In This Branch

- Prisma 7 configured via `prisma.config.ts`
- PostgreSQL datasource driven by `DATABASE_URL`
- Generated Prisma client output at `generated/prisma`
- Initial `User` model with a UUID primary key
- Initial migration in `prisma/migrations`

## Prerequisites

- Node.js 20+
- A PostgreSQL database
- An environment variable named `DATABASE_URL`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file and set your database connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

3. Apply the existing migration and generate the Prisma client:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Prisma Notes

- The Prisma schema lives in `prisma/schema.prisma`.
- Prisma reads `DATABASE_URL` from `.env` via `prisma.config.ts`.
- The generated client is written to `generated/prisma` and is gitignored.
- The current schema defines a single `User` table:

```prisma
model User {
  id String @id @default(uuid()) @db.Uuid
}
```

## Useful Commands

```bash
# Apply pending migrations in development
npx prisma migrate dev

# Regenerate the Prisma client after schema changes
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Start the Next.js app
npm run dev
```

## Current Scope

This branch sets up the database layer but does not yet wire Prisma into the app runtime. If more database models or application queries are added later, this README should be expanded with those workflows.
