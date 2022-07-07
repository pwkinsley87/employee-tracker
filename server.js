const inquirer = import("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const db = require(".");
const { rootCertificates } = require('tls');
const { connected } = require('process');
const { deprecate } = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3301, 
    user: "root",
    password: "Aboutthemshoes.",
    database: "employee_information"
});

connection.connect(function(err) {
    console.log("Connected as id" + connected.threadId);

    startScreen();
});

function startScreen() {
    inquirer
     .prompt({
        type: "list",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View all departments", 
            "View all roles",
            "View all employees",
            "Update an employee role",
            "Depart"
        ],
        message: "What task would you like to perform?",
        name: "option"
     })
     .then(function(result){
        console.log("You entered: " + result.option);

        switch (result.option) {
            case "Add a department":
             addDepartment();
             break;
            case "Add a role":
             addRole();
             break;
            case "Add an employee":
             addEmployee();
             break;
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Update an employee role":
                updateEmployee();
                break;
            default:
                depart();
        }
     });
}

function addDepartment() {
    inquirer.prompt([
     {
        type: "input",
        message: "Enter the department name.",
        name: "deptName"
     }
    ]).then(function(answer){

        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function(err, res) {
            if (err) throw err;
            console.table(err)
            startScreen()
        })
    })
}

function addRole() {
    inquirer.prompt([
     {
        type:"input",
        message: "Enter the employee role.",
        name: "roleTitle"
    },
    {
        type: "input",
        message: "Enter the salary for this role.",
        name: "roleSalary"
    },
    {
        name: "input",
        message: "Enter the department ID.",
        name: "roleDept"
    },

]).then(function(answer){
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleTitle, answer.roleSalary, answer.roleDept], function(err, res) {
        if (err) throw err;
        console.log(res);
        startScreen;
    });
 });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the first name of the employee.",
            name: "empFirstName"
        },
        {
           type: "input",
           message: "Enter the last name of the employee.",
           name: "empLastName" 
        },
        {
            type: "input",
            message: "Enter the role ID for the employee.",
            name: "empID"
        },
        {
            type: "input",
            message: "Enter the ID for the employees' manager.",
            name: "empMGMTID"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.empFirstName, answer.empLastName, answer.empID, answer.empMGMTID], function(err, res) {
            if (err) throw err;
            console.log(res);
            startScreen();
        });
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the employee whom you would like to update.",
            name: "empUpdate"
        },
        {
            type: "input",
            message: "Enter the new role the employee will be adopting.",
            name: "empRoleUpdate"
        }
    ]).then(function(answer){
        connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answer.empUpdate, answer.empRoleUpdate], function(err, res) {
            if (err) throw err;
            console.log(res);
            startScreen();
        });
    });
}

function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err; 
        console.table(res);
        showScreen();
    });
}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        showScreen();
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        showScreen();
    });
}

function depart() {
    connection.end();
    process.exit();
}