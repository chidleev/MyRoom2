/* Нужен для получения данных из БД */
const db = require('../dataBase/models')
const globalVars = ('../globalVars.json')
const userValidators = require('./validators')

const sendData = {}

const express = require('express')
sendData.app = express()

sendData.app.get('/', (req, res) => {
    res.send("SrndData api work")
})

sendData.app.get('/categories', (req, res) => {
    db.Categories.findAll({
        include: [{
            model: db.Products
        }]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
        })
})

sendData.app.post('/productsByCategory', (req, res) => {
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
        where: { ENname: req.body.categoryENname },
        include: [{
            model: db.Products,
            include: [db.ProductPhotos]
        }]
    })
        .then(category => {
            res.json(category)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(404)
        })
})

module.exports = sendData