// Imports
const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser')
const pkg = require('../package.json');
const helmet = require("helmet");
const logger = require('./config/logger');
// create application/json parser
let jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'production') {
  logger.info("Node is starting in DEVELOPMENT mode");
}


// Middleware
app.use(helmet());
app.use(cors())
// log request traffic
app.use(function (req, res, next) {
  logger.info(`${req.method} - ${req.url}`);
  next()
})

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})
// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})

// get app version set in package.json
app.get('/version', (req, res) => {
  res.send(pkg.version);
});

app.get('/', (req, res) => {
  res.json({ message: "Welcome to marketwatch application." });
});


// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/dist/marketwatch/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
