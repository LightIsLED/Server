const socketIO = require("socket.io");
var {Schedule} = require("./models");
var moment = require("moment");
var schedule = require("node-schedule");
var alarmList = [];

module.exports = (server) => {
    const io = socketIO(server, {path: '/socket.io'});
    io.on('connection', (socket)=>{
        const req = socket.request;
        console.log("Start connection!");
        socket.on('alarm_register', async ()=>{
            try{
                console.log("push alarm to alarmList");
                await Schedule.findAll({
                    where :{
                        userID: req.session.user.userID,
                        intake: 0
                    },
                    attributes: ["scheID","scheName","scheDate","scheHour","scheMin"]
                }).then(schedules =>{
                    alarmList = [];
                    for(schedule of schedules)
                    {
                        const time = new Date(schedule.scheDate,schedule.scheHour,schedule.scheMin);
                        alarmList.push({id: schedule.scheID, name: schedule.scheName, time: time});
                    }
                    alarmList.sort((a,b) =>{
                        return new Date(b.date) - new Date(a.date);
                    });
                });                
                console.log(alarmList);
            }catch(error){
                console.log(error);
            }   
        });

        if(alarmList.length)
        {
            schedule.scheduleJob(alarmList[0].time,()=>{
                var msg = {
                    scheID: alarmList[0].id,
                    scheName: alarmList[0].name,
                    scheTime: alarmList[0].time
                };
                io.to(id).emit('alarm', msg);
                alatmList.shift();
            });
        }
    });
};