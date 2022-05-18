const express = require('express') //подключаем фреймворк Express.js
const path = require('path') //подключаем встроенную библиотеку Path
const cookieParser = require('cookie-parser')

const db = require("./dataBase/models") //подключаем объект базы данных
const originData = require('./dataBase/originData') //подключаем начальные данные
const globalVars = require('./globalVars.json') //подключаем файл глобальных переменных

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

/*указываем главному приложению сервера искать и отправлять файлы по запросу типа 
'/directory/files.type' из папки 'public', находящейся в папке проекта*/
serverApp.use('/', express.static(path.join(__dirname, 'public')))

/*синхронизируем объект базы данных с реальной удаленной базой данных в интернете*/
db.client.sync(/*{force: true}*/).then(() => {
    console.log("Drop and re-sync db.") //сообщаем себе, что синхронизация прошла успешно
    
    //db.Categories.bulkCreate(originData.categories)
    //db.Users.bulkCreate(originData.users)
    
    /*указываем главному приложению сервера начинать работать на определенном нами ранее порту*/
    serverApp.listen(serverApp.locals.PORT, () => {
        console.log(`Server running on port ${serverApp.locals.PORT}`) //сообщаем себе, что сервер успешно запущен
    })
})