const express = require('express')

const getDataAPI = require('./APIgetData')
const getHtmlAPI = require('./APIgetHTML')

const userAPI = require('./APIUser')
const adminAPI = require('./APIAdmin')
const accountantAPI = require('./APIAccountant')
const managerAPI = require('./APIManager')


const mainAPI = express()

mainAPI.use('/getdata', getDataAPI)

mainAPI.use('/gethtml', getHtmlAPI)

mainAPI.use('/user', userAPI)

mainAPI.use('/admin', adminAPI)

mainAPI.use('/accountant', accountantAPI)

mainAPI.use('/manager', managerAPI)


mainAPI.get('/', (req, res) => {
    res.send("Main API work")
})

module.exports = mainAPI