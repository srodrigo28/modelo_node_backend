const Sequelize = require('sequelize')
const db = require('./db')

const Conta = db.define('contas', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Conta.sync();

module.exports = Conta