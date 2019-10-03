const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser')


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "ilinkserver.cs.utep.edu",
  user: "stinevra",
  password: "*utep2020!",
  database: "stinevra_db",
  multipleStatements: true
});

//CHECK CONNECTION TO DB
// mysqlConnection.connect(function(err) {
//   if (!err) 
//     console.log("Connected!");
//   else
//     console.log("error")
// });

//CREATE TABLES
// mysqlConnection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE students (name VARCHAR(40), email VARCHAR(50), utepID INT(8), advisor VARCHAR(40), advised BOOL, classification VARCHAR(10), concentration VARCHAR(20))";
//   mysqlConnection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//SHOW STUDENTS
// mysqlConnection.connect(function(err) {
//   if (err) throw err;
//   mysqlConnection.query("SELECT * FROM students", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// INSTER STUDENTS//
// mysqlConnection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO students (name, email, utepID, advisor, advised, classification, concentration) VALUES ('Ricardo Martinez', 'rmartinez@miners.utep.edu', 90581052, 'Ceberio', 0, 'senior', 'n/a')";
//   mysqlConnection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });



app.listen(3000, () => console.log('express server is running at port # 3000'));


//get all the students
app.get('/students', (req, res) => {
  mysqlConnection.query('SELECT * FROM students', (err, students) => {
    if (err) console.log(err);
    else
      res.send(students);
  })
});


//get a student by ID
app.get('/students/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM students WHERE utepID = ?', [req.params.id], (err, students) => {
    if (err) console.log(err);
    else
      res.send(students);
  })
});


//Create a student 
app.post('/students', (req, res) => {
  let student = req.body;
  var sql = "SET @name =?; SET @email =?; SET @utepID =?; SET @advisor =?; SET @advised =?; SET @classification =?; SET @concentration =?; \
  CALL StudentAdd(@name,@email,@utepID,@advisor,@advised,@classification,@concentration);" 
  mysqlConnection.query(sql,[student.name,student.email,student.utepID,student.advisor,student.advised,student.classification,student.concentration],(err, students) => {
    if (err) console.log(err);
    else
      res.send(students);
  })
});


//update a student 
app.put('/students', (req, res) => {
  let student = req.body;
  var sql = "SET @name =?; SET @email =?; SET @utepID =?; SET @advisor =?; SET @advised =?; SET @classification =?; SET @concentration =?; \
  CALL StudentEdit(@name,@email,@utepID,@advisor,@advised,@classification,@concentration);" 
  mysqlConnection.query(sql,[student.name,student.email,student.utepID,student.advisor,student.advised,student.classification,student.concentration],(err, students) => {
    if (err) console.log(err);
    else
      res.send("updated studemt");
  })
});



//create an Advisor 

//update Advisor    //need to do the script in the DB

app.put('/advisors', (req, res) => {
  let advisor = req.body;
  var sql = "SET @name =?; SET @email =?; SET @students =?; SET @id =?;  \
  CALL AdvisorEdit(@name,@email,@utepID,@advisor,@advised,@classification,@concentration);" 
  mysqlConnection.query(sql,[advisor.name,advisor.email,advisor.students,advisor.id],(err, advisors) => {
    if (err) console.log(err);
    else
      res.send("updated studemt");
  })
});

//get Advisor by name 
app.get('/advisors/:name', (req, res) => {
  mysqlConnection.query('SELECT * FROM advisors WHERE name = ?', [req.params.name], (err, advisor) => {
    if (err) console.log(err);
    else
      res.send(advisor);
  })
});



//get all the Advisor
app.get('/advisors', (req, res) => {
  mysqlConnection.query('SELECT * FROM advisors', (err, advisors) => {
    if (err) console.log(err);
    else
      res.send(advisors);
  })
});






