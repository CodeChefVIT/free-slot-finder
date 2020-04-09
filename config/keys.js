// const process = require('process')

dbPassword = process.env.DBURI
console.log(dbPassword);

module.exports = {
    mongoURI: dbPassword
};