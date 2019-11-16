# LightIsLed-Server

- DB 세팅(예원)
    - 데이터베이스 생성:
        - (추천): 자신의 Mysql에서 'Mediger' 데이터베이스를 생성한 후, 아래 [링크](https://docs.google.com/document/d/1XbNLMyp6zqRh0UwgtsLNtdFe3JjAz4aDovtlekeYcXw/edit?usp=sharing) 를 참고하여 테이블을 생성한다. 
        - (대안): 또는, `sequelize db:create` 명령어를 통해 데이터베이스를 생성한다. 이후 `npm start` 또는 `node init.js` 명령어 수행 시, 테이블이 자동 생성된다.
    `sequelize db:create` 명령어를 입력하여 데이터베이스를 생성한다.(Sequelize로 자동 생성)
    - config 수정: `./config/config.json`파일에서 "development" 하위의 username, password, database를 수정하여 진행한다. (username은 자신의 mysql username, password는 자신의 mysql 비밀번호, database는 자신이 설정한 database명)

- SignUp (명지)
    - express-session 설치 필요
    - home 으로 가면 user 정보 확인 후 없으면 join 페이지 있으면 메인페이지로 넘어감. 
    - 서버 연결 닫히면 다시 정보 넣어야 함.