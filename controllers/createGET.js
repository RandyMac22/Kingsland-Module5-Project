const Article = require('../models/Article');

module.exports = (req,res) => {
    console.log("Creating an article!");
    let user = res.user;
    console.log(user);
    let context = {};

    if(user){
        context.loggedIn = true;
        context.firstName = user.username;
        res.render("create", context);
    } else {
        res.render("index");
    }  
};