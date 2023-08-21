INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 90000, 1),
  ('Salesperson', 80000, 2),
  ('Accountant', 130000, 3),
  ('Lawyer', 205000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Amy', 'Harris', 1, 4),
  ('James', 'Parker', 2, 3),
  ('Mark', 'Skinner', 3, 1),
  ('Gwen', 'Scott', 4, 5);