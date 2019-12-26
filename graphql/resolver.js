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
    },

    async completeTodo({id}) {
        try {
            const todo = await Todo.findByPk(id) //Поиск по id в MySQL
            todo.done = true
            await todo.save() // сохраняем изменения в элементе
            return todo
        } catch (error) {
            throw new Error(`Complete Todo is not available: ${error}`)
        }
    },

    async deleteTodo({id}) {
        try {
            const todos = await Todo.findAll({
                where: {id}    
            }) //Поиск по id в MySQL
            await todos[0].destroy() // сохраняем изменения в элементе
            return true
        } catch (error) {
            throw new Error(`Complete Todo is not available: ${error}`)
            return false
        }
    }

}
