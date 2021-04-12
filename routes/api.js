var express = require("express");
// const config = require('../server-config.json')


// Router
var router = express.Router();

// GET
// test
router.get("/test-api", function(req, res, next) {
    res.send({"key": "value"})
});

module.exports = router;
