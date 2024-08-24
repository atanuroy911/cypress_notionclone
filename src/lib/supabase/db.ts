import { drizzle } from 'drizzle-orm/postgres-js';
import postgress from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { dot } from 'node:test/reporters';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('🔴 Cannot find database URL');
}

const client = postgress(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, schema);
const migrateDB = async () => {
    try {
        console.log('🟠 Migrating database');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('🟢 Database migrated');
    } catch (error) {
        console.log('🔴 Error migrating database', error);
    }
}
migrateDB();
export default db;