const inquirer = require("inquirer");
// const mysql = require("mysql2");
// const consoleTable = require("console.table");
// const db = require("./db");

// get the client
const mysql = require('mysql2');

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'employee_information',
//   password: 'Aboutthemshoes.'
// });

// simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );


const connection = mysql.createConnection({
    host: "localhost",
    // port: 3301, 
    user: "root",
    password: "Aboutthemshoes.",
    database: "employee_information"
});

connection.connect(function(err) {
    // console.log("Error", err);

    startScreen();
});

function startScreen() {
    inquirer.prompt([{
            type: "list",
            choices:[
                "Add a department",
                "Add a role",
                "Add an employee",
                "View all departments",
                "View all roles",
                "View all employees",
                "Update an employees' role",
                "Depart"
            ],
            message: "Select the task you wish to perform.",
            name: "task"
    }]).then(function(result) {
        console.log("You entered :" + result.task);

        switch (result.task) {
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmp();
                break;
            case "View all departments":
                viewDepts();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmp();
                break;
            case "Update an employees' role":
                updateEmp();
                break;
            default:
                depart();
        }
    });
};

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
            console.log(err)
            startScreen();
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
        startScreen();
    });
 });
}

function addEmp() {
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

function updateEmp() {
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

function viewDepts() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if (err) throw err; 
        console.table(res);
        startScreen();
    });
}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
    });
}

function viewEmp() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
    });
}

function depart() {
    connection.end();
    process.exit();
}