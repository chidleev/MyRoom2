const dbConfig = require("../dbConfig.js");
const { Sequelize, Op, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  dialectOptions: dbConfig.dialectOptions,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.Categories = require("./modelCategory.js")(sequelize, Sequelize, DataTypes);
db.Products = require("./modelProduct.js")(sequelize, Sequelize, DataTypes);

db.Categories.hasMany(db.Products, { as: "products" });
db.Products.belongsTo(db.Categories, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = db;