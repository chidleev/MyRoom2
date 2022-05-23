/* Нужен для получения HTML текста */
const userValidators = require('./validators')
const fs = require('fs')

const defaultPages = ['about', 'mainCatalog', 'catalog', 'product', 'login', 'signup']

const loggedPages = ['profile', 'basket']
const adminPages = ['categoryAdm', 'commentAdm', 'employeeAdm', 'productAdm', 'profile']
const accountantPages = []
const managerPages = []

const components = ['searchLine']

const express = require('express')
const sendHtmlAPI = express()

sendHtmlAPI.get('/', (req, res) => {
    res.send("GetHtml api work")
})

sendHtmlAPI.get('/default', (req, res) => {
    pages = {}
    defaultPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/default/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtmlAPI.get('/logged', (req, res) => {
    pages = {}
    loggedPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/logged/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtmlAPI.get('/components', (req, res) => {
    pages = {}
    components.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/components/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})

sendHtmlAPI.get('/admin', userValidators.checkIsAdmin, (req, res) => {
    pages = {}
    adminPages.forEach((fileName) => {
        pages[fileName] =  fs.readFileSync(`./pages/admin/${fileName}.html`, 'utf8')
    })
    res.json(pages)
})


module.exports = sendHtmlAPI