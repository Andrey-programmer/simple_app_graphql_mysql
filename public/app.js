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

            const query = `mutation {
                    createTodo(todo: {title: "${title}"}) {
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
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query}) 
            })
                // console.log(respons e)
                const res = await response.json()
                // console.log(res)
                const todo = res.data.createTodo
                // console.log(todo)
                this.todos.push(todo)
                this.todoTitle = ''
          
        },
        async removeTodo(id) {
            
            const query = `mutation {
                deleteTodo(id: "${id}")
            }
        `
            await fetch(`/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query}) 
            })
            this.todos = this.todos.filter(t => t.id !== id)
        },
        async completeTodo(id) {

            const query = `mutation {
                completeTodo(id: "${id}") {
                   updatedAt
                }
            }
        `

            const response = await fetch(`/graphql`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })

            const res = await response.json()
            const index = this.todos.findIndex(t => t.id === id)
            this.todos[index].updatedAt = res.data.completeTodo.updatedAt
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