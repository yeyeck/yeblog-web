
export function setCategories (state, payload) {
  state.categories = payload
}

export function setCurrentCate (state, payload) {
  state.categories.forEach(category => {
    if (category.id === parseInt(payload)) {
      state.currentCate = category
    }
  })
}

export function setFriends (state, payload) {
  state.friends = payload
}
