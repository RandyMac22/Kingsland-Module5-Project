module.exports = class User {
    constructor(username, password, firstName){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.createdArticles = [];
    }
};