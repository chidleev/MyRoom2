module.exports = (client, Sequelize, DataTypes) => {
    const Product = client.define("Product", {
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
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DOUBLE(6, 2),
            allowNull: false,
        },
        width: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        llength: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        height: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        weight: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        warranty: {
            type: DataTypes.INTEGER
        }
    });
    return Product;
  };