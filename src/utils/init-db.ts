import { tasks } from '../models/queries';
import pool from './db';

export const createTables = async () => {
  await pool.query(tasks.createUsers);
  await pool.query(tasks.createTable);
};
