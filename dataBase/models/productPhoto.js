module.exports = (client, Sequelize, DataTypes) => {
    const ProductPhoto = client.define("ProductPhoto", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            unique: true
        },
        publicID: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    return ProductPhoto;
};