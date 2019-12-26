const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

// Получение списка задач
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        // console.log(todos)
        res.status(200).json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Server error: ${error}`
        })
    }
})

// Создание новой задачи
router.post('/', async (req, res) => {
    try { 
        const todo = await Todo.create({ //Заполняем таблицу базы данных из формы
            title: req.body.title,
            done: false
        })
        res.status(201).json({ //Возвращаем сохранённый объект
            todo
        })
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error}`
        })
    }
})

// Изменение задачи
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(+req.params.id) //Поиск по id в MySQL
        todo.done = req.body.done
        await todo.save() // сохраняем изменения в элементе
        res.status(200).json({todo})
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error}`
        })
    }
})

// Удаление задачи
router.delete('/:id', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: {
                id: +req.params.id //Ищем по нужному параметру в таблице
            }
        })
        await todos[0].destroy()
        res.status(204).json({})//передаем пустой объект со статусом 204
    } catch (error) {
        res.status(500).json({
            message: `Server error: ${error}`
        })
    }
})

module.exports = router