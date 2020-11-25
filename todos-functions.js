//library to create unique ids for each todo
uuidv4()

// fetch existing data from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem('todos')

  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
    return []
  }
}

// save todos to localStorage
const saveData = function (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// render application todos based on filters
const renderTodos = function (todos, filters) {
  let filteredToDos = todos.filter(function (todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredToDos.filter(function (item) {
      return !item.completed
    })

  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

  filteredToDos.forEach(function (todo) {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo))
  })
}

// remove todo via id
const removeTodo = function (id) {
  const todoIndex = todos.findIndex( function (todo) {
    return id === todo.id
  })
  if (todoIndex > -1) {
   todos.splice( todoIndex, 1)
  }
}

// add checkmark when todos is completed
const toggleTodo = function (id) {
// wenn checkmark gesetzt wird, dann muss sich das note.completed = true asignen
  const todo = todos.find(function (todo) {
    return todo.id === id
  })

  if (todo !== undefined) {
    todo.completed = !todo.completed
  }
}

// get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
  let todoEl = document.createElement('div')
  let checkbox = document.createElement('input')
  let textElement = document.createElement('span')
  let deleteButton = document.createElement('button')

  // setup checkbox
  checkbox.setAttribute('type','checkbox')
  checkbox.checked = todo.completed
  todoEl.appendChild(checkbox)
  checkbox.addEventListener('change', function () {
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
  deleteButton.addEventListener( 'click', function () {
    removeTodo(todo.id)
    saveData(todos)
    renderTodos(todos, filters)
  })

  return todoEl
}

// get DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left.`
  return summary
}
