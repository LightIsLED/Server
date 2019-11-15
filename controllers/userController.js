var routes = require("../routers");

exports.home = (req, res, next) => {
    res.render('home', {
        title: 'Mediger-Main',
        user: null,
    });
};

exports.join = (req, res, next) => {
    res.render('join',{
        user: req.user,
        joinError: req.flash('joinError')
    });
};

exports.calendar = (req, res, next) => {
    res.render('calendar', {
        user: req.user,
        loginError: req.flash('loginError')
    });
};

exports.profile = (req, res) => {
    res.render('profile');
};
