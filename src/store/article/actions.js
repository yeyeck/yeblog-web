import axios from 'axios'

const baseUrl = process.env.SERVER ? process.env.SERVER_API : '/api'
export const fetchArticle = async ({ commit }, id) => {
  return axios.get(baseUrl + '/article/html/' + id)
    .then((response) => {
      commit('setArticle', response.data.article)
      commit('setPrevious', response.data.previous)
      commit('setNext', response.data.next)
      commit('setComments', response.data.comments)
    }).catch((error) => {
      console.log(error)
    })
}
