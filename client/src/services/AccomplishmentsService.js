import Api from '@/services/Api'

export default {
  index () {
    return Api().get('accomplishments')
  },
  post (accomplishment) {
    return Api().post('accomplishments', accomplishment)
  },
  put (accomplishment) {
    return Api().put(`accomplishments/${accomplishment.id}`, accomplishment)
  },
  delete (id) {
    return Api().delete(`accomplishments/${id}`)
  }
}
