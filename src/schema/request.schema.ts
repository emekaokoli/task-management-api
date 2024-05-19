import { z } from "zod";


export const taskSchema = z.object({
  title: z.string({ message: 'Title is required' }).min(1),
  description: z.string({ message: 'Description is required' }).min(1),
  completed: z.boolean().optional().default(false),
});

export const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});