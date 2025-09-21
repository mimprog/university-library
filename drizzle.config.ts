import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

const isLocal = process.env.USE_LOCAL_DB === 'false';
console.log(isLocal);

export default defineConfig({
  schema: './database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
   url: isLocal
      ? process.env.LOCAL_DATABASE_URL!
      : process.env.DATABASE_URL!,
  },
});
