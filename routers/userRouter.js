const express = require("express");
const routes = require("../routers");
const userRouter = express.Router();
const {isLoggedIn} = require("../routers/middlewares");
const {profile} = require("../controllers/userController");

router.get(routes.user, isLoggedIn, (req, res) => {
    res.render('profile');
});

module.exports = userRouter;