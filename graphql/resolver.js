const Todo = require('../models/todo')

module.exports = {
    async getTodos() {
        try {
            const todos = await Todo.findAll()
            return todos
        } catch (error) {
           throw new Error(`getTodos is not awailable : ${error}`)
        }
    }
}
   