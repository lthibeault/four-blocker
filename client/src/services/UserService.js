import Api from '@/services/Api'

export default {
  index () {
    return Api().get('users')
  },
  post (user) {
    return Api().post('users', user)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  }
}
