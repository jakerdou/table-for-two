const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var cors = require("cors");
// const config = require('./server-config.json')
// const port = config.port;
const port = 9999;
require('dotenv').config();

// Create Routers
var apiRouter = require("./routes/api");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Routes
app.use("/", apiRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
