import sql from './connection.js';

async function getAllEmployees() {
  //get all the employees from the employees table
  const columns = ['employee_id', 'full_name', 'income_type', 'income', 'updated_at'];
  const results = await sql`
  SELECT ${sql(columns)}
  FROM employees
  ORDER BY full_name ASC`;

  return results;
}

async function getEmployeeManagers() {
  const results = await sql`
  SELECT e.employee_id, e.full_name AS name, COALESCE(m.full_name, 'No Manager') AS manager
  FROM employees AS e LEFT JOIN employees AS m
  ON e.manager_id = m.employee_id
  ORDER BY e.full_name ASC`;

  return results;
}

async function getEmployee(eid) {
  //get ONE employee based on id
  const columns = ['employee_id', 'full_name', 'income_type', 'income', 'updated_at'];
  const results = await sql`
  SELECT ${sql(columns)}
  FROM employees
  WHERE employee_id = ${eid}
  ORDER BY full_name ASC`;

  return results;
}

async function addEmployee(employee) {
  //insert { full_name, manager_id, income_type, income }
  const columns = ['full_name', 'manager_id', 'income_type', 'income'];
  const results = sql`
  INSERT INTO employees
    ${sql(employee, columns)}
  RETURNING *
  `;

  return results;
}

async function editEmployee(employee) {
  //update
  const columns = ['full_name', 'manager_id', 'income_type', 'income'];
  const results = sql`
  UPDATE employees SET
  ${sql(employee, columns)}
  WHERE employee_id=${employee.employee_id}
  RETURNING *
  `;
  return results;
}

async function removeEmployee(eid) {
  //delete
  const results = sql`
  DELETE FROM employees
  WHERE employee_id=${eid}
  `;
  return results;
}

export { getAllEmployees, getEmployee, getEmployeeManagers, addEmployee, editEmployee, removeEmployee };
