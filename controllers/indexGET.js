const Article = require("../models/Article");

module.exports = function(req, res) {
    console.log("Getting articles");

    Article.find({}).then(articles=>{
        console.log(articles);
        let context = {
            articles
        };

        res.render("index", context);
    });
};