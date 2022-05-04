/* Нужен для получения данных из БД */
const categories = [
    { "id": 1,  "name":"Диваны" },
    { "id": 12, "name":"Кресла" },
    { "id": 34, "name":"Люстры" },
    { "id": 23, "name":"Столы"  },
    { "id": 4,  "name":"Кровати"},
    { "id": 8,  "name":"Шкафы"  }
]

const express = require('express')

const getDataAPI = express()
getDataAPI.use(express.json())
getDataAPI.use(express.urlencoded({ extended: true }))

getDataAPI.get('/', (req, res) => {
    res.send("GetData api work")
})

getDataAPI.get('/categories', (req, res) => {
    setTimeout(() => {
        res.json(categories)
    }, 5000)
})

module.exports = getDataAPI