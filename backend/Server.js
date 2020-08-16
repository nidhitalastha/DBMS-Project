const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
var mysql = require("mysql");
const moment = require("moment");
const connection = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "",
  database: "apartment"
});

connection.connect(function(err) {
  if (err) {
    throw err;
    console.log(err + "++++++++++++++//////////////");
    console.log("connection******");
  }
});

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(express.json());

app.post("/details", (req, res) => {
  if (req.body.user_type === "staff") {
    connection.query(`select username,phone from Staff`, function(
      err,
      rows,
      fields
    ) {
      if (err) throw err;
      console.log(rows);
      res.json({
        rows
      });
    });
  } else if (req.body.user_type === "security") {
    connection.query(`select username,phone from Security`, function(err, rows, fields) {
      if (err) throw err;
      res.json({
        rows
      });
    });
  }
});
app.post("/logoutdetails", (req, res) => {
  if (req.body.user_type === "staff") {
    connection.query(
      `select username,phone from Staff_login where logout is null`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.json({
          rows
        });
      }
    );
  } else if (req.body.user_type === "security") {
    connection.query(
      `select username,phone from Security_login where logout is null`,
      function(err, rows, fields) {
        if (err) throw err;
        res.json({
          rows
        });
      }
    );
  } else if (req.body.user_type === "visitor") {
    connection.query(
      `select fname as username,phone from Visitor where logout is null`,
      function(err, rows, fields) {
        if (err) throw err;
        res.json({
          rows
        });
      }
    );
  }
});
app.post("/Register", (req, res) => {
  if (req.body.user_type === "staff") {
    connection.query(
      `INSERT INTO Staff(username,fname,lname,type,gender,dob,addr,phone) VALUES('${req.body.username}','${req.body.fname}','${req.body.lname}','${req.body.type}',${req.body.gender}','${req.body.dob}','${req.body.address}','${req.body.phone}')`,
      function(err, rows, fields) {
        if (err) throw err;
        res.json({
          registered: true
        });
      }
    );
  } else if (req.body.user_type === "security") {
    connection.query(
      `INSERT INTO Security(username,fname,lname,gender,dob,addr,phone) VALUES('${req.body.username}','${req.body.fname}','${req.body.lname}','${req.body.gender}','${req.body.dob}','${req.body.address}','${req.body.phone}')`,
      function(err, rows, fields) {
        if (err) throw err;
        res.json({
          registered: true
        });
      }
    );
  }
});

app.post("/Login", (req, res) => {
  console.log(req.body);
  if (req.body.user_type === "staff") {
    connection.query(
      `select * from Staff where phone="${req.body.userphone}"`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        if (
          req.body.userphone == rows[0].phone &&
          req.body.username == rows[0].username
        ) {
          connection.query(
            `select * from Staff_login where logout is null and phone="${req.body.userphone}"`,
            function(err, rows, fields) {
              if (err) throw err;

              connection.query(
                `insert into Staff_login(username,phone) values("${req.body.username}","${req.body.userphone}")`,
                function(err, rows, fields) {
                  if (err) {
                    res.json({
                      loggedin: false
                    });
                  } else {
                    connection.query(`update Staff set logged_in = 1 where username = "${req.body.username}" and phone = "${req.body.userphone}"`)
                    res.json({
                      loggedin: true
                    });
                  }
                }
              );
            }
          );
        } else {
          res.send("Please enter valid username and phoneno.!");
        }
      }
    );
  } else if (req.body.user_type === "security") {
    connection.query(
      `select * from Security where phone="${req.body.userphone}"`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);

        if (
          req.body.userphone == rows[0].phone &&
          req.body.username == rows[0].username
        ) {
          connection.query(
            `select * from Security_login where logout is null and phone="${req.body.userphone}"`,
            function(err, rows, fields) {
              if (err) throw err;

              connection.query(
                `insert into Security_login(username,phone) values("${req.body.username}","${req.body.userphone}")`,
                function(err, rows, fields) {
                  if (err) {
                    res.json({
                      loggedin: false
                    });
                  } else {
                    connection.query(`update Security set logged_in = 1 where username = "${req.body.username}" and phone = "${req.body.userphone}"`)
                    res.json({
                      loggedin: true
                    });
                  }
                }
              );
            }
          );
        } else {
          res.send("Please enter valid username and phoneno.!");
        }
      }
    );
  }
});


app.post("/Logout", (req, res) => {
  console.log(req.body);

  if (req.body.user_type === "staff") {
    connection.query(
      `update Staff_login set logout=("${moment().format(
        "YYYY/MM/DD HH:mm:ss"
      )}") where phone='${req.body.userphone}'`,
      function(err, rows, fields) {
        if (err) {
          res.json({
            loggedout: false
          });
        } else {
          connection.query(`update Staff set logged_in = 0 where username = "${req.body.username}" and phone = "${req.body.userphone}"`)
          res.json({
            loggedout: true
          });
        }
      }
    );
  } else if (req.body.user_type === "security") {
    connection.query(
      `update Security_login set logout=("${moment().format(
        "YYYY/MM/DD HH:mm:ss"
      )}") where phone='${req.body.userphone}' and username='${req.body.username}'`,
      function(err, rows, fields) {
        if (err) {
          res.json({
            loggedout: false
          });
        } else {
          connection.query(`update Security set logged_in = 0 where username = "${req.body.username}" and phone = "${req.body.userphone}"`)
          res.json({
            loggedout: true
          });
        }
      }
    );
  } else if (req.body.user_type === "visitor") {
    connection.query(
      `update Visitor set logout=("${moment().format(
        "YYYY/MM/DD HH:mm:ss"
      )}") where phone="${req.body.userphone}" `,
      function(err, rows, fields) {
        if (err) {
          res.json({
            loggedout: false
          });
        } else {
          res.json({
            loggedout: true
          });
        }
      }
    );
  }
});

app.post("/Visitorpage", (req, res) => {
  connection.query(
    `INSERT INTO Visitor(fname,lname,num,phone,relation,vehicle,flat) VALUES('${req.body.fname}','${req.body.lname}',${req.body.num},'${req.body.phone}','${req.body.relation}','${req.body.vehicle}',${req.body.flat})`,
    function(err, rows, fields) {
      if (err) throw err;
      res.json({
        loggedin: true
      });
    }
  );
});

app.post("/Delivery", (req, res) => {
  connection.query(
    `INSERT INTO Delivery(fname,lname,phone,vehicle,flat,company) VALUES('${req.body.fname}','${req.body.lname}','${req.body.phone}','${req.body.vehicle}',${req.body.flat},'${req.body.company}')`,
    function(err, rows, fields) {
      if (err) throw err;
      res.json({
        loggedin: true

      });
  
    }
  );
});

app.listen(9000, () => {
  console.log("Runnning on ");
});
