const MongoClient = require('mongodb').MongoClient;

const connect = () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
      return client.connect((err, client) => {
        if (err || !client) {
          return reject(`Could not connect to the server: ${err}`);
        } else {
          return resolve(client);
        }
      });
    } catch(ex) {
      return reject(`Connection Error ${ex}`)
    }
  });
}

const readFromCollection = ({ collection, limit, sort }) => {
  const sortOptions = sort || {};
  const limitValue = !isNaN(Number(limit)) ? Number(limit) : 0;

  return new Promise((resolve, reject) => {
    return connect()
      .then(client => {
        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection(collection).find().sort({ _id: 1, ...sortOptions }).limit(limitValue).toArray((err, docs) => {
          client.close();
          if (err) {
            reject(`Error retrieving ${collection}: ${err}`);
          } else {
            resolve(docs);
          }
        });
      })
      .catch(err => reject(err));
  });
}

const readOneDocumentFromCollection = ({ collection }) => {
  return new Promise((resolve, reject) => {
    return connect()
      .then(client => {
        try {
          const db = client.db(process.env.MONGO_DB_NAME);
          const document = db.collection(collection).findOne();
          client.close();
          if (document) {
            return resolve(document);
          } else {
            return reject('Technologies not found');
          }
        } catch(ex) {
          return reject(ex);
        }
      })
  });
}

module.exports = {
  readFromCollection,
  readOneDocumentFromCollection
}