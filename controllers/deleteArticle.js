const Article = require("../models/Article");

module.exports  =  {
    get: (req, res) => {
        id = req.params.id;
        let context = {};
        let user = res.user;
        context.type = res.type;
        if(res.type != "none") {
            context.message = res.message;
        }
        if (user) {
            context.loggedIn = true;
            Article.findById(id)
            .then((article=>{
                if(user.id == article.creator) {
                    context.isCurrentUser = true;
                }
                context.id = article._id;
                context.title = article.title;
                context.description = article.description;
                res.render("delete", context);
            }))
        } else {
            context.type = "error";
            context.message = "Article not made by this User, cannot delete an article made by another user.";
            res.redirect(`/article/${id}`, context);
        }
    },

    post: (req, res) => {
        let id;
        id = req.params.id;

        Article.findByIdAndRemove(id)
        .then((article)=>{
            console.log(article);

            res.redirect("/");
        });
    }
}