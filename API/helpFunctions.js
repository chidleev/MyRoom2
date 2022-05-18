const db = require('../dataBase/models')
const globalVars = require('../globalVars.json')

module.exports.checkIsLogin = function(req, res, next) {
    if (req.signedCookies.token) {
        db.Users.findOne({
            where: { token: req.signedCookies.token }
        })
        .then(user => {
            if (user) {
                next()
            }
            else {
                res.status(401).clearCookie('token').json({
                    errors: [{
                        type: 'authentification',
                        comment: 'Необходимо войти в личный аккаунт'
                    }]
                })
            }
        })
    }
    else {
        res.status(401).clearCookie('token').json({
            errors: [{
                type: 'authentification',
                comment: 'Необходимо войти в личный аккаунт'
            }]
        })
    }
}

module.exports.checkIsAdmin = function(req, res, next) {
    if (req.signedCookies.token) {
        db.Users.findeOne({
            where: {token: req.signedCookies.token}
        })
        .then(user => {
            if (user.roleUUID == globalVars.adminRoleUUID) {
                next()
            }
            else {
                res.status(403).json({
                    errors: [{
                        type: 'authorization',
                        comment: 'У Вас недостаточно прав'
                    }]
                })
            }
        })
    }
    else {
        res.status(401).clearCookie('token').json({
            errors: [{
                type: 'authentification',
                comment: 'Необходимо войти в личный аккаунт'
            }]
        })
    }
}

module.exports.checkIsAccountant = function(req, res, next) {
    if (req.signedCookies.token) {
        db.Users.findeOne({
            where: {token: req.signedCookies.token}
        })
        .then(user => {
            if (user.roleUUID == globalVars.accountantRoleUUID) {
                next()
            }
            else {
                res.status(403).json({
                    errors: [{
                        type: 'authorization',
                        comment: 'У Вас недостаточно прав'
                    }]
                })
            }
        })
    }
    else {
        res.status(401).clearCookie('token').json({
            errors: [{
                type: 'authentification',
                comment: 'Необходимо войти в личный аккаунт'
            }]
        })
    }
}

module.exports.checkIsManager = function(req, res, next) {
    if (req.signedCookies.token) {
        db.Users.findeOne({
            where: {token: req.signedCookies.token}
        })
        .then(user => {
            if (user.roleUUID == globalVars.managerRoleUUID) {
                next()
            }
            else {
                res.status(403).json({
                    errors: [{
                        type: 'authorization',
                        comment: 'У Вас недостаточно прав'
                    }]
                })
            }
        })
    }
    else {
        res.status(401).clearCookie('token').json({
            errors: [{
                type: 'authentification',
                comment: 'Необходимо войти в личный аккаунт'
            }]
        })
    }
}