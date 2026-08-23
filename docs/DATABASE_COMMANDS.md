# Database & Prisma Commands Guide

This project is a monorepo setup where the Prisma schema and database logic live inside the `packages/database` directory. Because the schema is not at the root level, most Prisma commands require the `--schema` flag. 

Here is a quick reference guide to the commands you'll need for managing the database, seeding data, and checking security.

---

## 1. Viewing Your Data (Prisma Studio)

Prisma Studio is a visual editor for the data in your database. 

**Run this command:**
```bash
npx prisma studio --schema packages/database/prisma/schema.prisma
```
**What it does:** Starts a local web server (usually at `http://localhost:5555`) that opens a GUI in your browser so you can view, add, edit, or delete rows in your database tables.

---

## 2. Formatting Your Schema

When you make changes to your `schema.prisma` file, you should format it to ensure proper spacing, indentation, and relation mappings.

**Run this command:**
```bash
npx prisma format --schema packages/database/prisma/schema.prisma
```
**What it does:** Automatically formats your Prisma schema and warns you of any syntax errors.

---

## 3. Database Migrations

Whenever you edit your `schema.prisma` file to add new models or change fields, you need to push those changes to the database.

**To create and apply a new migration (Local/Dev environment):**
```bash
npx prisma migrate dev --schema packages/database/prisma/schema.prisma --name <description_of_change>
```
*Example: `npx prisma migrate dev --schema packages/database/prisma/schema.prisma --name add_user_avatar`*

**To push changes directly without migration history (Fast prototyping):**
```bash
npx prisma db push --schema packages/database/prisma/schema.prisma
```

**To apply existing migrations (Production):**
```bash
npx prisma migrate deploy --schema packages/database/prisma/schema.prisma
```

---

## 4. Generating the Prisma Client

If you pull changes from Git or update your schema, you need to regenerate the TypeScript client so your code has the latest types.

**Run this command:**
```bash
npx prisma generate --schema packages/database/prisma/schema.prisma
```

---

## 5. Seeding Data

We have custom Node scripts located in the `scripts/` folder to populate your database with initial required data (like Super Admin roles, permissions, and demo users).

**Run the master seed script:**
```bash
node scripts/seed.js
```
**What it does:** 
1. Seeds all system permissions and roles (`SUPER_ADMIN`, `OWNER`, `MANAGER`, etc.).
2. Creates the base `superadmin@commercex.com` user and applies the `SUPER_ADMIN` role across the platform.

**Run the test-user seed script (Optional):**
```bash
node scripts/seed-users.js
```

---

## 6. Running Security Checks

We have a custom script to quickly run dependency audits, scan for secrets, and verify architectural integrity.

**Run this command:**
```bash
node scripts/security-check.js
```

---

## 📝 General Rule of Thumb

Because of the monorepo structure, **always** remember to append `--schema packages/database/prisma/schema.prisma` to any standard `npx prisma <command>` you find in the official Prisma documentation!
