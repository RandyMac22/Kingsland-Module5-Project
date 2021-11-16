let jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;

// Require Controllers...
const createPOST = require("../controllers/createPOST");
const indexGET = require("../controllers/indexGET");
const articleGET = require("../controllers/articleGET");
const allArticlesGET = require("../controllers/allArticlesGET");
const createGET = require("../controllers/createGET");
const register = require("../controllers/register");
const login = require("../controllers/login");
const editGET = require("../controllers/editGET");

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
            }
        }
        next();
    });
    
    app.get("/", indexGET);

    app.get("/all-articles", allArticlesGET);
   
    app.get("/create", createGET);

    app.post("/create", createPOST);

    app.get("/article/:id", articleGET);

    app.get("/edit/article/:id", editGET);

    app.post("/edit/article/:id", (req, res) => {

    });

    app.get("/delete/article/:id", (req,res) => {
        let user = res.user;
        // console.log(user);
        let context = {};

        let id;
        id = req.params.id;

        Article.findById(id).then(article=>{
            context.id = article._id;
            
        })

        if(user){
            context.loggedIn = true;
            context.firstName = user.username;
            res.render("delete/article/:id");
        } else {
            res.render(`/article/${id}`);
        }
    });

    app.post("/delete/article/:id", (req, res)=>{

    });

    app.get("/login", (req,res) => {
        //login page
        //todo
        //check if logged in or not.  
        let user = res.user;
        // console.log(user);
        let context = {};
        //If logged in then redirect back to home
        if(user){
            context.loggedIn = true;
            context.firstName = user.username;
            res.render("index");
        } else {
            res.render("login");
        }
        
    });

    app.post("/login", login);

    app.get("/logout", (req,res)=>{
        let context = {};
        res.clearCookie("user");
        res.redirect("/");
    });

    app.get("/register", (req,res) => {
        //register page
        //todo
        //check if logged in or not.  If logged in then redirect back to home
        let user = res.user;
        // console.log(user);
        let context = {};

        if(!user){
            res.render("register");
        } else {
            context.loggedIn = true;
            context.firstName = user.username;
            res.redirect("/");
        }    
    });

    app.post("/register", register)

};