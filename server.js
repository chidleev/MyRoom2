const express = require('express')
const path = require('path')

const db = require("./dataBase/models")
const categoriesData = require('./dataBase/originData/categories.json')
const globalVars = require('./globalVars.json')

const mainAPI = require('./API/mainAPI')

const serverApp = express()
serverApp.locals.PORT = process.env.PORT || 3000

serverApp.use(express.json())
serverApp.use(express.urlencoded({ extended: true }))

serverApp.use('/api', mainAPI)

serverApp.use('/scripts', express.static(path.join(__dirname, 'node_modules')))

serverApp.use((req, res, next) => {
    if (req.url.indexOf('.') == -1) {
        req.url = '/'
    }
    next()
})

serverApp.use('/', express.static(path.join(__dirname, 'public')))


db.sequelize.sync(/*{force: true}*/).then(() => {
    console.log("Drop and re-sync db.")
    
    //db.Categories.bulkCreate(categoriesData)
    globalVars.categories = categoriesData
    
    serverApp.listen(serverApp.locals.PORT, () => {
        console.log(`Server running on port ${serverApp.locals.PORT}`)
    })
})