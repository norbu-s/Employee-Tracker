USE employee_db;

INSERT INTO department (name)
VALUES ("Humanresource");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Risk");

INSERT INTO department (name)
VALUES ("Mortgage Services");

INSERT INTO department (name)
VALUES ("Back Office");


USE employee_db;

INSERT INTO role (title,salary,department_id) 
VALUES("manager", 130000,1);

INSERT INTO role (title,salary,department_id)
VALUES("manager", 180000,2);

INSERT INTO role (title,salary,department_id)
VALUES("manager", 140000,3);

INSERT INTO role (title,salary,department_id)
VALUES("manager", 120000,4);

INSERT INTO role (title,salary,department_id)
VALUES("manager", 135000,5);

INSERT INTO role (title,salary,department_id)
VALUES("Assistant Manager", 100000,1);

INSERT INTO role (title,salary,department_id)
VALUES("Tech lead", 130000,2);

INSERT INTO role (title,salary,department_id)
VALUES("Risk Lead", 110000,3);

INSERT INTO role (title,salary,department_id)
VALUES("Credit Manager", 105000,4);

INSERT INTO role (title,salary,department_id)
VALUES("Payments Lead", 105000,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("John","doe", 1,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("James","Martin", 3,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Eric","Junior", 2,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Esse","Fitt", 3,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Vincent","Ng", 1,2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Nathan","Tran", 3,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Melanie","Walsh", 2,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Mark","Levy", 4,1);







