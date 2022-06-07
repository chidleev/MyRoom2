/*
•	Возможность регестрироваться и логиниться
•	Возможность просматривать товары в корзине
•	Возможность покупать мебель
•	Возможность ставить оценку мебели и комментировать ее
•	Возможность просматривать историю посещений карточек товаров (localStorage)
если товара нет на складе, то формирует заявку
*/
const validator = require('validator')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const db = require("../dataBase/models")
const globalVars = require('../globalVars.json')

const usersValidators = require('./validators')

const express = require('express');
const user = require('../dataBase/models/user');
const userAPI = express()

userAPI.get('/', (req, res) => {
    res.send("User api work")
})

userAPI.post('/checkLogin', (req, res) => {
    const errors = []

    if (!Boolean(req.body.login)) {
        errors.push({
            type: 'login',
            comment: 'Вы не ввели логин'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.findOne({
        where: { login: req.body.login }
    })
        .then(user => {
            if (user == null) {
                res.sendStatus(200)
            }
            else {
                errors.push({
                    type: 'login',
                    comment: 'Пользователь с таким логином уже существует'
                })
                res.status(422).json({
                    errors: errors
                })
            }
        })
})

userAPI.post('/signup', (req, res) => {
    const errors = []

    if (!Boolean(req.body.login)) {
        errors.push({
            type: 'login',
            comment: 'Вы не ввели логин'
        })
    }

    if (!Boolean(req.body.password)) {
        errors.push({
            type: 'password',
            comment: 'Вы не ввели пароль'
        })
    }

    if (!Boolean(req.body.name)) {
        errors.push({
            type: 'name',
            comment: 'Вы не ввели свое имя'
        })
    }

    if (!Boolean(req.body.email)) {
        errors.push({
            type: 'email',
            comment: 'Вы не ввели свою электронную почту'
        })
    }
    else if (!validator.isEmail(req.body.email)) {
        errors.push({
            type: 'email',
            comment: 'Вы ввели некорректную электронную почту'
        })
    }

    if (Boolean(req.body.phone) && !validator.isMobilePhone(req.body.phone)) {
        errors.push({
            type: 'phone',
            comment: 'Вы ввели некорректный номер телефона'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.create({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })
        .then(user => {
            res.sendStatus(201)
        })
        .catch(error => {
            console.log(error);
            errors.push({
                type: 'login',
                comment: 'Ошибка базы данных: мы не смогли Вас зарегестрировать'
            })
            res.status(400).json({
                errors: errors
            })
        })
})

userAPI.post('/login', (req, res) => {
    const errors = []

    if (!Boolean(req.body.login)) {
        errors.push({
            type: 'login',
            comment: 'Вы не ввели логин'
        })
    }
    if (!Boolean(req.body.password)) {
        errors.push({
            type: 'password',
            comment: 'Вы не ввели пароль'
        })
    }

    if (errors.length > 0) {
        res.status(422).json({
            errors: errors
        })
        return
    }

    db.Users.findOne({
        where: { login: req.body.login }
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
                bcrypt.compare(req.body.password, user.password).then(success => {
                    if (success) {
                        const token = uuidv4()
                        db.Tokens.create({ value: token })
                            .then(dbToken => {
                                dbToken.setUser(user)
                                    .then(dbToken => {
                                        res.cookie('token', token, {
                                            signed: true,
                                            maxAge: 604800000
                                        }).json((user.roleUUID == globalVars.userRoleUUID) ? false : true)
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        errors.push({
                                            type: 'login',
                                            comment: 'Ошибка базы данных: мы не смогли Вас аутентифицировать'
                                        })
                                        res.status(401).json({
                                            errors: errors
                                        })
                                    })
                            })
                            .catch(error => {
                                console.log(error);
                                errors.push({
                                    type: 'login',
                                    comment: 'Ошибка базы данных: мы не смогли Вас аутентифицировать'
                                })
                                res.status(401).json({
                                    errors: errors
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
            console.error(error);
        })
})

userAPI.use(usersValidators.isLogged)

userAPI.get('/checkRole', (req, res) => {
    db.Tokens.findOne({
        where: { value: req.signedCookies.token }
    })
        .then(token => {
            if (token) {
                token.getUser()
                    .then(user => {
                        switch (user.roleUUID) {
                            case "56de4ebc-c616-496f-8666-a45232a900eb":
                                res.send('admin')
                                break;
                            case "5757484e-79e0-4a4d-a8c9-c7a08b9137fc":
                                res.send('accountant')
                                break;
                            case "cc8554cb-d9c7-44e9-9c68-6ab2caac61e9":
                                res.send('manager')
                                break;
                            default:
                                res.send('user')
                                break;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.send('user')
                    })
            }
            else {
                res.send('user')
            }
        })
})

userAPI.get('/info', (req, res) => {
    db.Tokens.findOne({
        where: { value: req.signedCookies.token }
    })
        .then(token => {
            if (token) {
                token.getUser()
                    .then(user => {
                        user.getComments()
                            .then(comments => {
                                res.status(200).json({
                                    userData: {
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone,
                                        photoURL: user.photoURL
                                    },
                                    comments: comments
                                })
                            })
                            .catch(error => {
                                res.status(404).clearCookie('token').json({
                                    errors: [{
                                        type: 'authentification',
                                        comment: 'Не удалось получить ваши коментарии'
                                    }]
                                })
                            })
                    })
                    .catch(error => {
                        res.status(404).clearCookie('token').json({
                            errors: [{
                                type: 'authentification',
                                comment: 'Не удалось получить ваши данные'
                            }]
                        })
                    })
            }
            else {
                res.status(404).clearCookie('token').json({
                    errors: [{
                        type: 'authentification',
                        comment: 'В нашей базе данных Вы числитесь как неаутентифицированный пользователь'
                    }]
                })
            }
        })
})

userAPI.post('/toggleFavorite', (req, res) => {
    db.Tokens.findOne({
        where: { value: req.signedCookies.token }
    })
        .then(token => {
            if (token) {
                token.getUser()
                    .then(user => {
                        user.getBasketOrders({
                            where: {
                                ProductUuid: req.body.productUuid,
                                status: 0
                            }
                        })
                            .then(orders => {
                                if (!orders.length) {
                                    db.BasketOrders.create({
                                        status: 0
                                    })
                                        .then(order => {
                                            order.setUser(user.uuid)
                                                .then(order => {
                                                    order.setProduct(req.body.productUuid)
                                                        .then(order => {
                                                            res.send("Добавлено в избранное")
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                            res.status(500).json({
                                                                errors: [{
                                                                    type: 'order',
                                                                    comment: 'Не удалось добавить продукт в избранное (5)'
                                                                }]
                                                            })
                                                        })
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    res.status(500).json({
                                                        errors: [{
                                                            type: 'order',
                                                            comment: 'Не удалось добавить продукт в избранное (4)'
                                                        }]
                                                    })
                                                })
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                errors: [{
                                                    type: 'order',
                                                    comment: 'Не удалось добавить продукт в избранное (3)'
                                                }]
                                            })
                                        })
                                }
                                else {
                                    user.removeBasketOrders(orders)
                                        .then(user => {
                                            res.send('Удалено из избранного')
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                errors: [{
                                                    type: 'order',
                                                    comment: 'Не удалось удалить продукт из избранного'
                                                }]
                                            })
                                        })
                                }

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: [{
                                        type: 'user',
                                        comment: 'Не удалось добавить продукт в избранное (2)'
                                    }]
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            errors: [{
                                type: 'order',
                                comment: 'Не удалось добавить продукт в избранное (1)'
                            }]
                        })
                    })
            }
            else {
                res.status(404).clearCookie('token').json({
                    errors: [{
                        type: 'authentification',
                        comment: 'В нашей базе данных Вы числитесь как неаутентифицированный пользователь'
                    }]
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'token',
                    comment: 'Не удалось добавить продукт в избранное (0)'
                }]
            })
        })
})

userAPI.get('/getFavorite', (req, res) => {
    db.Tokens.findOne({
        where: { value: req.signedCookies.token }
    })
        .then(token => {
            if (token) {
                token.getUser()
                    .then(user => {
                        user.getBasketOrders({
                            where: {
                                status: 0
                            },
                            attributes: {
                                exclude: ['UserUuid']
                            },
                            include: [db.Products]
                        })
                            .then(orders => {
                                res.json(orders)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    errors: [{
                                        type: 'orders',
                                        comment: 'Не удалось получить избранное'
                                    }]
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            errors: [{
                                type: 'user',
                                comment: 'Не удалось получить избранное'
                            }]
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errors: [{
                    type: 'token',
                    comment: 'Не удалось получить избранное'
                }]
            })
        })
})

userAPI.get('/logout', (req, res) => {
    db.Tokens.destroy({
        where: { value: req.signedCookies.token }
    })
        .then(result => {
            res.clearCookie('token').sendStatus(200)
        })
        .catch(error => {
            res.status(503).json({
                errors: [{
                    type: 'authentification',
                    comment: 'Мы не смогли отметить Вас в своей базе данных как неаутентифицированный пользователь'
                }]
            })
        })
})

module.exports = userAPI