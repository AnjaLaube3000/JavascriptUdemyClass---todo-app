
// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
// import  { setFilters, getFilters } from './filters'
import { getTodos, createTodos, removeTodo, toggleTodo } from './todos'

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage

console.log(getTodos())
removeTodo('37250ffb-59db-4931-bf70-64955d17d3e0')
console.log(getTodos())
