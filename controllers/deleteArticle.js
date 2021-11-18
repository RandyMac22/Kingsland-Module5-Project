const Article = require("../models/Article");

module.exports = (req, res) => {
    let user = res.user;
    
    let context = {};
    context.id = user._id;
    

    let id = req.params.id;
    Article.findByIdAndRemove(id)
    .then((article)=> {
        console.log(article);
        res.cookies("status", {
            type: "success",
            message: "Article deleted."
        });
        res.redirect("/");
    });

}