// creates the connection to mySQL to retrive and manipulate data for the API routes

// require mysql12
const mysql = require('mysql2');

// Connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "plant_shelf_visitor",
  password: "plantsarenice88",
  database: "yuhans_plant_shelf",
  port: 8889
});

// try connection and log result
db.connect((err) => {
  if (err) { console.error("Error connecting to the database:", err); return; }
  console.log("Connected to the database");
});

module.exports = db;
