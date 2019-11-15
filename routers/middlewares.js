const routes = require("../routers");

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
    {
        next();
    }
    else 
    {
        res.status(403).send('please Sign Up');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect(routes.home);
    }
}