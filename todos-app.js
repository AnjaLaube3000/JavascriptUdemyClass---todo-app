// check for saved data
const todos = getSavedTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

// filter nach search input
renderTodos(todos, filters)

// filters todos
document.querySelector('#search-text').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
})

// add a new todo
document.querySelector('#new-todo').addEventListener('submit', function (e) {
  e.preventDefault()
  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoText.value,
    completed: false
  })
  saveData(todos)
  renderTodos(todos,filters)
  e.target.elements.todoText.value = ''
})

//hide todos checkbox
document.querySelector('#hide-todos').addEventListener('change', function (e){
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters)
})
