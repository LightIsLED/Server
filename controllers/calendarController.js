const {Schedule} = require("../models");

const calendar = (req, res) => {res.render("calendar");};
const calendarDetail =  async (req, res) => {
    try{
        const date = new Date(req.params.date).getDate();
        console.log(date);
        const alarmList = await Schedule.findAll({
            where: {
                userID: req.session.user.userID,
                startDate: {lte: date},
                endDate: {gte: date}
            },
            attributes: ["scheID","scheName","dose","startDate","endDate","scheHour","scheMin"]
        });
        res.render("calendar",{
        alarmList: "Hello"
        });
    }catch(error)
    {
        console.error(error);
        return next(error);
    }
};
const alarmDetail = (req, res) => {};
const alarmRecord = (req, res) => {};

module.exports = {
    calendar,
    calendarDetail,
    alarmDetail,
    alarmRecord
};
