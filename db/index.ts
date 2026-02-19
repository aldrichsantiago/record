import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({path: '.env'});

const connectionString = neon(process.env.DEVELOPMENT_DATABASE_URL!);

if (!connectionString) {
  throw new Error('DEVELOPMENT_DATABASE_URL is not defined in environment variables');
}

const db = drizzle(connectionString, { logger: true });

export { db };