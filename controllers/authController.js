const { User } = require("../models");

// 주석 처리된 부분은 어디 라우터인지 모르겠음ㅜㅜ (수정 바람)
// calendar가 home 역할해서 home 필요없을 것 같았는데 이부분 잘모르겠어서!
/*
router.get(routes.home, (req, res) => {
    if (req.session.user) {
        res.redirect(routes.calendar);
    } else {
        res.redirect(routes.join);
    }
});
*/

//이것도 잘 모르겠어서 주석해놓음!
/*
router.get("/addAlarm", (req, res) => {
    res.render("alarm", {
        title: "Mediger-MediInput",
        user: null
    });
});
*/

const getJoin = (req, res) => {
    res.render("join", {
        title: "join - Mediger"
    });
};

const postJoin = async (req, res) => {
    const { name, birthDay, sex } = req.body;
    const birthDate = new Date(birthDay);
    try {
        await User.create({
            userName: name,
            birth: birthDay,
            sex: sex
        });
        const userId = await User.findOne({
            attributes: ["userId"],
            where: { userName: name, birth: birthDate }
        });
        req.session.user = {
            id: userId["dataValues"]["userId"]
        };
        res.redirect(routes.calendar);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

module.exports = {
    getJoin,
    postJoin
};
