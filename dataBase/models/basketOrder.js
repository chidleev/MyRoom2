module.exports = (client, Sequelize, DataTypes) => {
    const BasketOrder = client.define("BasketOrder", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return BasketOrder;
};