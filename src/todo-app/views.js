import { getTodos, removeTodo, toggleTodo, saveTodos } from './todos'
import { getFilters } from './filters'

// render todos based on filters
const renderTodos = () => {
    const todos = getTodos()
    const filters = getFilters()

    let filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const todosLeft = filteredTodos.filter((todo) => !todo.completed)

    const todosEl = document.querySelector('#todos')

    if (filters.hideCompleted === true) {
        filteredTodos = todosLeft
    }

    todosEl.innerHTML = ''

    todosEl.appendChild(generateSummaryDOM(todosLeft))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todosEl.appendChild(generateTodoDOM(todo))
    })
    } else {
        const noTodosEl = document.createElement('p')
        noTodosEl.classList.add('empty-message')
        noTodosEl.textContent = 'There are no todos to show'

        todosEl.appendChild(noTodosEl)
    }
}

// generate todo DOM element
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    // set up checkbox
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = todo.completed
    containerEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos()
        renderTodos()
    })


    // set up text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // set up button
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button)
    button.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos()
        renderTodos()
    })

    return todoEl
}

// generate summary DOM
const generateSummaryDOM = (todosLeft) => {
    const todosLeftAlert = document.createElement('h2')
    todosLeftAlert.classList.add('list-title')

    let plural = todosLeft.length === 1 ? '' : 's'

    todosLeftAlert.textContent = `You have ${todosLeft.length} task${plural} left.`

    return todosLeftAlert
}

export { renderTodos }