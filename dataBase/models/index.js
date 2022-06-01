const dbConfig = require("../dbConfig.js") //подключаем реквизиты и конфигурацию удаленной базы данных
const { Sequelize, Op, DataTypes } = require("sequelize") //подключаем библеотеку для работы с базой данных

/*Создаем объект, через который будем взаимодествовать с БД
Передаем реквизиты БД и конфигурационные данные для подключения*/
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
})

const db = {} //Создаем объект БД
/*Сохраняем в объекте БД необходимы данные*/
db.Sequelize = Sequelize
db.Op = Op
db.DataTypes = DataTypes
db.client = client

/*Объявляем и сохраняем объекте БД наши таблицы*/
db.Users = require("./user.js")(client, Sequelize, DataTypes)
db.Tokens = require("./token.js")(client, Sequelize, DataTypes)
db.Comments = require("./comment.js")(client, Sequelize, DataTypes)
db.BasketOrders = require("./basketOrder.js")(client, Sequelize, DataTypes)
db.Categories = require("./category.js")(client, Sequelize, DataTypes)
db.Products = require("./product.js")(client, Sequelize, DataTypes)
db.ProductPhotos = require("./productPhoto.js")(client, Sequelize, DataTypes)
db.Orders = require("./order.js")(client, Sequelize, DataTypes)

/*Устанавливаем связи между таблицами*/
db.Users.hasMany(db.Tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Users.hasMany(db.BasketOrders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Users.hasMany(db.Comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.Tokens.belongsTo(db.Users)

db.Comments.belongsTo(db.Users)
db.Comments.belongsTo(db.Products)

db.BasketOrders.belongsTo(db.Users)
db.BasketOrders.belongsTo(db.Products)

db.Categories.hasMany(db.Products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.Products.belongsTo(db.Categories)
db.Products.hasMany(db.BasketOrders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Products.hasMany(db.Comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Products.hasMany(db.ProductPhotos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db.Products.hasMany(db.Orders)

db.ProductPhotos.belongsTo(db.Products)

db.Orders.belongsTo(db.Products)

module.exports = db //экспортируем объект базы данных