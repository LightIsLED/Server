const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);
const Op = Sequelize.Op;
const { Schedule, Medicine, MediSchedule } = require("../models");

const medicineList = async (req, res, next) => {
    var query = "SELECT MEDISCHEDULES.scheID, SCHEDULES.scheName, SCHEDULES.scheHour, SCHEDULES.scheMin, MEDISCHEDULES.medicineName, MEDISCHEDULES.dose FROM MEDISCHEDULES INNER JOIN SCHEDULES ON MEDISCHEDULES.scheID=SCHEDULES.scheID WHERE MEDISCHEDULES.scheID IN (SELECT scheID FROM SCHEDULES WHERE userID=:userID) ORDER BY MEDISCHEDULES.scheID";

    await sequelize.query(query, 
        {replacements: {userID: req.session.user.userID}, type: Sequelize.QueryTypes.SELECT}
    )
    .then((schedules) => {
        console.log(schedules);
        res.render("medicineList", {
            title: "Mediger-Main",
            user: req.session.user.userID,
            schedules: schedules,
        });
    })
    .catch((error) => {
        console.log(error);
        next(error);
    });
};

const addForm = (req, res, next) => {
    res.render("addForm", {
        title: "Mediger-AddAlarm",
        user: null,
    });
};

const medicineDetail = (req, res) => {
    res.render("medicineDetail");
};

const insertSchedule = async (req, res, next) => {
    console.log(req.body);
    try {
        let timeCount = 0;
        //loop for designated alarm time
        while (1) {
            //time이 23:00형식으로 받아지기 때문에, ':'을 기준으로 hour과 minute를 나누는 함수
            let time = timeSplit(req.body.time, timeCount);
            let mediCount = 0;
            console.log("hour: ", time[0], " minute: ", time[1]);
            let schedule = await Schedule.create({
                userID: req.session.user.userID,
                scheName: req.body.scheName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                scheHour: time[0],
                scheMin: time[1]
            });
            console.log("scheID", schedule["dataValues"]["scheID"]);
            //loop for medicine
            while (1) {
                //focus medicine과 dose를 담는 object
                let tempMedi = mediSelect(req.body.mediName, req.body.dose, mediCount);
                //medicine 이름이 DB에 있으면 select, 없으면 insert
                await Medicine.findOrCreate({
                    where: { medicineName: tempMedi.medicine },
                    attributes: ["medicineID", "medicineName"]
                }).spread( async(medicine) => {
                    MediSchedule.create({
                        medicineID: medicine.dataValues.medicineID,
                        scheID: schedule["dataValues"]["scheID"],
                        dose: tempMedi.dose,
                        medicineName: medicine.dataValues.medicineName,
                    });
                }).catch((error) => {
                    console.error(error);
                    next(error);
                });
                ;

                mediCount = mediCount + 1;
                if (
                    (typeof req.body.mediName === "object" &&
                        !req.body.mediName[mediCount]) ||
                    typeof req.body.mediName === "string"
                ) {
                    break;
                }
            }
            timeCount = timeCount + 1;
            if (
                (typeof req.body.time === "object" &&
                    !req.body.time[timeCount]) ||
                typeof req.body.time == "string"
            ) {
                break;
            }
        }
        res.redirect('/medicines');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateMedicine = (req, res) => {};

const deleteMedicine = (req, res) => {};

function timeSplit(time, timeCount){
    //만약 시간을 하나만 설정했으면 object가 아니라 string type으로 받아짐.
    if(typeof(time)==='string')
        return time.split(":");
    //시간이 여러개일 경우
    else if(typeof(time)==='object')
        return time[timeCount].split(":");
}

function mediSelect(medicine, dose, mediCount){
    var result = new Object();
    //약을 하나만 입력했을 경우, object type이 아니라 string type으로 입력받아짐.
    if(typeof(medicine)==='string'){
        result.medicine = medicine;
        result.dose = dose;
        return result;
    }
    //약을 여러개 기입했을 경우, object type으로 입력받아짐.
    else if(typeof(medicine)==='object'){
        result.medicine = medicine[mediCount];
        result.dose = dose[mediCount];
        return result;
    }
}

module.exports = {
    medicineList,
    addForm,
    medicineDetail,
    insertSchedule,
    updateMedicine,
    deleteMedicine
};
