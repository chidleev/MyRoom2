const db = require('../dataBase/models')
const globalVars = require('../globalVars.json')

module.exports.isLogged = function (req, res, next) {
    if (req.signedCookies.token) {
        db.Tokens.findOne({
            where: { value: req.signedCookies.token }
        })
            .then(token => {
                if (token) {
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
            .catch(err => {
                res.status(500).send("Пока мы проверяли, аутентифицированы ли Вы, произошла серьезная ошибка")
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

module.exports.isAdmin = function (req, res, next) {
    if (req.signedCookies.token) {
        db.Tokens.findOne({
            where: { value: req.signedCookies.token },
            include: [db.Users]
        })
            .then(token => {
                if (token.User.roleUUID == globalVars.adminRoleUUID) {
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

module.exports.isAccountant = function (req, res, next) {
    if (req.signedCookies.token) {
        db.Tokens.findOne({
            where: { value: req.signedCookies.token },
            include: [db.Users]
        })
            .then(user => {
                if (token.User.roleUUID == globalVars.accountantRoleUUID) {
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

module.exports.isManager = function (req, res, next) {
    if (req.signedCookies.token) {
        db.Tokens.findOne({
            where: { value: req.signedCookies.token },
            include: [db.Users]
        })
            .then(user => {
                if (token.User.roleUUID == globalVars.managerRoleUUID) {
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