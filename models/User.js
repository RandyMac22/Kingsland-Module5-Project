const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String},
        username: {type: String, required:true, unique: true},
        password: {type: String, required:true},
        createdArticles: []
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