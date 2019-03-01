require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');

const cors = require('./middleware/cors');
const securityMiddleware = require('./middleware/security');
const { morgan, logger } = require('./middleware/logger');

const app = express();
// app.use(bodyParser.json());
app.use(securityMiddleware.basic());
app.use(securityMiddleware.securityPolicy());
app.use(morgan());
app.use(cors());

app.get('/', (req, res) => res.json('Vamo arriba'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});