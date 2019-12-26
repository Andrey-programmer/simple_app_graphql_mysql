const express = require('express')
const path = require('path')
const graphql = require('express-graphql')
const shema = require('./graphql/shema')
const resolver = require('./graphql/resolver')
const sequelize = require('./utils/database')
const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json())// middleware для парсинга json - файлов
app.use('/graphql', graphql({
    schema: shema,
    rootValue: resolver,
    graphiql: true //Открываем возможность тестирования роута '/graphql' в браузере
}))
app.use(express.static(path.join(__dirname, 'public'))) //Указываем статическую папку
app.use((req, res, next) => {
    res.sendFile('/index.html') // указываем что index.html лежит в корне
})

//Создаем функцию для запуска приложения
async function start() {
    try {
        await sequelize.sync(/* {force: true} */) //сначала синхронизируемся с базой данных
                                //Необязательный параметр в скобках для того чтобы автоматически удалять поля если они удаляются в модели
        //Затем запускаем наше приложение
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

