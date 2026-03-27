import { Router } from 'express';
import { getAllEmployees, getEmployee, getEmployeeManagers, addEmployee, editEmployee, removeEmployee } from '../db/employees.js';

const employeeRouter = Router();

employeeRouter.get('/', async (req, res) => {
  // res.status(200).json({ msg: 'ok' });
  const results = await getAllEmployees();
  res.status(200).json({ results });
});

employeeRouter.get('/managers', async (req, res) => {
  const results = await getEmployeeManagers();
  res.status(200).json({ results });
});

employeeRouter.get('/:eid', async (req, res) => {
  const results = await getEmployee(req.params.eid);
  res.status(200).json({ results });
});

employeeRouter.post('/', async (req, res) => {
  const { full_name, manager_id, income_type, income } = req.body;
  const results = await addEmployee({ full_name, manager_id, income_type, income });
  res.status(201).json({ results });
});

employeeRouter.put('/:eid', async (req, res) => {
  const { full_name, manager_id, income_type, income } = req.body;
  const results = await editEmployee({ employee_id: req.params.eid, full_name, manager_id, income_type, income });
  res.status(200).json({ results });
});

employeeRouter.delete('/:eid', async (req, res) => {
  const results = await removeEmployee(req.params.eid);
  res.status(204).json({ message: 'Employee downsized.' });
  //content is ignored by POSTMAN with status 204
});

export default employeeRouter;
