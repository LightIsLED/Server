const { calendar, calendarDetail, alarmDetail, alarmRecord } = require("../controllers/calendarController");

const express = require("express");
const router = express.Router();

router.get("", calendar);//기본 캘린더 페이지
router.get("/:date", calendarDetail); //해당 일자에 해당하는 알람 리스트 보여줌. req.params.date로 처리
router.get("/:date/:id", alarmDetail); //해당일 개별 알람에 대한 복용 여부 페이지 보여줌. id는 알람 id
router.post("/:date/:id/alarm", alarmRecord); //해당일 개별 약 알람 기록 : 건너뜀/재알람/먹음 -> id = 약id

module.exports = router;
