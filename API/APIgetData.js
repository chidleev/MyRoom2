/* Нужен для получения данных из БД */
const globalVars = require('../globalVars.json')

const controller = require("../dataBase/controllers")

const express = require('express')

const getDataAPI = express()
getDataAPI.use(express.json())
getDataAPI.use(express.urlencoded({ extended: true }))

getDataAPI.get('/', (req, res) => {
    res.send("GetData api work")
})

getDataAPI.get('/categories', (req, res) => {
    if (req.query.update == 1) {
        controller.Category.findAll().then(result => {
            console.log("Categories updated");
            globalVars.categories = result
        })
    }
    res.json(globalVars.categories)
})

module.exports = getDataAPI