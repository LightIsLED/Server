const express = require('express');
const routes = require("../routers");
const router = express.Router()
const {home, calendar, join} = require("../controllers/userController");
const {isLoggedIn, isNotLoggedIn} = require("../routers/middlewares");

router.get('/addAlarm', (req, res) => {
    res.render('alarm', {
        title: 'Mediger-MediInput', 
        user: null,
    });
})

router.get(routes.home,home);
router.get(routes.join, isNotLoggedIn, join);
router.get(routes.calendar,isLoggedIn, calendar);

module.exports = router; 