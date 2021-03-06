Drop database if exists employee_db;

create database employee_db;

create table department (
	id INT not null auto_increment,
    name varchar(30),
    Primary key (id)
    );
    
    
create table role (
	id INT not null auto_increment,
	title  VARCHAR(30) not null,
	salary decimal(10,2) not null,
	department_id INT null,
    Primary key (id)
    foreign key (department_id) references department(id)
    );

create table employee (
	id INT not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int null,
    manager_id int null,
    Primary key (id)
    Foreign key(role_id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
    );

Select * from department;
Select * from role;
Select * from employee;


