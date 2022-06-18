const express = require('express') //подключаем фреймворк Express.js
const path = require('path') //подключаем встроенную библиотеку Path
const cookieParser = require('cookie-parser')

const usersValidators = require('./API/validators')

const db = require("./dataBase/models") //подключаем объект базы данных
const originData = require('./dataBase/originData') //подключаем начальные данные

/*подключаем приложение для управления обработки запросов RestAPI*/
const mainAPI = require('./API/mainAPI')

const serverApp = express() //создаем главное приложение сервера
serverApp.locals.PORT = process.env.PORT || 3000 //определяем порт, на котором будет работать сервер

/*указываем главному приложению сервера использовать парсер JSON для всех входящих запросов*/
serverApp.use(express.json()) 

/*указываем главному приложению сервера использовать парсер url для всех входящих POST запросов*/
serverApp.use(express.urlencoded({ extended: true }))

/*указываем главному приложению сервера использовать cookie-парсер для всех входящих запросов*/
serverApp.use(cookieParser('My secret "MyRoom-shop" key :D'))

/*указываем главному приложению сервера обрабатывать входящие запросы RestAPI с помощью приложения обработки запросов RestAPI*/
serverApp.use('/api', mainAPI)

/*указываем главному приложению сервера искать и отправлять файлы по запросу типа 
'/scripts/directory/files.type' из папки 'node_modules', находящейся в папке проекта*/
serverApp.use('/scripts', express.static(path.join(__dirname, 'node_modules')))

/*указываем главному приложению сервера переписывать все остальные запросы не файлов
в запросы типа '/', что необходимо для реализации работы SPA*/
serverApp.use((req, res, next) => {
    if (req.url.indexOf('.') == -1) {
        req.url = '/'
    }
    next()
})


serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'default')))
serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'components')))
serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'logged')))
serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'admin')))
serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'accountant')))
serverApp.use('/css', express.static(path.join(__dirname, 'public', 'css', 'manager')))

serverApp.use('/icon', express.static(path.join(__dirname, 'public', 'icons')))

serverApp.use('/js', express.static(path.join(__dirname, 'public', 'js')))
serverApp.use('/js/component', express.static(path.join(__dirname, 'public', 'js', 'components')))
serverApp.use('/js/pageScript', express.static(path.join(__dirname, 'public', 'js', 'default')))
serverApp.use('/js/pageScript', express.static(path.join(__dirname, 'public', 'js', 'logged')))
serverApp.use('/js/pageScript', usersValidators.isNotDefaultUser, express.static(path.join(__dirname, 'public', 'js', 'admin')))
serverApp.use('/js/pageScript', usersValidators.isNotDefaultUser, express.static(path.join(__dirname, 'public', 'js', 'accountant')))
serverApp.use('/js/pageScript', usersValidators.isNotDefaultUser, express.static(path.join(__dirname, 'public', 'js', 'manager')))

serverApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'))
})

/*синхронизируем объект базы данных с реальной удаленной базой данных в интернете*/
db.client.sync(/*{force: true}*/).then(() => {
    console.log("---> Sync DataBase") //сообщаем себе, что синхронизация прошла успешно

    /*db.Users.bulkCreate(originData.users)

    const categories = []
    db.Categories.bulkCreate(originData.categories)
    .then(result => {
        result.forEach(category => {
            categories.push({
                uuid: category.dataValues.uuid,
                name: category.dataValues.name
            })
        });

        originData.products.forEach(originProduct => {
            db.Products.create(originProduct)
            .then(product => {
                const categoryUUID = categories.find(category => category.name == originProduct.categoryName).uuid
                product.setCategory(categoryUUID)
                .then(category => {
                    console.log("---> Продукт с категорией создан");
                })
                .catch(err => {
                    console.error(err);
                })
            })
            .catch(err => {
                console.error(err);
            })
        })
    })
    .catch(err => {
        console.error(err);
    })*/

    /*указываем главному приложению сервера начинать работать на определенном нами ранее порту*/
    serverApp.listen(serverApp.locals.PORT, () => {
        console.log(`Server running on port ${serverApp.locals.PORT}`) //сообщаем себе, что сервер успешно запущен
    })
})