const validators = require('./validators')

const sendData = require('./sendData')
const sendHTML = require('./sendHTML')

const userAPI = require('./user')
const adminAPI = require('./admin')
const accountantAPI = require('./accountant')
const managerAPI = require('./manager')

const express = require('express')
const mainAPI = express()

mainAPI.use('/getdata', sendData.app)
mainAPI.use('/gethtml', sendHTML.app)

mainAPI.use('/user', userAPI)

mainAPI.use('/admin', validators.isAdmin, adminAPI)

mainAPI.use('/accountant', validators.isAccountant, accountantAPI)

mainAPI.use('/manager', validators.isManager, managerAPI)

mainAPI.get('/', (req, res) => {
    res.send("Main API work")
})

module.exports = mainAPI