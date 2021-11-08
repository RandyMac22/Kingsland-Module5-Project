// TODO: Require Controllers...
const createPOST = require("../controllers/createPOST");
const indexGET = require("../controllers/indexGET");
const articleGET = require("../controllers/articleGET");
const mongoose = require("mongoose");
const Article = require("../models/Article");

module.exports = (app) => {
    //TODO...

    app.get("/", indexGET);

    app.get("/all-articles", function(req,res){
        //all articles
        res.render("all-articles");
    });

    app.get("/article/:id", articleGET);

    app.get("/create", function(req,res){

        res.render("create");
    });
    app.post("/create", createPOST);

    app.get("/edit", function(req,res){
        //edit an article
        res.render("edit");
    });

    app.get("/login", function(req,res){
        //login page
        res.render("login");
    });

    app.get("/register", function(req,res){
        //register page
        res.render("register");
    });

    app.get("*", function(req,res){
        //404 page
        
    });


};