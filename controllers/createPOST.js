const fs = require("fs");
const formidable = require("formidable");
const Article = require("../models/Article");
const { ResultWithContext } = require("express-validator/src/chain");

module.exports = function(req,res) {
    console.log("Creating an ARTICLE!!");
    console.log(Article);
    //take in the create article information
    console.log(req.body);
    let fields = req.body;
    let newArticle = new Article(
        fields.title,
        fields.description
    );
    console.log(newArticle);

    fs.readFile("./config/database.json", "utf8", (err, data) => {
        if(err) throw err;
        //console.log("Uploading Article data");
        let articles = JSON.parse(data);
        articles.push(newArticle);
        let json = JSON.stringify(articles);
        console.log(json);

        fs.writeFile("./config/database.json", json, (err) => {
            if(err) throw err;
            console.log("Data uploaded successfully");

            //redirect to the "/" route
            //otherwise send error to the front end

            res.redirect("/");
        });
    });
        
    
};