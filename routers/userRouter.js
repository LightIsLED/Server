const express = require("express");
const routes = require("../routers");
const router = express.Router();

router.get(routes.user, (req, res) => {
    res.render('profile');
});

module.exports = router;