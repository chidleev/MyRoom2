/* Нужен для получения HTML текста */

const express = require('express')
const fs = require('fs')

const defaultPages = ['about', 'mainCatalog', 'catalog', 'product', 'login']
const loggedPages = ['profile', 'basket']
const adminPages = ['categories', 'comments', 'employees', 'products']

const components = ['searchLine']

const getHtmlAPI = express()

getHtmlAPI.get('/', (req, res) => {
    res.send("GetHtml api work")
})

getHtmlAPI.get('/default', (req, res) => {
    pages = {}
    defaultPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/default/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

getHtmlAPI.get('/logged', (req, res) => {
    pages = {}
    loggedPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/logged/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

getHtmlAPI.get('/components', (req, res) => {
    pages = {}
    components.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/components/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})


module.exports = getHtmlAPI