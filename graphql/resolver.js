const Todo = require('../models/todo')

module.exports = {
    async getTodos() {
        try {
            const todos = await Todo.findAll()
            return todos
        } catch (error) {
           throw new Error(`getTodos is not available : ${error}`)
        }
    },

    async createTodo({todo: {title}}) {
        console.log('полученный Тайтл: ' + title)
        try { 
            return await Todo.create({ //Заполняем таблицу базы данных из формы
                title,
                done: false
            })
            
        } catch (error) {
            throw new Error(`Create Todo is not available: ${error}`)
        }
    }
}
