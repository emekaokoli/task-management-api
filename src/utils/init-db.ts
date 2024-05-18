import { tasks } from '../service/queries';
import pool from './db';

export const createTables = async () => {
  await pool.query(tasks.createUsers);
  await pool.query(tasks.createTable);
};
