const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type Todo {
        id: ID!
        title: String!
        done: Boolean!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getTodos: [Todo!]!
    }

    input TodoIn {
        title: String!
    }

    type Mutation {
        createTodo(todo: TodoIn!): Todo!
        completeTodo(id: ID!): Todo!
    }
`)