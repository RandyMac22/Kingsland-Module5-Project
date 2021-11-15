const fs = require("fs");

const Article = require("../models/Article");

module.exports = function(req,res){
    //specific article
    let user = res.user;
    //console.log(user)
    let context = {}; 

    if(user){
        context.loggedIn = true
    }

    console.log(req.params);
    let id = req.params.id;
    //get the data from the db
    Article.findById(id).then(article=>{
        // if (context.creator == user.id){
        //     context.isCurrentUser = true;
        // } 
        //console.log(article);
        //set it into the article object

        context.id = id;
        context.title = article.title;
        context.description = article.description;
        context.creator = article.creator;
        
        // if (context.creator == user.id){
        //     context.isCurrentUser = true;
        // } 
        res.render("article", context);
    });

};