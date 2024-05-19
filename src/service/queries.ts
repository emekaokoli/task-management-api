// the structure of the database tables.

export const tasks = {
  createTable: `
         CREATE TABLE IF NOT EXISTS tasks (
            id            SERIAL PRIMARY KEY,
            title         VARCHAR(255) NOT NULL,
            description   TEXT NOT NULL,
            completed     BOOLEAN DEFAULT FALSE,
            user_id       INTEGER REFERENCES users(id)
          
         );
         `,
  createUsers: `
        CREATE TABLE IF NOT EXISTS users (
            id         SERIAL PRIMARY KEY,
            username   VARCHAR(100) NOT NULL UNIQUE,
            password   VARCHAR(100) NOT NULL
        );
    
        `,
  insert: `INSERT INTO tasks (title, description, user_id) 
             VALUES ($1, $2, $3) 
             RETURNING *
          `,

  update: `
            UPDATE tasks SET title = $1, description = $2, completed = $3 
            WHERE id = $4 
            RETURNING *
        `,
  delete: `
            DELETE FROM tasks
            WHERE id = $1
        `,
  findUserById: `
            SELECT * FROM users 
            WHERE id = $1
        `,
  createNewUser: `
           INSERT INTO users (username, password) 
           VALUES ($1, $2) 
           RETURNING *

        `,
  selectById: `
           SELECT * FROM tasks 
           WHERE user_id = $1
            
        `,
  findByUserName: `
          SELECT * FROM users 
          WHERE username = $1
            
        `,
};
