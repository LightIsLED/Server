var app = require("./app");
var mysql = require('mysql2');

app.use(express.logger())

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b0bb2113fafd66',
    password: '133d3d26',
    database: 'heroku_6239ce1834731ad',
});

connection.connect();
const PORT = process.env.PORT || 5000;

const handleListening = () => 
    console.log(`Listening on: ${PORT}`);

app.listen(PORT,handleListening);