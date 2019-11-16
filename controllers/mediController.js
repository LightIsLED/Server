const { Schedule, Medicine, User } = require("../models");

const insertMedicine = async (req, res, next) => {
    console.log(req.body);
    try {
        let timeCount = 0;
        //loop for designated alarm time
        while (1) {
            //time이 23:00형식으로 받아지기 때문에, ':'을 기준으로 hour과 minute를 나누는 함수
            let time = timeSplit(req.body.time, timeCount);
            let mediCount = 0;
            console.log("hour: ", time[0], " minute: ", time[1]);
            //loop for medicine
            while (1) {
                //focus medicine과 dose를 담는 object
                let tempMedi = mediSelect(
                    req.body.mediName,
                    req.body.dose,
                    mediCount
                );
                //medicine 이름이 DB에 있으면 select, 없으면 insert
                await Medicine.findOrCreate({
                    where: { medicineName: tempMedi.medicine },
                    defaults: { dose: tempMedi.dose },
                    attributes: ["medicineID"]
                }).spread(medicine => {
                    Schedule.create({
                        userID: 1,
                        medicineID: medicine.dataValues.medicineID,
                        dose: tempMedi.dose,
                        scheName: req.body.scheName,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                        scheHour: time[0],
                        scheMin: time[1]
                    });
                });

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
        res.redirect(routers.medicines);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const medicineList = (req, res, next) => {
    res.render("home", {
        title: "Mediger-Main",
        user: null
    });
};

const medicineDetail = (req, res) => {};

const updateMedicine = (req, res) => {};

const deleteMedicine = (req, res) => {};

module.exports = {
    medicineList,
    medicineDetail,
    insertMedicine,
    updateMedicine,
    deleteMedicine
};
