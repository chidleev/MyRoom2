/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/

const checkIsAdmin = require('./helpFunctions').checkIsAdmin
const express = require('express')

const adminAPI = express()

adminAPI.use(checkIsAdmin)

adminAPI.get('/', (req, res) => {
    res.send("Admin api work")
})

/*adminAPI.get('/create/category/:name', (req, res) => {
    controller.Category.create({name: req.params.name}).then(result => {
        res.send(result)
    })
})*/

module.exports = adminAPI