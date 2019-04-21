const fs = require('fs')
const Sequelize = require('sequelize')
const production = (process.env.NODE_ENV == 'production')

// Get environment vars
const { database } = production
  ? require('./.config-prod.json')
  : require('./.config-dev.json')

// Setup databse connection
let sequelize
if (production) {
  sequelize = new Sequelize({
    host: database.host,
    database: database.name,
    dialect: 'postgres',
    dialectOptions: {
      ssl : {
        rejectUnauthorized : true,
        ca: fs.readFileSync(database.root).toString(),
        key: fs.readFileSync(database.key).toString(),
        cert: fs.readFileSync(database.cert).toString(),
      }
    },
    logging: false
  })
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: database.storage,
    logging: false
  })
}

module.exports = sequelize
