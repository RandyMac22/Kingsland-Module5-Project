// Packages
let jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;
const { body, validationResult } = require("express-validator");

// Controllers...
const createPOST = require("../controllers/createPOST");
const indexGET = require("../controllers/indexGET");
const articleGET = require("../controllers/articleGET");
const allArticlesGET = require("../controllers/allArticlesGET");
const createGET = require("../controllers/createGET");
const register = require("../controllers/register");
const login = require("../controllers/login");
const edit = require("../controllers/edit");
const deleteArticle = require("../controllers/deleteArticle");

const Article = require("../models/Article");

module.exports = function(req, res) {
    console.log("Getting articles");

    Article.find({}).then(articles=>{
        //console.log(articles);
        let articleArray = articles.map(article=>{
            let subArticle = {
                id: article._id,
                title: article.title,
                description: article.description
            };
            return subArticle;
        });
       // console.log(articleArray);
    });
};

const mongoose = require("mongoose");

module.exports = (app) => {
    //TODO...

    app.use((req, res, next)=>{
        //TODO
        //check for user login
        //pass user along
        if(req.cookies.user){
            let decodedJWT = jwt.verify(req.cookies.user, jwtConfig.secret);
            //console.log(decodedJWT);
            res.user = {
                id: decodedJWT.id,
                username: decodedJWT.username
            };
        }
        if(req.cookies.status){
            let status = req.cookies.status;
            res.clearCookie("status");
            console.log(status);
            res.show = status.type;
            res.message = status.message;
        }
        if(res.show == undefined){
            res.show = "none";
        }
        // res.type = "none";
        next();
    });
    
    app.get("/", indexGET);

    app.get("/all-articles", allArticlesGET);
   
    app.get("/create", createGET);

    app.post("/create", createPOST);

    app.get("/article/:id", articleGET);

    app.get("/edit/article/:id", edit.get);

    app.post("/edit/article/:id", edit.post);

    app.get("/delete/article/:id", deleteArticle);


    app.get("/login", (req,res) => {
        //login page
        //todo
        //check if logged in or not.  
        let user = res.user;
        // console.log(user);
        let context = {};
        context.type = res.show;
        if(res.show != "none"){
            context.message = res.message;
        }
        //If logged in then redirect back to home
        if(user){
            context.loggedIn = true;
            context.firstName = user.username;
            res.redirect("/");
        } else {
            res.render("login");
        }
        
    });

    app.post("/login", login);

    app.get("/logout", (req,res)=>{
        let context = {};
        res.clearCookie("user");
        res.cookie("status", {
            type:"success",
            message: "Log out successful"
        });
        res.redirect("/");
    });

    app.get("/register", (req,res) => {
        //register page
        //todo
        //check if logged in or not.  If logged in then redirect back to home
        let user = res.user;
        // console.log(user);
        let context = {};
        context.type = res.show;
        if(res.show != "none"){
            context.message = res.message;
        }
        if(!user){
            res.render("register");
        } else {
            res.cookie("status", {
                type: "success",
                message: "User created!"
            });
            context.loggedIn = true;
            context.firstName = user.username;
            res.redirect("/");
        }    
    });

    app.post("/register",body("username").trim().isLength({ min:5 }).isAlphanumeric(),body("password").trim().isLength({ min: 8 }).isAlphanumeric(), register);

};