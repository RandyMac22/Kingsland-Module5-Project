let jwt = require('jsonwebtoken');
let bcrypt = require("bcrypt");

const saltConfig = require('../config/config').saltRounds;
const jwtConfig = require("../config/config").jwt;

const User = require("../models/User");

module.exports = (req, res) => {
    //step 1 establish the route is working
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    
    User.findOne({username}).then(user=>{
        console.log(user);
        //compare password given with the one in the db
        if(user !== null){    
            bcrypt.compare(password,user.password,(err,result)=>{
                console.log(result);
    
                if(result){
                    //move to the homepage/user page
                    res.status(200);
                     //create JSWebtoken, send it as a cookie to the other routes
                    let userToken = {
                        id: user._id,
                        username: user.username,
                        firstName: user.firstName
                    }
                    const token = jwt.sign(userToken, jwtConfig.secret, jwtConfig.options);
                    res.cookie("user", token);
                    //console.log(token);
                    res.redirect("/");
                } else {
                    res.status(406);
                    //bad password
                    //TODO
                    //rerender with the context that shows the user what's wrong
                }
            });
        } else {
            res.status(406);
            //bad username
            console.log("bad username");
            //TODO
            //rerender with the context that shows the user what's wrong
        }    
    })
    .catch(err=>{
        console.log(err);
    });
};