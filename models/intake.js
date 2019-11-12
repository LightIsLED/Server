module.exports = (sequelize, DataTypes) => {
    //실제로 user가 약을 복용했다고 입력했을 시 저장되는 테이블
    return sequelize.define('intake', {
        intakeID: {
            type: DataTypes.INTEGER(15),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        scheID: { 
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        intakeTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    },{
        timestamps: false,
    });
};