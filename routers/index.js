const express = require("express");
const authRouter = require("./authRouter");
const calendarRouter = require("./calendarRouter");
const userRouter = require("./userRouter");
const medicineRouter = require("./medicineRouter");

const router = express.Router();

// 일단 router 막아놨어 안 막으면 res 도달할때까지 계속 오류날 수 있어서
// 개발할 때 주석 하나씩 해제해서 테스트 해보세요

router.use("/", authRouter);
router.use("/calendar", calendarRouter);
//router.use("/users", userRouter);
router.use("/medicines", medicineRouter);

module.exports = router;
