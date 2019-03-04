const MongoClient = require('mongodb').MongoClient;

const connect = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
    return client.connect((err, client) => {
      if (err) {
        return reject(`Could not connect to the server: ${err}`);
      } else {
        return resolve(client);
      }
    });
  });
}

const readFromCollection = ({ collection, limit }) => {
  return new Promise((resolve, reject) => {
    return connect()
      .then(client => {
        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection(collection).find().limit(limit || 0).toArray((err, docs) => {
          if (err) {
            reject(`Error retrieving ${collection}: ${err}`);
          } else {
            client.close();
            resolve(docs);
          }
        });
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  readFromCollection
}