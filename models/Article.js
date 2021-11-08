module.exports = class Article {
    constructor(title, description, author, creationDate){
        this.id = makeID(); 
        this.title = title;
        this.description = description;
        this.author = author;
        this.creationDate = creationDate;
    }
};

function makeID(title) {
    let sum = 0;
    sum +=1;
    return sum;
}