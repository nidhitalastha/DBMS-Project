# Visitor and Staff Manangement System
A application built using MySQL, React.js, Node.js and Express.js

## Getting started
Clone the repository
```bash
git clone https://github.com/nidhitalastha/DBMS-Project.git .
```
## Tables Creation and data insertion
Execute the tables_creation.sql and PROC.sql files in the backend folder to create the required tables, a procedure and trigger in the MySQL database.These files can be executed by passing their paths directly as statements in the MySQL environment
```bash
mysql> {file_path}
```
Once the tables are created the data can be added to the database using the MySQL INSERT statements (OR) data about security and staff members can also be added through the register page once both the servers are running.

## Backend server
Execute the Server.js file in the backend folder to keep the backend server running with the below command
```bash
$ node Server.js
```
## Frontend server
Execute the index.js file in the frontend folder to keep the frontend server running with below command
```bash
$ npm start index.js
```
## Caution
Do not try to login or logout without adding data to your database once the tables are created.You might end up with an error message. 
