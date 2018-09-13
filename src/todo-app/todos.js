import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none

// retrieve saved todos from localStorage
const loadTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// saveTodos
// Arguments: none
// Return value: none

// save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array

const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none

const createTodo = (todoText) => {
    let newTodo = {}

    if (todoText !== '') {
        newTodo = {
            id: uuidv4(),
            text: todoText,
            completed: false
        }
        todos.push(newTodo)
    }
    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none

// remove todo with button
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    saveTodos()
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none

// toggle todos between completed and not completed
const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
    }
    saveTodos()
}

// Make sure to call loadTodos and setup the exports
loadTodos()

export { saveTodos, getTodos, createTodo, removeTodo, toggleTodo }