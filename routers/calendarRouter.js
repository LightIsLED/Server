const { calendarDetail, alarmDetail, alarmRecord } = require("../controllers/calendarController");

const express = require("express");
const router = express.Router();

// "/{date}" 부분에 대한 고민 필요
// 지원 생각 : {date} 없애고 date을 그냥 get의 params로 전해주는 방법도 있을 듯!

router.get("/{date}", calendarDetail); //해당일 복약 일정 전체 보기
router.get("/{date}/:id/alarm", alarmDetail); //해당일 개별 약 알람 보기 -> id = 약id
router.post("/{date}/:id/alarm", alarmRecord); //해당일 개별 약 알람 기록 : 건너뜀/재알람/먹음 -> id = 약id

module.exports = router;
