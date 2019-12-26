new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            isDark: true,
            todoTitle: '',
            todos: [],
        }
    },
    async created() {
        const query = `
            query {
                getTodos {
                    id
                    title
                    done
                    createdAt
                    updatedAt
                }
            }
        `
        const response = await fetch('/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query})
        })
        const res = await response.json()
        // console.log(res)
        this.todos = res.data.getTodos
    },
    methods: {
        async addTodo() {
            const title = this.todoTitle.trim()
            if (!title) {
                return
            }
            const response = await fetch('/api/todo', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title}) 
            })
                const res = await response.json()
                const todo = res.todo
                // console.log(todo)
                this.todos.push(todo)
                this.todoTitle = ''
             
                // .then(res => res.json())
                // .then(({todo}) => {
                //     // console.log(todo)
                //     this.todos.push(todo)
                //     this.todoTitle = ''
                // })
                // .catch(error => {
                //     console.log(error)
                // })
           /*  this.todos.push({
                title: title,
                id: Math.random(),
                done: false,
                date: new Date()
            }) */
        },
        async removeTodo(id) {
            await fetch(`/api/todo/${id}`, {
                method: 'delete'
            })
            this.todos = this.todos.filter(t => t.id !== id)
        },
        async completeTodo(id) {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({done: true})
            })

            const res = await response.json()
            const todo = res.todo
            // console.log(todo)
            const index = this.todos.findIndex(t => t.id === todo.id)
            this.todos[index].updatedAt = todo.updatedAt
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            if(withTime) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
        }
    }
})