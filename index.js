const mysql = require("mysql");
const express = require("express");
const bp = require("body-parser");
const app = express();

const port = 8000;

var con = mysql.createConnection({
  host: "chuckquotedb.cuymv9bh0vjd.us-east-2.rds.amazonaws.com",
  user: "afknscientist",
  password: "ThUnDoEx2748$",
  database: "chuckquotedb",
  port: 3310
});

app.listen(port, () => {
  console.log("port");
});

app.get("/api/chuckquotes", (req, res) => {
  con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected!");

    con.query("SELECT * FROM chuckquotes", function(err, result, fields) {
      if (err) res.send(err);
      res.send(result);
      con.end();
    });
  });
});

app.post("/api/addquote", (req, res) => {
  con.connect(function(err) {
    if (err) throw err;

    var sql =
      "INSERT INTO chuckquotes (QuoteDate,ChuckQuote,EnteredBy) VALUES (res.QuoteDate,res.ChuckQuote,res.EnteredBy)";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});
