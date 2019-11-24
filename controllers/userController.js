const {User} = require("../models");
const userDetail = async (req, res) => {
    try{
        await User.findOne({
            where:{
                userID: req.session.user.userID
            },
            attributes: ["userName","birth","sex","accompanierName","accompanierPhone"]
        }).then((user)=>{
            res.render("profile",{
                user: user
            });
        })
    }catch(error){
        console.log(error);
        next(error);
    }
};

const userEdit = async (req,res) => {
    try{
        await User.findOne({
            where:{
                userID: req.session.user.userID
            },
            attributes: ["userName","birth","sex","accompanierName","accompanierPhone"]
        }).then((user)=>{
            res.render("editProfile",{
                user: user
            });
        })
    }catch(error){
        console.log(error);
        next(error);
    }
};

const userUpdate = async (req, res) => {
    try{
        const {accompanierName, accompanierPhone} = req.body;
        await User.update({
            accompanierName: accompanierName,
            accompanierPhone: accompanierPhone
        },{
            where: {
                userID: req.session.user.userID
            }
        }).then((user)=>{
            res.redirect("/user");
        })
    }catch(error){
        console.log(error);
        next(error);
    }
    

};

module.exports = {
    userDetail,
    userEdit,
    userUpdate
};
