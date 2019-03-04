const { readFromCollection } = require('../mongodb/db');

const getLatestProjects = (logger) => (req, res) => {
  readFromCollection({ collection: 'projects', limit: process.env.LATEST_PROJECTS_LIMIT })
    .then(response => res.json(response))
    .catch(err => {
      logger.error(err);
      res.status(400).json(err);
    });
}

const getAllProject = (logger) => (req, res) => {
  readFromCollection({ collection: 'projects' })
    .then(response => res.json(response))
    .catch(err => {
      logger.error(err);
      res.status(400).json(err);
    });
}

module.exports = {
  getLatestProjects,
  getAllProject
}