const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo', { //(<название модели>, опции)
    id: {
        primaryKey: true, //Начальный ключ
        autoIncrement: true, //автоинткрементирование id
        allowNull: false, //запрет нулевого значения
        type: Sequelize.INTEGER //выбираем числовой тип
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // date: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    // }
})

module.exports = todo