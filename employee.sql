create database employeedb;

create table department (
	id INT not null auto_increment,
    name varchar(30),
    Primary key (id)
    );
    
    
create table role(
	id INT not null auto_increment,
	title  VARCHAR(30) not null,
	salary decimal(10,2) not null,
	department_id INT not null,
    Primary key (id)
    );

create table employee (
	id INT not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    Primary key (id)
    );

