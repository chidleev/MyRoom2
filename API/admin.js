/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'myroom-shop',
    api_key: '714496323915627',
    api_secret: 'iKbZqzFTnkf7R3wf4dJgWSQICkk'
})

const checkIsAdmin = require('./validators').isAdmin

const express = require('express')
const adminAPI = express()

adminAPI.use(checkIsAdmin)

adminAPI.get('/', (req, res) => {
    res.send("Admin api work")
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