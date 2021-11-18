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
    new Article({
        title: fields.title,
        description: fields.description,
        creator: creator,
        dateTime: new Date()
    })
    .save()
    .then(article=>{
        console.log(article);
        User.findById(creator).then(user=>{
            
        })
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    });
};

