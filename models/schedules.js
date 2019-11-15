module.exports = (sequelize, DataTypes) => {
    return sequelize.define('schedule', {
        scheID: { 
            type: DataTypes.INTEGER(15),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        scheName: {
            type: DataTypes.STRING(50),
        },
        userID: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        medicineID: {
            type: DataTypes.INTEGER(15),
            allowNull: true,
        },
        dose: {
            type: DataTypes.STRING(50),
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE, 
            allowNull: false,
        },
        scheHour: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
        },
        scheMin: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    },{
        timestamps: false,
    });
};