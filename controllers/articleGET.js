const fs = require("fs");

const Article = require("../models/Article");

module.exports = function(req,res){
    //specific article
    let user = res.user;
    //console.log(user)
    let context = {}; 

    //console.log(req.params);
    let id = req.params.id;
    //get the data from the db
    Article.findById(id).then(article=>{
     
        //console.log(article);
        //set it into the article object

        context.id = id;
        context.title = article.title;
        context.description = article.description;
        context.creator = article.creator;
    
        if(user){
            context.loggedIn = true;
            context.firstName = user.username;
            if (article.creator == user.id){
                context.isCurrentUser = true;
            }
        }
        res.render("article", context);
    });

};