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
            }, {
                model: db.Comments,
                order: [['postedAt', 'ASC']]
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

sendData.app.post('/productsSearch', (req, res) => {
    const whereProps = {}

    if (Boolean(req.body.categoryUUID)) {
        whereProps.CategoryUuid = req.body.categoryUUID
    }
    if (Boolean(req.body.searchLine)) {
        whereProps.name = {
            [db.Op.iLike]: '%' + req.body.searchLine + '%'
        }
    }

    db.Products.findAll({
        where: whereProps,
        include: [{
            model: db.ProductPhotos,
            order: [['url', 'ASC']]
        }, {
            model: db.Comments,
            include: [{
                model: db.Users,
                attributes: ['name', 'photoURL']
            }],
            order: [['postedAt', 'DESC']]
        }]
    })
        .then(products => {
            res.json(products)
        })
        .catch(error => {
            console.log(error);
            res.status(422).json({
                errors: [{
                    type: 'sequilize',
                    comment: 'Не удалось сделать запрос к БД'
                }]
            })
        })
})

sendData.app.get('/comments', (req, res) => {
    db.Comments.findAll({
        include: [{
            model: db.Users,
            attributes: ['name', 'photoURL']
        }, {
            model: db.Products,
            attributes: ['name'],
            include: [{
                model: db.Categories,
                attributes: ['ENname']
            }]
        }],
        order: [['postedAt', 'DESC']]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
        })
})

sendData.app.get('/contacts', (req, res) => {
    db.Users.findAll({
        where: { roleUUID: {
            [db.Op.not]: "00000000-0000-0000-0000-000000000000"
        }},
        attributes: ['name', 'photoURL', 'phone', 'email', 'roleUUID']
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404)
        })
})

module.exports = sendData