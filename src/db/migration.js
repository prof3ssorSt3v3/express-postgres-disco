import sql from './connection.js';

async function buildEmployees() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS employees (
    employee_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    manager_id INTEGER CHECK (manager_id >=0),
    income_type VARCHAR(20) DEFAULT 'wage',
    income money,
    updated_at TIMESTAMP DEFAULT NOW()
  )`;
  } catch (err) {
    console.log(err.message);
  } finally {
    await sql.end(); // Close the connection pool
  }
}

buildEmployees();
