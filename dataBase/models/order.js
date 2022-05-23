module.exports = (client, Sequelize, DataTypes) => {
    const Order = client.define("Order", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        daliveryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Order;
};