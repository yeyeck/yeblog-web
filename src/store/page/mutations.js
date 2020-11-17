export function setPage (state, payload) {
  state.current = payload.current
  state.totalPage = payload.totalPage
  state.list = payload.data
}

export function setCurrent (state, payload) {
  state.current = payload
}
