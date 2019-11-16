const express = require('express');
const router = express.Router();
const routers = require('../routers');

router.get(routers.home, (req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
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