const mysql = require("mysql");
const express = require("express");
var fs = require("fs");
var https = require("https");
var http = require("http");
const app = express();
app.use(express.json());

const port = 80;

var sqlpool = mysql.createPool({
  host: "chuckquotedb.cuymv9bh0vjd.us-east-2.rds.amazonaws.com",
  user: "afknscientist",
  password: "ThUnDoEx2748$",
  database: "chuckquotedb",
  port: 3310
});

var sslOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  passphrase: "ThUnDoEx2748$"
};

https.createServer(sslOptions, app).listen(443);
http.createServer(app).listen(port);
//app.listen(port);

app.get("/api/chucks", (req, res) => {
  var sql = "SELECT * FROM chuckquotes";
  sqlpool.query(sql, function(err, result, fields) {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/api/chuck/:ID", (req, res) => {
  var sql = "SELECT * FROM chuckquotes WHERE ID='" + req.params.ID + "'";
  sqlpool.query(sql, function(err, result, fields) {
    if (err) res.send(err);
    res.send(result);
  });
});

app.post("/api/add", (req, res) => {
  var sql =
    "INSERT INTO chuckquotes (QuoteDate,ChuckQuote,EnteredBy) VALUES('" +
    req.body.QuoteDate +
    "','" +
    req.body.ChuckQuote +
    "','" +
    req.body.EnteredBy +
    "')";
  sqlpool.query(sql, function(err, result) {
    if (err) res.send(err);
    res.send("1recordadded");
  });
});

app.put("/api/edit/:ID", (req, res) => {
  var sql =
    "UPDATE chuckquotes SET QuoteDate = '" +
    req.body.QuoteDate +
    "',ChuckQuote= '" +
    req.body.ChuckQuote +
    "',EnteredBy= '" +
    req.body.EnteredBy +
    "' WHERE ID='" +
    req.params.ID +
    "'";
  sqlpool.query(sql, function(err, result, fields) {
    if (err) res.send(err);
    res.send(result);
  });
});

app.delete("/api/chuck/:ID", (req, res) => {
  var sql = "DELETE FROM chuckquotes WHERE ID='" + req.params.ID + "'";
  sqlpool.query(sql, function(err, result, fields) {
    if (err) res.send(err);
    res.send(result);
  });
});
