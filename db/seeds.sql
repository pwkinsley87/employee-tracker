INSERT INTO department (name) 
VALUES ("Sales"), ("Production"), ("Logistics"), ("Maintenance"), ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Associate", 55000.00, 1), ("Press Operator", 34500.00, 2), ("Driver", 28500.00, 4), ("Maintenance Associate - 3rd Shift", 43200.00, 5), ("Warehouse Associate - A Shift", 33000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Leopold", "Bloom", 2, 1), ("Stephen", "Dedalus", 2, 2), ("Buck", "Mulligan", 2, 3), ("Martin", "Cunningham", 3, 5), ("Paddy", "Dignam", 2, 3);