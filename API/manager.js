/*
•	Возможность просматривать статистику продаж и формировать отчет
•	Возможность просматривать остаток товаров на складах и формировать заявки на заказ мебели от поставщиков
•	Возможность оформлять покупку, непосредственно в магазине, для клиента, используя его логин учетной записи
*/
const bcrypt = require('bcrypt')
const xlsx = require('node-xlsx');
const checkIsManager = require('./validators').isManager

const db = require("../dataBase/models");

const express = require('express')

const managerAPI = express()
managerAPI.use(checkIsManager)

managerAPI.get('/', (req, res) => {
    res.send("Manager api work")
})

managerAPI.get('/usersOrders', (req, res) => {
    db.BasketOrders.findAll()
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить статистику заказов'
                }]
            })
        })
})

/*new Date(new Date() + 5 * 24 * 60 * 60 * 1000)*/
managerAPI.post('/takeOrder', (req, res) => {
    var ordersArray = []
    for (const key in req.body.ordersCounts) {
        if (Object.hasOwnProperty.call(req.body.ordersCounts, key)) {
            if (req.body.ordersCounts[key] > 0) {
                ordersArray.push({
                    ProductUuid: key,
                    daliveryDate: new Date(Date.now() + Math.round(Math.random() * 4 + 1) * 24 * 60 * 60 * 1000),
                    count: req.body.ordersCounts[key]
                })
            }
        }
    }
    
    db.Orders.bulkCreate(ordersArray)
    .then(orders => {
        res.send('Товары заказаны')
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errors: [{
                type: 'sequalize',
                comment: 'Не удалось заказать товары'
            }]
        })
    })
})

managerAPI.post('/userBasketOrder', (req, res) => {
    const errors = []

    if (!Boolean(req.body.user.login)) {
        errors.push({
            type: 'login',
            comment: 'Вы не ввели логин'
        })
    }
    if (!Boolean(req.body.user.password)) {
        errors.push({
            type: 'password',
            comment: 'Вы не ввели пароль'
        })
    }
    if (!Boolean(req.body.productUuid)) {
        errors.push({
            type: 'password',
            comment: 'Вы не выбрали товар'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.findOne({
        where: { login: req.body.user.login }
    })
        .then(user => {
            if (user == null) {
                errors.push({
                    type: 'login',
                    comment: 'Пользователя с таким логином не найдено'
                })
                res.status(404).json({
                    errors: errors
                })
            }
            else {
                bcrypt.compare(req.body.user.password, user.password).then(success => {
                    if (success) {
                        db.BasketOrders.create({
                            status: 4,
                            ProductUuid: req.body.productUuid,
                            UserUuid: user.uuid
                        })
                        .then(order => {
                            order.getProduct()
                            .then(product => {
                                if (product.count > 0) {
                                    product.increment({ count: -1 })
                                    .then(product => {
                                        res.send('Заказ оформлен')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            errors: [{
                                                type: 'count',
                                                comment: 'Не удалось купить товар'
                                            }]
                                        })
                                    })
                                }
                                else {
                                    console.log(err);
                                        res.status(500).json({
                                            errors: [{
                                                type: 'count',
                                                comment: 'Не удалось купить товар'
                                            }]
                                        })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: [{
                                        type: 'sequalize',
                                        comment: 'Не удалось оформить заказ'
                                    }]
                                })
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                errors: [{
                                    type: 'sequalize',
                                    comment: 'Не удалось оформить заказ'
                                }]
                            })
                        })
                    }
                    else {
                        errors.push({
                            type: 'password',
                            comment: 'Неверный пароль'
                        })
                        res.status(401).json({
                            errors: errors
                        })
                    }
                })
            }
        })
        .catch(error => {
            console.log(error);
            errors.push({
                type: 'password',
                comment: 'Не удалось получить доступ к аккаунту пользователя'
            })
            res.status(401).json({
                errors: errors
            })
        })
})

module.exports = managerAPI