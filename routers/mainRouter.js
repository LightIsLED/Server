const express = require('express');
const routes = require("../routers");
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require("../routers/middlewares");
const passport = require("passport");
const bcrypt = require("bcrypt");
const {user} = require("../models");

router.get('/addAlarm', (req, res) => {
    res.render('alarm', {
        title: 'Mediger-MediInput', 
        user: null,
    });
})

router.get(routes.home,(req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
    });
});

router.get(routes.join, isNotLoggedIn, async (req, res, next) => {
    const {name, birthday, sex} = req.body;
    res.render('join',{
        user: req.user,
        joinError: req.flash('joinError')
    });
});

router.get(routes.calendar,isLoggedIn, (req, res, next) => {
    res.render('calendar', {
        user: req.user,
        loginError: req.flash('loginError')
    });
});

module.exports = router; 