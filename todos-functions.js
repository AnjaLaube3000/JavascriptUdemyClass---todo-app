//library to create unique ids for each todo
uuidv4()

// fetch existing data from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos')
  return todosJSON !== null ? JSON.parse(todosJSON) : []
}

// save todos to localStorage
const saveData = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// render application todos based on filters
const renderTodos = (todos, filters) => {
  let filteredToDos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredToDos.filter((item) => !item.completed)

  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

  filteredToDos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo))
  })
}

// remove todo via id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex( (todo) => id === todo.id)
  if (todoIndex > -1) {
   todos.splice( todoIndex, 1)
  }
}

// add checkmark when todos is completed
const toggleTodo = (id) => {
// wenn checkmark gesetzt wird, dann muss sich das note.completed = true asignen
  const todo = todos.find((todo) => todo.id === id)

  if (todo !== undefined) {
    todo.completed = !todo.completed
  }
}

// get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  let todoEl = document.createElement('div')
  let checkbox = document.createElement('input')
  let textElement = document.createElement('span')
  let deleteButton = document.createElement('button')

  // setup checkbox
  checkbox.setAttribute('type','checkbox')
  checkbox.checked = todo.completed
  todoEl.appendChild(checkbox)
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
    saveData(todos)
    renderTodos(todos, filters)
  })

  // setup text of todo
  if (todo.text.length > 0) {
    textElement.textContent = todo.text
  } else {
    textElement.textContent = "No name"
  }
  todoEl.appendChild(textElement)

  // setup delete button
  deleteButton.textContent = 'x'
  todoEl.appendChild(deleteButton)
  deleteButton.addEventListener( 'click', () => {
    removeTodo(todo.id)
    saveData(todos)
    renderTodos(todos, filters)
  })

  return todoEl
}

// get DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left.`
  return summary
}
