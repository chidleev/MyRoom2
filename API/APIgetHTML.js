/* Нужен для получения HTML текста */

const express = require('express')

const getHtmlAPI = express()

getHtmlAPI.get('/', (req, res) => {
    res.send("GetHtml api work")
})

module.exports = getHtmlAPI