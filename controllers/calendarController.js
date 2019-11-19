const {Schedule} = require("../models");
const {Op} = require("sequelize");

const calendar = (req, res) => {res.render("calendar");};
const calendarDetail =  async (req, res) => {
    try{
        req.session.user.userID = 45; //나중에 지울 것 이건 테스트를 위한 거니까
        const today = new Date();
        const dateString = String(today.getFullYear())+"-"+String(today.getMonth()+1)+"-"+req.params.date;
        const date = new Date(dateString);
        const alarmList = await Schedule.findAll({
            where: {
                userID: req.session.user.userID,
                startDate: {[Op.lte]: date},
                endDate: {[Op.gte]: date}
            },
            attributes: ["scheID","scheName","dose","scheHour","scheMin"]
        }).then(result =>{
            const alarmInfo = [];
            for (let schedule of result)
            {
                var scheInfo = schedule.dataValues.scheName+" "+schedule.dataValues.scheHour+":"+schedule.dataValues.scheMin;
                alarmInfo.push([scheInfo,schedule.dataValues.scheID])
            }
            return(alarmInfo);
        });
        console.log(alarmList);
        res.render("calendar",{
        userDate: req.params.date,
        alarmList: alarmList
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
};
const alarmDetail = (req, res) => {
    res.render("alarmDetail");
};
const alarmRecord = (req, res) => {};

module.exports = {
    calendar,
    calendarDetail,
    alarmDetail,
    alarmRecord
};
