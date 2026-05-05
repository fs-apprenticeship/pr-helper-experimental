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
- Either:
  - A local PostgreSQL database
  - A Neon account and database project
- An environment variable named `DATABASE_URL`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Choose a database option for local development:

   Option A: Local PostgreSQL

   If PostgreSQL is already running on your machine, use a normal local connection string such as:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
```

   Option B: Neon

   If you cannot get PostgreSQL running locally, create your own Neon database instead:

   1. Sign in at [neon.com](https://neon.com) and create a project.
   2. In the Neon dashboard, open your project and click `Connect`.
   3. Select the default branch, database, and role you want to use for local development.
   4. Turn connection pooling off and copy the direct connection string.

   For this repo, use Neon’s direct connection string here rather than the pooled `-pooler` hostname because Prisma migrations run through `DATABASE_URL`.

3. Create a `.env` file and set `DATABASE_URL` to match the option you chose:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

   Notes:
   - For local PostgreSQL, `HOST` is usually `localhost`.
   - For Neon, keep `sslmode=require` in the query string.
   - If your Neon password contains special characters, paste the full connection string directly from Neon instead of rebuilding it by hand.

4. Apply the existing migration and generate the Prisma client:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Prisma Notes

- The Prisma schema lives in `prisma/schema.prisma`.
- Prisma reads `DATABASE_URL` from `.env` via `prisma.config.ts`.
- `DATABASE_URL` can point to either a local PostgreSQL instance or a Neon database.
- If you use Neon, `DATABASE_URL` should be the direct non-pooled connection string when running Prisma commands such as `npx prisma migrate dev`.
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
