# LightIsLed-Server

- DB 세팅
    - 데이터베이스 생성:
        - (추천): 자신의 Mysql에서 'Mediger' 데이터베이스를 생성한 후, 아래 [링크](https://docs.google.com/document/d/1XbNLMyp6zqRh0UwgtsLNtdFe3JjAz4aDovtlekeYcXw/edit?usp=sharing) 를 참고하여 테이블을 생성한다. 
        - (대안): 또는, `sequelize db:create` 명령어를 통해 데이터베이스를 생성한다. 이후 `npm start` 또는 `node init.js` 명령어 수행 시, 테이블이 자동 생성된다.
    - config 수정: `./config/config.json`파일에서 "development" 하위의 username, password, database를 수정하여 진행한다. (username은 자신의 mysql username, password는 자신의 mysql 비밀번호, database는 자신이 설정한 database명)

- Router
    - `routers.js`를 참고
