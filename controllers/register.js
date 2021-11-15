let bcrypt = require('bcrypt');
const saltConfig = require('../config/config').saltRounds;

const User = require("../models/User");

module.exports = (req, res) => {
    //step 1 establish the route is working
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let rePassword = req.body.rePassword;
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
                    res.end
                })
                .catch(err=>{
                    console.log(err);
                });
            });
        });
    } else {
        //send the error back to the front end
    }
}