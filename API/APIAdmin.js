/*
•   Возможность добавлять / убирать работников магазина
•	Возможность добавлять / убирать карточки товаров
•	Возможность добавлять / убирать категории товаров
•	Возможность удалять комментарии, нарушающие правила сайта
*/

const express = require('express')

const adminAPI = express()

/*adminAPI.use((req, res) => {
    isAdminCheck
})*/

adminAPI.get('/', (req, res) => {
    res.send("Admin api work")
})

module.exports = adminAPI