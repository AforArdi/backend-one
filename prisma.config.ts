/// <reference types="node" />

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  // Multi-file Prisma schema directory
  schema: 'prisma/',

  migrations: {
    path: 'prisma/migrations',
    seed: 'node node_modules/tsx/dist/cli.mjs prisma/seed.ts',
  },

  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});