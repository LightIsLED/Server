const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

const {Schedule} = require("../models");

const moment = require('moment');

const calendar = (req, res) => {
    res.render("calendar",{
    userDate: null,
    schedules: null
    });
}

const calendarDetail =  async (req, res) => {
    let dateString=moment().format('YYYY-MM-DD');
    if(req.params.date<0){
        var value = Math.abs(req.params.date);
        dateString = moment().subtract(value, 'd');
    }
    else if (req.params.date>0){
        dateString = moment().add(req.params.date, 'd');
    }
    console.log(dateString);
    await Schedule.findAll({
        where: {
            userID: req.session.user.userID,
            scheDate: Date.parse(dateString),
        },
        attributes: ["scheID","scheName","scheHour","scheMin", "scheDate", "intake"]
    }).then((schedule) => {
        console.log(schedule);
        res.render("calendar",{
            userDate: req.params.date,
            schedules: schedule
            });
    }).catch((error) => {
        console.error(error);
        next(error);    
    });
}   

const alarmDetail = async (req, res) => {
    var query="" + 
    "SELECT SCHEDULES.scheID, SCHEDULES.scheName, SCHEDULES.scheHour, SCHEDULES.scheMin, SCHEDULES.intake, SCHEDULES.scheDate, MEDISCHEDULES.medicineName, MEDISCHEDULES.dose " + 
    "FROM SCHEDULES JOIN MEDISCHEDULES ON SCHEDULES.scheID=MEDISCHEDULES.scheID " + 
    "WHERE SCHEDULES.scheID=:scheID";

    await sequelize.query(query, 
        {replacements: {scheID: req.params.scheID}, type: Sequelize.QueryTypes.SELECT}
    ).then((alarm) => {
        console.log(alarm);
        res.render("alarmDetail", {
            alarms: alarm
        });
    }).catch((error) => {
        console.error(error);
        next(error);
    });
}

const alarmRecord =  async (req, res) => {
    await Schedule.update({intake: true},{
        where: {
            scheID : req.body.scheID
        }
    }).then((schedule)=> {
        console.log(schedule);
        res.redirect("/calendar/"+req.params.date);
    }).catch(error=>{
        console.error(error);
        next(error);
    })
}

module.exports = {
    calendar,
    calendarDetail,
    alarmDetail,
    alarmRecord
};
