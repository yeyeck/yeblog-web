import Vue from 'vue'
import axios from 'axios'
// import { Cookies } from 'quasar'
import notify from '../scripts/notify'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.resolve(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    notify.danger(error.response.data, 'top')
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios
// Vue.mixin({
//   beforeCreate () {
//     const options = this.$options
//     if (options.axios) {
//       this.$axios = options.axios
//     } else if (options.parent) {
//       this.$axios = options.parent.$axios
//     }
//   }
// })

// export default function ({ app, store, ssrContext }) {
//   let instance
//   if (process.env.SERVER) {
//     instance = axios.create({
//       baseURL: process.env.SERVER_API
//     })
//   } else {
//     instance = axios.create()
//   }

//   const cookies = process.env.SERVER
//     ? Cookies.parseSSR(ssrContext)
//     : Cookies

//   instance.interceptors.request.use(config => {
//     const sessionid = cookies.get('JSESSIONID')
//     if (sessionid) {
//       config.headers.JSESSIONID = sessionid
//     }
//     return config
//   }, error => {
//     return Promise.reject(error)
//   })
//   store.axios = instance
//   app.axios = instance
// }
