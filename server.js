if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./middleware/cors');
const securityMiddleware = require('./middleware/security');
const { morgan, logger } = require('./middleware/logger');
const { rateLimiter, speedLimiter } = require('./middleware/network');

const { getLatestProjects, getAllProject } = require('./controllers/projects');
const { getTechnologies } = require('./controllers/technologies');
const { sendMail } = require('./controllers/contact');

const app = express();
app.use(bodyParser.json());
app.use(securityMiddleware.basic());
app.use(securityMiddleware.securityPolicy());
app.use(morgan());
app.use(cors());

app.get('/projects/latest', getLatestProjects(logger));
app.get('/projects', getAllProject(logger));
app.get('/technologies', getTechnologies(logger));
app.post('/contact', [rateLimiter, speedLimiter], sendMail(logger));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;