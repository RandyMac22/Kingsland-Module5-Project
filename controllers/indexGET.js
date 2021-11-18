const Article = require("../models/Article");
const { validationResult } = require("express-validator");

module.exports = function(req, res) {
    console.log("Getting articles");
    // console.log(res.user);
    let user = res.user;
    // console.log(user);
    let context = {};
    //console.log(user.firstName);

    function truncate(str, numWords) {
       return str.split(" ").splice(0, numWords).join(" ");
    }

    if(user){
        context.loggedIn = true;
        context.firstName = user.username;
    }
    context.type = res.show;
    if(res.show != "none"){
        context.message = res.message;
    }

    Article.find({}).then(articles=>{
        console.log(articles);
        let articleArray = articles.map(article=>{
            let subArticle = {
                id: article._id,
                title: article.title,
                description: truncate(article.description, 50),
                creator: article.creator
            };
            return subArticle;
        });
        console.log(articleArray);
        if (articleArray.length > 3) {
            let last3 = articleArray.slice(articleArray.length-3, articleArray.length);
            context.articles = last3;
        } else {
            context.articles = articleArray;
        }
        context.type = "none";
        
        res.render("index", context);
        console.log(user);
    });
};