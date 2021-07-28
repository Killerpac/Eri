require('dotenv').config()
module.exports = {
    client: {
        token: process.env.TOKEN,
        cookie: process.env.COOKIE,
    },
};
