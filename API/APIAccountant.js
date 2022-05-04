/*
•	Возможность подтверждать доставку товаров на склад от поставщика
•	Возможность подтверждать получение оплаты за товар, изменяя его состояние в базе данных на «оплачено»
•	Возможность подтверждать отправку товара со склада потребителю, изменяя состояние этого товара на «продано»
*/

const express = require('express')

const accountantAPI = express()

accountantAPI.get('/', (req, res) => {
    res.send("Accountant api work")
})

module.exports = accountantAPI