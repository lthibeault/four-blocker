import Api from '@/services/Api'

export default {
  index () {
    return Api().get('users')
  },
  show (id) {
    return Api().get(`users/${id}`)
  },
  reportee (id) {
    return Api().get('users/reportee')
  },
  post (user) {
    return Api().post('users', user)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  }
}
