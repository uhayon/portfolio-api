const { readFromCollection } = require('../mongodb/db');

const getLatestProjects = (logger) => (req, res) => {
  readFromCollection({ collection: process.env.PROJECTS_COLLECTION, limit: process.env.LATEST_PROJECTS_LIMIT, sort: { _id: -1 } })
    .then(response => res.json(response))
    .catch(err => {
      logger.error(err);
      res.status(400).json('Unable to get the latest projects');
    });
}

const getAllProject = (logger) => (req, res) => {
  readFromCollection({ collection: process.env.PROJECTS_COLLECTION, sort: { _id: -1 } })
    .then(response => res.json(response))
    .catch(err => {
      logger.error(err);
      res.status(400).json('Unable to get the projects');
    });
}

module.exports = {
  getLatestProjects,
  getAllProject
}