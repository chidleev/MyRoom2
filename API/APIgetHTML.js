/* Нужен для получения HTML текста */

const express = require('express')
const path = require('path')
const fs = require('fs')

const getHtmlAPI = express()

getHtmlAPI.get('/', (req, res) => {
    res.send("GetHtml api work")
})

getHtmlAPI.get('/:pageName', (req, res) => {
    fs.readFile(`./pages/${req.params.pageName}.html`, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          res.sendStatus(404)
        }
        res.send(data)
    })
})

module.exports = getHtmlAPI