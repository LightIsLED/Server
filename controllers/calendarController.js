const {Schedule,MediSchedule, Intake} = require("../models");
const {Op} = require("sequelize");

const calendar = (req, res) => {res.render("calendar");};
const calendarDetail =  async (req, res) => {
    try{
        req.session.user.userID = 1; //테스트를 위한 설정. userID 고정해두고 테스트하길 권장
        const today = new Date();
        console.log(today);
        const dateString = String(today.getFullYear())+"-"+String(today.getMonth()+1)+"-"+req.params.date;
        const dateString1 = String(today.getFullYear())+"-"+String(today.getMonth()+1)+"-"+String(parseInt(req.params.date)+1);
        const date = new Date(dateString);
        const date1 = new Date(dateString1);
        const alarmList =[];
        const alarmID = [];
        const color = [];
        await Schedule.findAll({
            where: {
                userID: req.session.user.userID,
                startDate: {[Op.lte]: date},
                endDate: {[Op.gte]: date}
            },
            attributes: ["scheID","scheName","scheHour","scheMin"]
        }).then(result =>{
            for (let schedule of result)
            {
                alarmID.push(schedule.dataValues.scheID);
                alarmList.push(schedule.dataValues.scheName);
                alarmList.push(schedule.dataValues.scheHour);
                alarmList.push(schedule.dataValues.scheMin);
            }
        });
        for(let item of alarmID)
        {
            const check = await Intake.findOne({
                where:{
                    scheID: item,
                    intakeTime: {[Op.gte]: date, [Op.lt]: date1} 
                }
            });
            if(check)
            {
                color.push("green");
            }
            else
            {
                color.push("gray");
            }
        }
        res.render("calendar",{
        userDate: req.params.date,
        alarmList: alarmList,
        alarmID: alarmID,
        color: color
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
};
const alarmDetail = async (req, res) => {
    try{
        const medicineList = [];
        const alarmName = await Schedule.findOne({
            where : {scheID: req.params.id},
            attributes: ["scheName","scheHour","scheMin"]
        });
        await MediSchedule.findAll({
            where:{scheID: req.params.id},
            attributes: ["medicineName"]
        }).then(result => {
            for(let mediSchedule of result)
            {
                medicineList.push(mediSchedule.dataValues.medicineName);
            }
        });
        res.render("alarmDetail",{
            alarmName: alarmName.dataValues.scheName,
            alarmTime: String(alarmName.dataValues.scheHour)+":"+String(alarmName.dataValues.scheMin),
            medicineList: medicineList,
            selectedDate: req.params.date,
            id: req.params.id
        });        
    }catch(error){
        console.error(error);
        return next(error);
    }
};
const alarmRecord =  async (req, res) => {
    const {check} = req.body;
    try{
        if(check === "green")
        {
            Intake.create({
                scheID: req.params.id
            });
        }
        res.redirect("/calendar/"+req.params.date);
    }catch(error){
        console.error(error);
        return next(error);
    }
};

module.exports = {
    calendar,
    calendarDetail,
    alarmDetail,
    alarmRecord
};
