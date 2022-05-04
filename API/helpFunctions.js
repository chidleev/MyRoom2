const checkIsAdmin = function(req, res, next) {
    console.log("Its admin");
    next()
}

const checkIsAccountant = function(req, res, next) {
    next()
}

const checkIsManager = function(req, res, next) {
    next()
}

const checkIsLogin = function(req, res, next) {
    next()
}

module.exports = {
    checkIsAdmin,
    checkIsAccountant,
    checkIsManager,
    checkIsLogin
}