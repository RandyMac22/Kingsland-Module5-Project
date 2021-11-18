const Article = require("../models/Article");
const { validationResult } = require("express-validator");
const { cssNumber } = require("jquery");

module.exports = {
    get: (req, res) => {
        console.log("Getting article");

        let user = res.user;
        // console.log(user);
        let context = {};
    
        let id;
        id = req.params.id;
        context.type = res.show;
        if(res.show != "none"){
            context.message = res.message;
        }
    
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
    },
    post: (req, res) => {
        let id;
        id = req.params.id;
        let updates = req.body;
        console.log(updates);

        // if(updates.description.length<20 || /[^a-zA-Z 0-9\.]/g.test(updates.description)) {
        //     res.cookie("status", {
        //         type: "error",
        //         message: "Please enter a valid description (no special characters) at least 20 characters long"
        //     });
        //     return res.redirect(`/edit/article/${id}`);
        // }

        Article.findById(id)
        .then((article)=>{
            article.description = updates.description.trim();
            if(updates.description.length < 20 ||/[^a-zA-Z 0-9\.]/g.test(updates.description)) {
                res.cookie("status", {
                    type: "error",
                    message: "Please enter a description of letters and numbers at least 20 characters long."
                })
                res.redirect(`/edit/article/${id}`);
            }
            article.save()
            .then((article)=>{
                console.log("Update successful");
                res.cookie("status", {
                    type: "success",
                    message: "Update successful"
                });
                res.redirect(`/article/${id}`);
            })
            .catch((err)=> {
                console.log(err);
            })
        })
    }
};