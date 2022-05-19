/* Нужен для получения данных из БД */
const db = require('../dataBase/models')
const originCategories = require('../dataBase/originData').categories

const cashData = {
    categories: originCategories
}

const express = require('express')

const getDataAPI = express()

getDataAPI.get('/', (req, res) => {
    res.send("GetData api work")
})

getDataAPI.get('/categories', (req, res) => {
    if (req.query.update == 1) {
        db.Categories.findAll().then(result => {
            console.log("Categories updated");
            cashData.categories = result
        })
    }
    res.json(cashData.categories)
})

getDataAPI.post('/productsByCategory', (req, res) => {
    if (!Boolean(req.body.categoryENname)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Отсутствует название категории'
            }]
        })
        return
    }

    db.Categories.findOne({
        where: { ENname: req.body.categoryENname},
        include: ["Products"]
    })
    .then(category => {
        res.json(category)
    })
    .catch(error => {
        res.sendStatus(404)
    })
})

module.exports = getDataAPI