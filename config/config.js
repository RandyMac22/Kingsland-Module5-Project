module.exports = {
    development: {
        port: process.env.PORT || 8080
    },
    production: {},
    saltRounds: 9,
    jwt: {
        secret: "kingWiki",
        options: {
            expiresIn: '2d'
        }
    }
};