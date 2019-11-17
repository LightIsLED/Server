const { getJoin, postJoin } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.get("/join", getJoin);
router.post("/join", postJoin);

module.exports = router;
