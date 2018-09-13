import { getFilters, setFilters } from './filters'
import { createTodo } from './todos'
import { renderTodos } from './views'

renderTodos()

document.querySelector('#search').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    
    renderTodos()
})

document.querySelector('#add-todo-form').addEventListener('submit', (e) => {
    e.preventDefault()

    createTodo(e.target.elements.addTodo.value.trim())

    renderTodos()

    e.target.elements.addTodo.value = ''
})