const express = require('express');
const routes = require("../routers");
const router = express.Router();
const {User} = require("../models");

router.get('/addAlarm', (req, res) => {
    res.render('alarm', {
        title: 'Mediger-MediInput', 
        user: null,
    });
})

router.get(routes.home,(req, res) => {
    if(req.session.user)
    {
        res.redirect(routes.calendar);
    }
    else
    {
        res.redirect(routes.join);
    }    
});

router.get(routes.join, (req,res) =>{
    res.render('join',{
    title: "join - Mediger",
    });
});

router.post(routes.join, async (req, res) => {
    const {name, birthDay, sex} = req.body;
    const birthDate = new Date(birthDay);
    try{
        await User.create({
            userName: name,
            birth: birthDay,
            sex: sex
        });
        const userId = await User.findOne({attributes: ['userId'], where: {userName: name, birth: birthDate}});
        req.session.user = {
            id: userId['dataValues']['userId']
        };
        res.redirect(routes.calendar);
    }catch(error){
        console.error(error);
        return next(error);
    }
    });

router.get(routes.calendar, (req, res, next) => {
    res.render('calendar', {
        title: "calender - Mediger",
    });
});

router.get(routers.medicines, (req, res) => {
    res.render('mediList', {

    });
});

router.get(routers.addForm, (req, res) => {
    res.render('addForm', {
        title: 'Mediger-MediInput', 
        user: null,
    });
})

module.exports = router; 