const dbConfig = require("../dbConfig.js"); //подключаем реквизиты и конфигурацию удаленной базы данных
const { Sequelize, Op, DataTypes } = require("sequelize"); //подключаем библеотеку для работы с базой данных

/*Создаем объект, через который будем взаимодествовать с БД
Передаем реквизиты БД и конфигурационные данные для подключения*/
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
});

const db = {}; //Создаем объект БД
/*Сохраняем в объекте БД необходимы данные*/
db.Sequelize = Sequelize;
db.Op = Op;
db.DataTypes = DataTypes;
db.client = client;

/*Объявляем и сохраняем объекте БД наши таблицы*/
db.Users = require("./modelUser.js")(client, Sequelize, DataTypes);
db.Categories = require("./modelCategory.js")(client, Sequelize, DataTypes);
db.Products = require("./modelProduct.js")(client, Sequelize, DataTypes);

/*Устанавливаем связи между таблицами*/
db.Categories.hasMany(db.Products);
db.Products.belongsTo(db.Categories);

module.exports = db; //экспортируем объект базы данных