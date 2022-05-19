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
        madeIn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
        widthSize: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        lengthSize: {
            type: DataTypes.DOUBLE(3, 2),
            allowNull: false
        },
        heightSize: {
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