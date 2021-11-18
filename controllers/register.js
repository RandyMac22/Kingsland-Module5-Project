let bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const saltConfig = require('../config/config').saltRounds;

const User = require("../models/User");

module.exports = (req, res) => {
    //step 1 establish the route is working
    //console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let rePassword = req.body.rePassword;
    let context = {};
    context.username = username;
    context.password = password;
    context.rePassword = rePassword;
    //make sure the user has a unique username
    let { errors } = validationResult(req);

    if (errors.length > 1) {
        if(errors[0].param == "username"){
            context.type = "error";
            context.message = "Please make sure your username is at least 5 characters long, and only contains letters and numbers.";
        } else {
            context.type = "error";
            context.message = "Please make sure your username is at least 8 characters long, and only contains letters and numbers.";
        }
        console.log(errors);
        return res.render("register", context);
    }
    User.find({ username: username })
    .then((users)=>{
        if(users.length>0){
            context.type = "warning";
            context.message = "Sorry, username is already taken.";
            return res.render("register", context);
        }
        if(password.length < 8 || /\W/g.test(password)){
            context.type = "error";
            context.message = "Please make sure your password is at least 8 characters long, and only contains letters and numbers.";
            return res.render("register", context);
        }
    })
    //step 2 : either check the regex for the first password
    //or check if the two passwords are ==
    if(password == rePassword){
        //TODO
        //now check for a valid password

        //if valid now add the new user to the database
        bcrypt.genSalt(saltConfig,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                console.log(hash);
                //create a new user in the db
                new User ({
                    username,
                    password: hash
                })
                .save()
                .then(user=>{
                    res.status(201);
                    console.log(`User was created successfully!`);
                    console.log(user);
                    res.redirect("/login");
                    res.cookie("status", {
                        type: "success",
                        message: "User created!"
                    });
                    
                    //res.end
                })
                .catch(err=>{
                    console.log(err);
                });
            });
        });
    } else {
        //send the error back to the front end
        context.type = "error";
        context.message = "Please make sure your passwords match for both boxes";
        return res.render("register", context);
    }
};