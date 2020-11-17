
export function setCategories (state, payload) {
  state.categories = payload
  if (payload && payload.length > 0) {
    state.hasCategories = true
  }
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
