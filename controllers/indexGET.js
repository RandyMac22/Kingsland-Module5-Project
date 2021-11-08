const fs = require('fs');

module.exports = function(req, res) {
    console.log("Getting articles");

    fs.readFile("./config/database.json", "utf8", (err, data) => {
        if(err) throw err;

        let articles = JSON.parse(data);

        console.log(articles);
        let context = {
            articles
        };

        res.render("index", context);
    })
}