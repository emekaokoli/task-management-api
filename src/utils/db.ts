import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.EXTERNAL_DATABASE_URL,
  ssl: false,
});

export default pool;
