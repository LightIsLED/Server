const express = require("express");
const routes = require("../routers");
const userRouter = express.Router();
const {isLoggedIn} = require("../routers/middlewares");
const {profile} = require("../controllers/userController");

router.get(routes.user, isLoggedIn, profile);

module.exports = userRouter;