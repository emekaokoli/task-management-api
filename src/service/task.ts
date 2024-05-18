import { Task } from '../types/Task';
import pool from '../utils/db';
import { tasks } from './queries';

export const createTask = async (
  title: string,
  description: string,
  userId: number
): Promise<Task> => {
  const result = await pool.query(tasks.insert, [title, description, userId]);
  return result.rows[0];
};

export const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  const result = await pool.query(tasks.selectById, [userId]);
  return result.rows;
};

export const updateTask = async (
  id: number,
  title: string,
  description: string,
  completed: boolean
): Promise<Task> => {
  const result = await pool.query(tasks.update, [
    title,
    description,
    completed,
    id,
  ]);
  return result.rows[0];
};

export const deleteTask = async (id: number): Promise<void> => {
  await pool.query(tasks.delete, [id]);
};
