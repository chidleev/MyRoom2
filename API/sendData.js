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
        attributes: { 
            include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("Products.uuid")), "productsCount"]] 
        },
        include: [{
            model: db.Products,
            attributes: []
        }],
        group: ['Category.uuid'],
        order: [['name', 'ASC']]
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
            include: [{
                model: db.ProductPhotos,
                order: [['url', 'ASC']]
            }]
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