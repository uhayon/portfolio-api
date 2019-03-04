require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./middleware/cors');
const securityMiddleware = require('./middleware/security');
const { morgan, logger } = require('./middleware/logger');

const { getLatestProjects, getAllProject } = require('./controllers/projects');
const { getTechnologies } = require('./controllers/technologies');

const app = express();
app.use(bodyParser.json());
app.use(securityMiddleware.basic());
app.use(securityMiddleware.securityPolicy());
app.use(morgan());
app.use(cors());

app.get('/', (req, res) => res.json('Vamo arriba'));
app.get('/projects/latest', getLatestProjects(logger));
app.get('/projects', getAllProject(logger));
app.get('/technologies', getTechnologies(logger));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;