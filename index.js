const mysql = require("mysql");

console.log("START");

var con = mysql.createConnection({
  host: "chuckquotedb.cuymv9bh0vjd.us-east-2.rds.amazonaws.com",
  user: "afknscientist",
  password: "ThUnDoEx2748$",
  database: "chuckquotedb",
  port: 3310
});

con.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");

  con.query("SELECT * FROM chuckquotes", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
