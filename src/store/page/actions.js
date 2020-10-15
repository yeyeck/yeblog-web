import axios from 'axios'

const baseUrl = process.env.SERVER ? process.env.SERVER_API : '/api'
export const fetchData = async ({ commit }, payload) => {
  const page = payload.page
  let requestUrl = baseUrl + '/article/page/' + page

  const categoryId = payload.categoryId
  if (categoryId !== -1) {
    requestUrl = baseUrl + '/article/category/' + categoryId + '/page/' + page
  }
  return axios.get(requestUrl)
    .then((response) => {
      commit('setPage', response.data)
    }).catch((error) => {
      console.log(error)
    })
}
