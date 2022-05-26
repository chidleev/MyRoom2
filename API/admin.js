/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/

const axios = require("axios");
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'myroom-shop',
    api_key: '714496323915627',
    api_secret: 'iKbZqzFTnkf7R3wf4dJgWSQICkk'
})

const checkIsAdmin = require('./validators').isAdmin

const express = require('express');
const db = require("../dataBase/models");
const adminAPI = express()

adminAPI.use(checkIsAdmin)

adminAPI.get('/', (req, res) => {
    res.send("Admin api work")
})

adminAPI.put('/category', (req, res) => {
    if (!Boolean(req.body.name)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не ввели название категории'
            }]
        })
        return
    }

    const options = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: { lang: 'ru-en', text: req.body.name },
        headers: {
            'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
            'X-RapidAPI-Key': 'a8ea586244msh121b4cdebf777bcp11a0f8jsnb0cdb21a2f3f'
        }
    };

    axios.request(options).then(response => {
        db.Categories.create({
            name: req.body.name,
            ENname: response.data.text[0]
        })
            .then(category => {
                res.send('Категория успешно создана')
            })
            .catch(err => {
                res.status(500).json({
                    errors: [{
                        type: 'category',
                        comment: 'Не удалось создать категорию. Ошибка БД',
                        error: err
                    }]
                })
            })
    }).catch(function (error) {
        res.status(500).json({
            errors: [{
                type: 'category',
                comment: 'Не удалось создать категорию. Ошибка Translate API',
                error: error
            }]
        })
    });
})

adminAPI.patch('/category', (req, res) => {
    if (!Boolean(req.body.newName)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не ввели название категории'
            }]
        })
        return
    }

    const options = {
        method: 'GET',
        url: 'https://just-translated.p.rapidapi.com/',
        params: { lang: 'ru-en', text: req.body.newName },
        headers: {
            'X-RapidAPI-Host': 'just-translated.p.rapidapi.com',
            'X-RapidAPI-Key': 'a8ea586244msh121b4cdebf777bcp11a0f8jsnb0cdb21a2f3f'
        }
    };

    axios.request(options).then(response => {
        db.Categories.update({
            name: req.body.newName,
            ENname: response.data.text[0]
        }, {
            where: { uuid: req.body.uuid }
        })
            .then(category => {
                res.send('Название категории успешно обновлено')
            })
            .catch(err => {
                res.status(500).json({
                    errors: [{
                        type: 'category',
                        comment: 'Не удалось обновить название категории. Ошибка БД',
                        error: err
                    }]
                })
            })
    }).catch(function (error) {
        res.status(500).json({
            errors: [{
                type: 'category',
                comment: 'Не удалось обновить название категории. Ошибка Translate API',
                error: error
            }]
        })
    });
})

adminAPI.delete('/category', (req, res) => {
    if (!Boolean(req.body.uuids.length)) {
        res.status(422).json({
            errors: [{
                type: 'name',
                comment: 'Вы не выбрали категории'
            }]
        })
        return
    }

    db.Categories.destroy({
        where: {
            uuid: {
                [db.Op.or]: req.body.uuids
            }
        }
    })
    .then(result => {
        res.send('Выбранные категории удалены')
    })
    .catch(err => {
        res.status(500).json({
            errors: [{
                type: 'category',
                comment: 'Не удалось удалить категории. Ошибка БД',
                error: err
            }]
        })
    })
})


adminAPI.get('/uploadimg', (req, res) => {
    /*cloudinary.v2.uploader.upload(
        __dirname + '/../public/icons/up.svg',
        { public_id: "up" },
        function (error, result) {
            if (error) {

                res.json(error);
                return
            }
            res.json(result);
        });*/

    res.send(cloudinary.image('up'))
})

module.exports = adminAPI