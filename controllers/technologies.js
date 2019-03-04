const { readOneDocumentFromCollection } = require('../mongodb/db');

const getTechnologies = (logger) => (req, res) => {
  readOneDocumentFromCollection({ collection: process.env.TECHNOLOGIES_COLLECTION})
    .then(technologiesObject => res.json(technologiesObject))
    .catch(err => {
      logger.error(`Get technologies: ${err}`);
      res.status(400).json('Unable to get technologies');
    })
}

module.exports = {
  getTechnologies
}