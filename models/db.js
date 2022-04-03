require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_DB, 
    process.env.PASS_DB, {
    host: process.env.HOST,
    dialect: process.env.INST_BANCO
})

sequelize.authenticate()
//.then( function(){ console.log("success :)") })
.catch(function(){ console.log("Erro :(") })

module.exports = sequelize