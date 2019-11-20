# LightIsLed-Server

- DB 세팅 (예원)
    - 데이터베이스 생성:
        - (추천): 자신의 Mysql에서 'Mediger' 데이터베이스를 생성한 후, 아래 [링크](https://docs.google.com/document/d/1XbNLMyp6zqRh0UwgtsLNtdFe3JjAz4aDovtlekeYcXw/edit?usp=sharing) 를 참고하여 테이블을 생성한다. 
        - (대안): 또는, `sequelize db:create` 명령어를 통해 데이터베이스를 생성한다. 이후 `npm start` 또는 `node init.js` 명령어 수행 시, 테이블이 자동 생성된다.
    - config 수정: `./config/config.json`파일에서 "development" 하위의 username, password, database를 수정하여 진행한다. (username은 자신의 mysql username, password는 자신의 mysql 비밀번호, database는 자신이 설정한 database명)

- SignUp (명지)
    - express-session 설치 필요
    - home("/")에서 user 정보 확인
    - 없으면 join 페이지로 있으면 calendar 페이지로 넘어감. 
    - 서버 연결 닫히면 다시 정보 넣어야 함.
    - 변수 이름 :  `userID`

- 알람 등록 (예원)
    - 변수 이름
        - 알람 이름: `scheName`
        - 시작일: `startDate`
        - 종료일: `endDate`
        - 약물 리스트 & 복용량 리스트: `mediName` & `dose`
        - 알람 시간 리스트: `time`
    - 약 입력 과정
        - submit을 누르면 `/addForm/insert`로 감.
        - 약물은 `findOrCreate`로, Medicines 테이블에 있는 약이면 select, 없는 약이면 insert한 후 해당 약물 정보 `return`
        - `return`된 약물 ID를 바탕으로 Schedules 테이블에 사용자가 입력한 정보를 insert
        - _약물 입력 과정에서 정의한 기타 함수들은, 시간 또는 약이 하나일 때와 여러개일 때 변수 type이 달라져 정의한 함수들임. 주요 로직 해당 X_

- 공동 Template (명지)
    - footer.pug : `a href` 이용해 클릭할 경우 각 페이지(`/calendar`, `/medicines`, `/user`)로 넘어갈 수 있도록 함.   
    - footer.pug 사용 방법: pug 파일에서 필요한 부분에 `include footer.pug` 입력 

- 알람 리스트 (명지)
    - 변수 이름
        - 선택한 날짜: `userDate`
        - 알람 리스트: `alarmList` - 알람이름, 알람 시간, 분, 알람 아이디 담고 있는 중첩 리스트임. [["name hour:min",id],["name hour:min",id],...]
    - 과정
        - `calendar` 페이지에서 `date` 선택
        - `date`는 `req.params`에 담겨서 넘어옴.
        - `date`, `userID` 이용해서 알람 리스트 찾음.
        - 알람 리스트는 `calendar/:date`페이지에 표시됨.

- 알람 기능(명지)
    