//const fs = require("fs");
const Article = require("../models/Article");
const User = require("../models/User");

const { ResultWithContext } = require("express-validator/src/chain");

module.exports = function(req,res) {
    console.log("Creating an ARTICLE!!");
    console.log(Article);
    let user = res.user;
    console.log(user);
    let context = {};

    if(user){
        context.loggedIn = true;
        context.firstName = user.username;
    }
    //take in the create article information
    console.log(req.body);
    let creator = user.id;
    let fields = req.body;
    if(fields.title.length < 5 || /[^a-zA-Z0-9 ]/g.test(fields.title)){
        context.type = "error";
        context.message = "Please enter a valid title for the article of at least 5 characters";
        context.title = fields.title;
        context.description = fields.description;
        return res.render("create", context);
    }
    if(fields.description.length < 20) {
        context.type = "error";
        context.message = "Please enter a valid description for the article of at least 20 characters";
        context.title = fields.title;
        context.description = context.description;
        res.render("create", context);
    }
    new Article({
        title: fields.title,
        description: fields.description,
        creator: creator,
        dateTime: new Date()
    })
    .save()
    .then(article=>{
        res.cookie("status", {
            type:"success",
            message: "Article created!"
        });
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    });
};

