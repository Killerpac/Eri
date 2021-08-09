require('dotenv').config()
module.exports = {
    discord: {
        activity:"With Slash /play",
        token: process.env.TOKEN,
        cookie: process.env.COOKIE,
        ne:null,
    },
};
