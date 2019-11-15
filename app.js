var express = require("express");
var morgan = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var mainRouter = require("./routers/mainRouter");
var medicineRouter = require("./routers/medicineRouter")
var {sequelize} = require('./models');
var routers = require('./routers');

var app = express();
sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(routers.home, mainRouter);
app.use(routers.medicines, medicineRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.mesage;
    res.locals.error = req.app.get('env') || 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
