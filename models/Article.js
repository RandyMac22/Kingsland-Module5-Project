const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
    title: {type: String, required:true},
    description: {type: String, required:true},
    creator: {type:mongoose.Schema.Types.ObjectId,ref:"User", required: true},
    dateTime: {type: Date, required: true}
    }
);

module.exports = mongoose.model("Article", articleSchema);

// module.exports = class Article {
//     constructor(title, description, author, creationDate){
//         this.id = makeID(); 
//         this.title = title;
//         this.description = description;
//         this.author = author;
//         this.creationDate = creationDate;
//     }
// };

// let database = require('../config/database');

// function makeID() {
//     let sum = database.length - 1;
//     sum +=1;
//     return sum;
// }