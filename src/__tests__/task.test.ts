import http from 'http';
import request from 'supertest';
import { createApp } from '../app';
import pool from '../utils/db';


let token: string;


const server = http.createServer();
const app = createApp(server);

beforeAll(async () => {
  // Create a test user and get a token
  await pool.query('TRUNCATE TABLE users, tasks RESTART IDENTITY CASCADE');

  await request(app)
    .post('/api/register')
    .send({ username: 'testuser', password: 'password123' })
    .expect(201)
    .then((response) => {
      token = response.body.data.token;
    });
});

afterAll(async () => {
  await pool.end();
});

describe('Task API', () => {
  let taskId: number;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      })
      .expect(201);

    const task = response.body.data.task;
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('This is a test task');
    expect(task.completed).toBe(false);
    taskId = task.id;
  });

  it('should get all tasks for the authenticated user', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const tasks = response.body.data.tasks;
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should update a task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        description: 'This is an updated test task',
        completed: true,
      })
      .expect(200);

    const task = response.body.data.task;
    expect(task.title).toBe('Updated Task');
    expect(task.description).toBe('This is an updated test task');
    expect(task.completed).toBe(true);
  });

  it('should delete a task', async () => {
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const tasks = response.body.data.tasks;
    expect(tasks.length).toBe(0);
  });
});