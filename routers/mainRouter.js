const express = require('express');
const router = express.Router();
const routers = require('../routers');

router.get(routers.addition, (req, res) => {
    res.render('alarm', {
        title: 'Mediger-MediInput', 
        user: null,
    });
})

router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
    });
});

module.exports = router; 