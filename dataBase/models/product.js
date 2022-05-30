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
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        madeIn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materials: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        dimensions: {
            type: DataTypes.ARRAY(DataTypes.DOUBLE),
            allowNull: false
        },
        weight: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        warranty: DataTypes.INTEGER,
        count: DataTypes.INTEGER,
        description: DataTypes.TEXT
    });
    return Product;
  };