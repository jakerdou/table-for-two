var express = require("express");
const { Pool } = require('pg')
// const config = require('../server-config.json')


// Router
var router = express.Router();

// Initialize pool
// const pool = new Pool({
//     user: 'postgres',
//     host: config.pg_host,
//     database: 'quickdollas',
//     password: 'J@kerd0u',
//     port: config.pg_port,
//   })

// GET
// test
router.get("/test-api", function(req, res, next) {
    res.send({"key": "value"})
});

module.exports = router;
