/*
•	Возможность регестрироваться и логиниться
•	Возможность просматривать товары в корзине
•	Возможность покупать мебель
•	Возможность ставить оценку мебели и комментировать ее
•	Возможность просматривать историю посещений карточек товаров (localStorage)
*/
const validator = require('validator')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const controller = require("../dataBase/controllers")
const db = require("../dataBase/models")

const express = require('express')

const userAPI = express()

userAPI.get('/', (req, res) => {
    res.send("User api work")
})

userAPI.post('/check-login', (req, res) => {
    if (!validator.isEmpty(req.body.login)) {
        controller.User.findByLogin(req.body.login).then(user => {
            if (user == null) {
                res.json({
                    allowLogin: true
                })
            }
            else {
                res.json({
                    allowLogin: false,
                    comment: "Пользователь с таким логином уже существует"
                })
            }
        })
    }
    else {
        res.json({
            allowLogin: false,
            comment: "Вы не ввели логин"
        })
    }
})

userAPI.post('/signup', (req, res) => {
    const errors = []

    if (!Boolean(req.body.login)) {
        errors.push("Вы не ввели логин")
    }
    if (!Boolean(req.body.password)) {
        errors.push("Вы не ввели пароль")
    }
    if (!Boolean(req.body.name)) {
        errors.push("Вы не ввели свое имя")
    }
    if (!Boolean(req.body.email)) {
        errors.push("Вы не ввели свою электронную почту")
    }
    else if (!validator.isEmail(req.body.email)) {
        errors.push("Вы не ввели некорректную электронную почту")
    }
    if (Boolean(req.body.phone)) {
        if (!validator.isMobilePhone(req.body.phone)) {
            errors.push("Вы ввели некорректный номер телефона")
        }
    }
    
    if (errors.length > 0) {
        res.json({
            successful: false,
            errors: errors
        })
    }

    controller.User.create({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }).then(user => {
        res.json({
            successful: true,
            comment: "Вы успешно зарегестрировались"
        })
    }).catch(error => {
        res.json({
            successful: false,
            errors: error
        })
    })
})

userAPI.post('/login', (req, res) => {
    var haveError = false
    const error = {}

    if (!Boolean(req.body.login)) {
        haveError = true
        error.type = 'login'
        error.comment = 'Вы не ввели логин'
    }
    if (!Boolean(req.body.password)) {
        haveError = true
        error.type = 'password'
        error.comment = 'Вы не ввели пароль'
    }

    if (haveError) {
        res.json({
            successful: false,
            error: error
        })
    }

    controller.User.findByLogin(req.body.login).then(user => {
        if (user == null) {
            error.type = 'login'
            error.comment = 'Пользователя с таким логином не найдено'
            res.json({
                successful: false,
                error: error
            })
        }
        else {
            bcrypt.compare(req.body.password, user.password).then(success => {
                if (success) {
                    const token = uuidv4()
                    db.Users.update({ token: token }, {
                        where: { login: req.body.login }
                    }).then(user => {
                        res.json({
                            successful: true,
                            comment: 'Вы вошли в свой аккаунт',
                            token: token
                        })
                    }).catch(error => {
                        console.log(error)
                        res.json({
                            successful: false
                        })
                    })
                }
                else {
                    error.type = 'password'
                    error.comment = 'Неверный пароль'
                    res.json({
                        successful: false,
                        error: error
                    })
                }
            })
        }
    })
})

module.exports = userAPI