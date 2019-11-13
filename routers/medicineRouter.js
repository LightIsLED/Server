const express = require('express');
const router = express.Router()

router.post('/addMedi', (req, res) => {
    
});

router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
    });
});

module.exports = router;