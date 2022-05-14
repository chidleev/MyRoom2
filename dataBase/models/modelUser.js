const bcrypt = require('bcrypt')

module.exports = (client, Sequelize, DataTypes) => {
    const User = client.define("User", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        token: DataTypes.UUID
    }, {
        instanceMethods: {
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
    return User;
};