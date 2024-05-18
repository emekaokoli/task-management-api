import { Response } from 'express';
import { AuthenticatedRequest } from '../../type';
import { io } from '../app';
import {
  createTask,
  deleteTask,
  getTasksByUserId,
  updateTask,
} from '../models/task';
import { taskSchema } from '../schema/request.schema';
import { ResponseBuilder } from '../utils/responseBuilder';

export const createTaskHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { title, description } = taskSchema.parse(req.body);
    const task = await createTask(title, description, Number(req?.user?.id));
    return ResponseBuilder.success(res, 201, { task });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error creating task',
      err.message
    );
  }
};

// Get all tasks for the authenticated user
export const getTasksHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const tasks = await getTasksByUserId(Number(req?.user?.id));
    
    // Emit the task creation event
    io.emit('taskCreated', tasks);
    console.log({TASKCREATED:  tasks});
    

    return ResponseBuilder.success(res, 200, { tasks });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      500,
      'Error fetching tasks',
      err.message
    );
  }
};

// Update an existing task
export const updateTaskHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = taskSchema.parse(req.body);
    const task = await updateTask(
      Number(id),
      title,
      description,
      Boolean(completed)
    );
    if (!task) {
      return ResponseBuilder.failure(res, 404, 'Task not found');
    }
    return ResponseBuilder.success(res, 200, { task });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error updating task',
      err.message
    );
  }
};

// Delete an existing task
export const deleteTaskHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteTask(Number(id));
    return ResponseBuilder.success(res, 200, {
      message: 'Task deleted successfully',
    });
  } catch (err: any) {
    return ResponseBuilder.failure(
      res,
      400,
      'Error deleting task',
      err.message
    );
  }
};
