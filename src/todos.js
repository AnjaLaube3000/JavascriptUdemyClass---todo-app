import uuidv4 from 'uuid/v4'

let todos = []

// fetching existing data from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    todos =  todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    todos = []
  }
}

// save todos to localStorage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}


// get Todos
const getTodos = () => todos


//create todos
const createTodo = (text) => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false
  })
  saveTodos()
}

// removeTodo
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
    saveTodos()
  }
}


// toggleTodo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id)

  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo }
