import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? process.env.EXTERNAL_DATABASE_URL,
});

export default pool;
