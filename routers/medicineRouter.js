const express = require('express');
const router = express.Router()
const routers = require('../routers')
const {Schedule, Medicine, User} = require('../models');

router.post(routers.addition, async(req, res, next) => {
    try {
        while(req.body.medicineName.hasNext()){
            const medicine = await Medicine.findOrCreate({
                where: {medicineName: req.body.medicineName},
                defaults: {dose: req.body.dose}
            });
            const time = req.body.time;
            console.log(time);
        //     const schedule = await Schedule.create({
        //         userID: req.user.userID,
        //         medicineID: medicine.medicineID,
        //         dose: medicine.dose,//여러 개라서 주의
        //         scheName: req.body.scheName,
        //         startDate: req.body.startDate,
        //         endDate: req.body.endDate,
        //         scheHour: ,
        //         scheMin: ,
        // });
        }
        
    res.redirect(routers.medicines);
    } catch(error) {
        console.error(error);
        next(error);
    }
    res.send('inserting alarm info...');
});

router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
    });
});

module.exports = router;