const Article = require("../models/Article");

module.exports = function(req, res) {
    console.log("Getting article");

    let user = res.user;
    // console.log(user);
    let context = {};

    let id;
    id = req.params.id;

    Article.findById(id).then(article=>{    
        if(user){
            context.loggedIn = true;
            context.firstName = user.username;

            context.id = article._id;
            context.title = article.title;
            context.description = article.description;
            context.creator = article.creator;
            // context.articles = articleArray;
            // if(user.id == article.creator){
            //     context.isCurrentUser = true;
            // }
            res.render("edit", context);
        } else {
            res.render(`article`, context);
        } 
    });
};