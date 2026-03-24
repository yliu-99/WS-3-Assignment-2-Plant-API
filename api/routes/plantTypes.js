// Router for the /plant-types endpoint.

// require necessary modules and create a router
const express = require('express');
const plantTypesRouter = express.Router();
const db = require('../db');

// create GET request handler for /plant-types that retrieves all plant types
plantTypesRouter.get('/', (req, res) => {
  const sql = "SELECT * FROM plant_types";
  // respond with the results, or send a 500 error if the query fails
  db.query(sql, (err, results) => {
    if (err) { res.status(500).send(err); return; }
    res.json(results);
  });
});

module.exports = plantTypesRouter;
