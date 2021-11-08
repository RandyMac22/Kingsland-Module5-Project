// TODO: Require Controllers...
const createPOST = require("../controllers/createPOST");
const indexGET = require("../controllers/indexGET");

module.exports = (app) => {
    //TODO...

    app.get("/", indexGET);

    app.get("/all-articles", function(req,res){
        //all articles
        res.render("all-articles");
    });

    app.get("/article", function(req,res){
        //specific article
        res.render("article");
    });

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