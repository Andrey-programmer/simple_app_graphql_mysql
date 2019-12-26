const Secuelize = require('sequelize')


const DB_NAME = 'node-todo'
const USER_NAME = 'root'
const PASSWORD = '111333fff'
 
const sequelize = new Secuelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost', //используемый хост
    dialect: 'mysql' //используемый диалект
})

module.exports = sequelize