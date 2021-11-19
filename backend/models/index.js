const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  hooks: {
    beforeCreate: ((attributes) => {
      if (attributes && attributes.dataValues && attributes.dataValues.hasOwnProperty('id')) {
        delete attributes.dataValues.id
      }
    })
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./post.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;