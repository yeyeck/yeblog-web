import axios from 'axios'

const baseUrl = process.env.SERVER ? process.env.SERVER_API : '/api'
export const fetchData = async ({ commit }, id) => {
  return axios.get(baseUrl + '/category')
    .then((response) => {
      commit('setCategories', response.data)
      response.data.forEach(category => {
        if (category.id === parseInt(id)) {
          commit('setCurrentCate', category)
        }
      })
    }).catch((error) => {
      console.log('qqq' + error)
    })
}
