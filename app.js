const express = require("express"); 
const bodyParser = require("body-parser"); 
const mysql = require('mysql')
const app = express();

const db = mysql.createConnection({
    host : 'localhost',
    user : "root",
    password : '',
    database : 'employee'
});

const employees = [ 
{ 
	employeeId: "1", 
	employeeName: "CHRISPIN KULANGA", 
	employeePost: "Manager", 
	employeeSalary: "43000", 
}, 
{ 
	employeeId: "2", 
	employeeName: "GODSON KAKULWA", 
	employeePost: "Assistant Manager", 
	employeeSalary: "21000", 
}, 
]; 


app.set("view engine", "pug"); 

app.use(bodyParser.json()); 
app.use( 
bodyParser.urlencoded({ 
	extended: true, 
}) 
); 

app.get("/", function (req, res) { 
res.render("home", { 
	data: employees, 
})
app.get('/login', (req, res)=> {
    res.render('login.pug')
})

app.get('/about', (req, res)=> {
    res.render('about.pug')
})
app.get('/contact', (req, res)=> {
    res.render('contact.pug')
})

}); 

app.post("/", (req, res) => { 
const inputEmployeeId = employees.length + 1; 
const inputEmployeeName = req.body.employeeName; 
const inputEmployeePost = req.body.employeePost; 
const inputEmployeeSalary = req.body.employeeSalary; 

employees.push({ 
	employeeId: inputEmployeeId, 
	employeeName: inputEmployeeName, 
	employeePost: inputEmployeePost, 
	employeeSalary: inputEmployeeSalary, 
}); 

res.render("home", { 
	data: employees, 
}); 
}); 

app.post("/delete", (req, res) => { 
var requestedEmployeeId = req.body.employeeId; 
var j = 0; 
employees.forEach((employee) => { 
	j = j + 1; 
	if (employee.employeeId === requestedEmployeeId) { 
	employees.splice(j - 1, 1); 
	} 
}); 
res.render("home", { 
	data: employees, 
}); 
}); 

app.post("/update", (req, res) => { 
const requestedEmployeeId = req.body.employeeId; 
const inputEmployeeName = req.body.employeeName; 
const inputEmployeePost = req.body.employeePost; 
const inputEmployeeSalary = req.body.employeeSalary; 

var j = 0; 
employees.forEach((employee) => { 
	j = j + 1; 
	if (employee.employeeId == requestedEmployeeId) { 
	(employee.employeeName = inputEmployeeName), 
		(employee.employeePost = inputEmployeePost), 
		(employee.employeeSalary = inputEmployeeSalary); 
	} 
}); 
res.render("home", { 
	data: employees, 
}); 
}); 

app.listen(3000, (req, res) => { 
console.log("App is running on port 3000"); 
}); 

app.get('/createuser', (req,res) =>{
    let user = {user_id: 2, username: 'chrispin',password: '1233'}
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, user,(err, result)=> {
        if(err) throw err;
        console.log(result);
        res.send("user table created")
    })
});