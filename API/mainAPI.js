const helpFunctions = require('./helpFunctions')

const getDataAPI = require('./APIgetData')
const getHtmlAPI = require('./APIgetHTML')

const userAPI = require('./APIUser')
const adminAPI = require('./APIAdmin')
const accountantAPI = require('./APIAccountant')
const managerAPI = require('./APIManager')

const express = require('express')
const mainAPI = express()

mainAPI.use('/getdata', getDataAPI)

mainAPI.use('/gethtml', getHtmlAPI)

mainAPI.use('/user', userAPI)

mainAPI.use('/admin', helpFunctions.checkIsAdmin, adminAPI)

mainAPI.use('/accountant', helpFunctions.checkIsAccountant, accountantAPI)

mainAPI.use('/manager', helpFunctions.checkIsManager, managerAPI)

mainAPI.get('/', (req, res) => {
    res.send("Main API work")
})

module.exports = mainAPI