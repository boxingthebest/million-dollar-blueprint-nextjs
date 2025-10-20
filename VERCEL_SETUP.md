# Vercel Postgres Setup Instructions

## Steps to Deploy:

### 1. Create Vercel Postgres Database

1. Go to your Vercel project: https://vercel.com/million-dollar-blueprints-projects/million-dollar-blueprint-nextjs
2. Click on the "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a region (closest to your users)
6. Click "Create"

### 2. Connect Database to Project

Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### 3. Add Additional Environment Variables

In Vercel project settings → Environment Variables, add:

```
DATABASE_URL = (use the POSTGRES_PRISMA_URL value)
NEXTAUTH_SECRET = million-dollar-blueprint-secret-key-change-in-production
NEXTAUTH_URL = https://milliondollarblueprint.ai
```

### 4. Redeploy

After adding environment variables, trigger a new deployment:
- Go to Deployments tab
- Click the three dots on the latest deployment
- Click "Redeploy"

### 5. Run Database Migration

After successful deployment, you need to seed the database with the free course.

Option A: Use Vercel CLI locally
```bash
vercel env pull .env.local
pnpm prisma db push
pnpm prisma db seed
```

Option B: Add seed script to package.json and it will run automatically on deploy

## Current Status

- ✅ Code is ready for PostgreSQL
- ✅ Prisma schema updated
- ⏳ Waiting for Vercel Postgres database to be created
- ⏳ Waiting for environment variables to be set

Once you complete steps 1-4, the platform will deploy successfully!

