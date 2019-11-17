const { userDetail, userUpdate } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/:id", userDetail); // profile 보기
router.post("/:id/edit", userUpdate); //profile 수정

module.exports = router;
