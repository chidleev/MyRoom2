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

module.exports = adminAPI