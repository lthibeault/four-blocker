import Api from '@/services/Api'

export default {
  index () {
    return Api().get('roles')
  },
  post (role) {
    return Api().post('roles', role)
  },
  put (role) {
    return Api().put(`roles/${role.id}`, role)
  }
}
