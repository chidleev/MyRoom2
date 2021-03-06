module.exports = (client, Sequelize, DataTypes) => {
    const Category = client.define("Category", {
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
        ENname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
    return Category;
};