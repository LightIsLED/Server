const {
    medicineList,
    medicineDetail,
    insertMedicine,
    updateMedicine,
    deleteMedicine
} = require("../controllers/mediController");
const express = require("express");
const router = express.Router();

router.get("", medicineList); //약 목록
router.get("/:id", medicineDetail); //약 자세한 정보
router.post("/:id/insert", insertMedicine); //약 추가
router.post("/:id/update", updateMedicine); //약 정보 수정
router.post("/:id/delete", deleteMedicine); //약 삭제

// 여기 꼭 읽어줘!!!!!!!!!!!

// 밑에 함수들도 기능 req, res랑 연결되면 controller로 옮겨줘!
// 지금 완성이 안된 것 같아서 주석 처리만 하고, 안 건드렸어

/*
function timeSplit(time, timeCount){
    //만약 시간을 하나만 설정했으면 object가 아니라 string type으로 받아짐.
    if(typeof(time)==='string')
        return time.split(":");
    //시간이 여러개일 경우
    else if(typeof(time)==='object')
        return time[timeCount].split(":");
}

function mediSelect(medicine, dose, mediCount){
    var result = new Object();
    //약을 하나만 입력했을 경우, object type이 아니라 string type으로 입력받아짐.
    if(typeof(medicine)==='string'){
        result.medicine = medicine;
        result.dose = dose;
        return result;
    }
    //약을 여러개 기입했을 경우, object type으로 입력받아짐.
    else if(typeof(medicine)==='object'){
        result.medicine = medicine[mediCount];
        result.dose = dose[mediCount];
        return result;
    }
}
*/

module.exports = router;
