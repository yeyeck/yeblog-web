export function setPage (state, payload) {
  state.current = payload.current
  state.totalPage = payload.totalPage
  state.list = payload.data
}
