import axios from 'axios'

const baseUrl = process.env.SERVER ? process.env.SERVER_API : '/api'
export const fetchMain = async ({ commit }) => {
  return axios.get(baseUrl + '/settings/main')
    .then((response) => {
      commit('setSiteInfo', response.data.blogSetting)
      commit('setNavigations', response.data.navigations)
      commit('setFooters', response.data.footers)
      commit('setTop10', response.data.top10)
      commit('setStatistics', response.data.statistics)
    }).catch((error) => {
      console.log(error)
    })
}
