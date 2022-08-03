require('dotenv').config();
const http = require('http');
const express = require('express');
const configExpress = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./utils/routes');

const app = express();
const server = http.createServer(app);

configExpress(app)
connectDB();
routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send("Bizz Challenge API")
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

