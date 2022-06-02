/* Нужен для получения HTML текста */
const userValidators = require('./validators')
const fs = require('fs')

const defaultPages = ['about', 'mainCatalog', 'catalog', 'product', 'login', 'signup']

const loggedPages = ['profile', 'basket']
const adminPages = ['categoryAdm', 'commentAdm', 'employeeAdm', 'productAdm', 'profileAdm']
const accountantPages = []
const managerPages = []

const components = ['searchLine', 'productCard']

const sendHtml = {}

const express = require('express')
sendHtml.app = express()

sendHtml.app.get('/', (req, res) => {
    res.send("GetHtml api work")
})

sendHtml.app.get('/default', (req, res) => {
    pages = {}
    defaultPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./public/pages/default/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtml.app.get('/logged', (req, res) => {
    pages = {}
    loggedPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./public/pages/logged/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtml.app.get('/components', (req, res) => {
    pages = {}
    components.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./public/pages/components/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtml.app.get('/admin', userValidators.isAdmin, (req, res) => {
    pages = {}
    adminPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./public/pages/admin/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})


module.exports = sendHtml