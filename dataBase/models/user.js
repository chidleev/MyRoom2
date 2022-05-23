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
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(8)));
            }
        },
        roleUUID: {
            type: DataTypes.UUID,
            defaultValue: "00000000-0000-0000-0000-000000000000"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: DataTypes.STRING,
        photoURL: DataTypes.STRING
    }, {});
    return User;
};