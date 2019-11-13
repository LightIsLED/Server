module.exports = (sequelize, DataTypes) => {
    return sequelize.define('schedule', {
        scheID: { 
            type: DataTypes.INTEGER(15),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        //개인이 설정한 알람별로 id increments
        //ex) User1이 아침/점심/저녁 일 3회 총 3일 먹으면
        //userScheID-1: 첫날 아침
        //userScheID-2: 첫날 점심
        //userScheID-9: 셋째날 저녁
        userScheID: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        medicineID: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
        },
        dose: {
            type: DataTypes.STRING(50),
        },
        scheName: {
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