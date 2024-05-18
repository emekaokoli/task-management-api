import bcrypt from 'bcryptjs';
import { User } from '../types/User';
import pool from '../utils/db';
import { tasks } from './queries';

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(tasks.createNewUser, [
    username,
    hashedPassword,
  ]);
  return result.rows[0];
};

export const findUserByUsername = async (
  username: string
): Promise<User | null> => {
  const result = await pool.query(tasks.findByUserName, [username]);
  return result.rows[0] || null;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(tasks.findUserById, [id]);
  return result.rows[0] || null;
};
