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

const usersValidators = require('./validators')

const express = require('express');
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
                                        }).sendStatus(200)
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