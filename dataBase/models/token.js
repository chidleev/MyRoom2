module.exports = (client, Sequelize, DataTypes) => {
    const Token = client.define("Token", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.UUID,
            unique: true
        }
    });
    return Token;
};