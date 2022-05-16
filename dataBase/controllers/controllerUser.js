const bcrypt = require('bcrypt')
const db = require("../models");
const User = db.Users;

exports.create = (user) => {
    return User.create({
        name: user.name,
        login: user.login,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(8)),
        email: user.email,
        phone: user.phone,
        token: null
    })
        .then((user) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
};

exports.findByUUID = (userUUID) => {
    return User.findByPk(userUUID)
        .then((user) => {
            return user;
        })
        .catch((err) => {
            onsole.log(">> Error while finding user: ", err);
        });
};

exports.findByToken = (token) => {
    return User.findOne({
        where: { token: token }
    })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            onsole.log(">> Error while finding user: ", err);
        });
};

exports.findByLogin = (login) => {
    return User.findOne({
        where: { login: login }
    })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            onsole.log(">> Error while finding user: ", err);
        });
};

exports.findAll = () => {
    return User.findAll()
        .then((user) => {
            return user;
        });
};

exports.login = (login) => {
    return User.update({
        token: db.Sequelize.UUIDV4
    }, {
        where: { login: login }
    })
        .then((user) => {
            return user;
        });
};

exports.logout = (login) => {
    return User.update({
        token: null
    }, {
        where: { login: login }
    })
        .then((user) => {
            return user;
        });
};