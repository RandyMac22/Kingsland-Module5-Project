const fs = require('fs');

const Article = require("../models/Article");

module.exports = function(req,res){
    //specific article
    console.log(req.params);
    let id;
    if(Number(req.params.id)){
        id = req.params.id;
    }

    fs.readFile("./config/database.json", "utf8",(err,data) => {
        if(err) throw err;

        let articles = JSON.parse(data);
        let cube = articles.find(article => article.id == id);
       
        let context = {
            ...article
        };
        
        res.render("index", context)
    })

    
    res.render("article/:id", context);
}