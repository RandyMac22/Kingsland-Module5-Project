const Article = require("../models/Article");

module.exports = (req, res) => {
    console.log("Getting articles");

    let user = res.user;
    // console.log(user);
    let context = {};

    if(user){
        context.loggedIn = true;
        context.firstName = user.username;
    }
    context.type = res.show;
    if(res.show != "none"){
        context.message = res.message;
    }

    Article.find({}).then(articles=>{
        // console.log(articles);
        let articleArray = articles.map(article=>{
            let subArticle = {
                id: article._id,
                title: article.title,
                description: article.description,
                creator: article.creator
            };
            return subArticle;
        });
        //console.log(articleArray);
        
            context.articles = articleArray;
        
        //console.log(context.articles);
         res.render("all-articles", context);
    });
   
};