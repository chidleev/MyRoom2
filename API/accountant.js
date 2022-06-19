/*
•	Возможность подтверждать доставку товаров на склад от поставщика
•	Возможность подтверждать получение оплаты за товар, изменяя его состояние в базе данных на «оплачено»
•	Возможность подтверждать отправку товара со склада потребителю, изменяя состояние этого товара на «продано»
*/
const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx');
const checkIsAccountant = require('./validators').isAccountant

const db = require("../dataBase/models");

const express = require('express')

const accountantAPI = express()
accountantAPI.use(checkIsAccountant)

accountantAPI.get('/', (req, res) => {
    res.send("Accountant api work")
})

accountantAPI.get('/paymentOrders', (req, res) => {
    db.BasketOrders.findAll({
        where: { status: 2 },
        include: [{
            model: db.Users,
            attributes: ['name', 'phone', 'email']
        }, {
            model: db.Products,
            attributes: ['name', 'count', 'price']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить заказы'
                }]
            })
        })
})

accountantAPI.get('/deliveryOrders', (req, res) => {
    db.BasketOrders.findAll({
        where: { status: 3 },
        include: [{
            model: db.Users,
            attributes: ['name', 'phone', 'email']
        }, {
            model: db.Products,
            attributes: ['name', 'count', 'price']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить заказы'
                }]
            })
        })
})

accountantAPI.get('/shippingOrders', (req, res) => {
    db.Orders.findAll({
        include: [{
            model: db.Products,
            attributes: ['name'],
            include: [{
                model: db.Categories,
                attributes: ['ENname'],

            }]
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить заказы'
                }]
            })
        })
})

accountantAPI.get('/ordersToExcel', (req, res) => {
    db.Orders.findAll({
        include: [{
            model: db.Products,
            attributes: ['name'],
            include: [{
                model: db.Categories,
                attributes: ['name'],

            }]
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(orders => {
            const data = [];
            data.push([
                "ID заказа",
                "Дата заказа",
                "Дата Доставки",
                "ID Товара",
                "Название товара",
                "Количество"
            ])
            orders.forEach(order => {
                data.push([
                    order.uuid,
                    order.createdAt,
                    order.daliveryDate,
                    order.ProductUuid,
                    order.Product.name,
                    order.count
                ])
            })
            const sheetOptions = {'!cols': [{wch: 35}, {wch: 10}, {wch: 10}, {wch: 35}, {wch: 40}, {wch: 10}]};
            var buffer = xlsx.build([{ name: 'shippingOrders', data: data }], {sheetOptions});
            fs.writeFileSync('./uploads/shippingOrders.xlsx', buffer)
            res.sendFile(path.join(__dirname, '..', 'uploads', 'shippingOrders.xlsx'))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось получить заказы'
                }]
            })
        })
})

accountantAPI.post('/confirmPayment', (req, res) => {
    db.BasketOrders.update({ status: 3 }, {
        where: { uuid: req.body.orderUuid },
    })
        .then(result => {
            res.send("Оплата подтверждена")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось подтвердить оплату'
                }]
            })
        })
})

accountantAPI.post('/confirmDelivery', (req, res) => {
    db.BasketOrders.update({ status: 4 }, {
        where: { uuid: req.body.orderUuid },
    })
        .then(result => {
            res.send("Отправка подтверждена")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось подтвердить отправку'
                }]
            })
        })
})

accountantAPI.get('/updateProductsCounts', (req, res) => {
    db.Products.findAll()
        .then(products => {
            var upgratedProducts = 0
            products.forEach(product => {
                product.getOrders({
                    where: {
                        daliveryDate: {
                            [db.Op.lte]: Date.now()
                        }
                    }
                })
                    .then(orders => {
                        product.getBasketOrders({
                            where: {
                                status: {
                                    [db.Op.gte]: 2
                                }
                            }
                        })
                            .then(basketOrders => {
                                product.count = 0
                                orders.forEach(order => {
                                    product.count += order.count
                                })
                                product.count -= basketOrders.length
                                product.save()
                                    .then(result => {
                                        upgratedProducts += 1
                                        if (upgratedProducts == products.length) {
                                            res.send("Обновление завершено")
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            errors: [{
                                                type: 'sequalize',
                                                comment: 'Не удалось завершить обновление'
                                            }]
                                        })
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: [{
                                        type: 'sequalize',
                                        comment: 'Не удалось обновить товары (1)'
                                    }]
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            errors: [{
                                type: 'sequalize',
                                comment: 'Не удалось обновить товары (2)'
                            }]
                        })
                    })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'sequalize',
                    comment: 'Не удалось обновить товары (3)'
                }]
            })
        })
})

module.exports = accountantAPI