// Set up filters default object
const filters = {
  searchText: '',
  hideCompleted: false
}

// getFilters
const getFilters = () => filters

// setFilters
// const setFilters = (updates) => {
//   if (typeof updates.searchText === 'string') {
//     filters.searchText = updates.searchText
//   }
//   if (typeof updates.hideCompleted === 'boolean') {
//     filters.hideCompleted = updates.hideCompleted
//   }
// }

// setFilters destructured
const setFilters = ({ searchText, hideCompleted }) => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText
  }
  if (typeof hideCompleted === 'boolean') {
    filters.hideCompleted = hideCompleted
  }
}


// Make sure to set up the exports
export { getFilters, setFilters }

