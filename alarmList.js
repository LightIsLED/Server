try{
    console.log("push alarm to alarmList ",data.userID);
    await Schedule.findAll({
        where :{
            userID: data.userID,
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
            return new Date(b.time) - new Date(a.time);
        });
    });                
    console.log(alarmList);
}catch(error){
    console.log(error);
}

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