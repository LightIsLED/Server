const { home, getJoin, postJoin } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.get("/", home);
router.get("/join", getJoin);
router.post("/join", postJoin);

module.exports = router;
