import Api from '@/services/Api'

export default {
  index () {
    return Api().get('performances')
  },
  post (performance) {
    return Api().post('performances', performance)
  },
  put (performance) {
    return Api().put('performances/', performance)
  },
  delete (id) {
    return Api().delete(`performances/${id}`)
  }
}
