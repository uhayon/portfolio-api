#!/bin/bash
set -e

mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD admin <<EOF
use $MONGO_DB_NAME
db.createUser({
  user: '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_DB_NAME'
  }]
})
EOF

mongoimport --db $MONGO_DB_NAME --collection projects --type json --file /docker-entrypoint-initdb.d/seeds/projects.json --jsonArray
mongoimport --db $MONGO_DB_NAME --collection technologies --type json --file /docker-entrypoint-initdb.d/seeds/technologies.json --jsonArray