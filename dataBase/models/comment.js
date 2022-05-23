module.exports = (client, Sequelize, DataTypes) => {
    const Comment = client.define("Comment", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        productRate: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },
        selfRate: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0,
            get() {
                return this.getDataValue('selfRate') / this.rateCount
            },
            set(value) {
                this.setDataValue('selfRate', this.selfRate + value);
            }
        },
        rateCount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'postedAt'
    });
    return Comment;
};