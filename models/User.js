const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    username: {type: String, required:true},
    password: {type: String, required:true},
    firstName: {type: String, required: true}
    }
);

module.exports = mongoose.model("User", userSchema);

// module.exports = class User {
//     constructor(username, password, firstName){
//         this.username = username;
//         this.password = password;
//         this.firstName = firstName;
//         this.createdArticles = [];
//     }
// };