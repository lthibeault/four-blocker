import Api from '@/services/Api'

export default {
  index (id) {
    return Api().get(`agreements/${id}`)
  },
  post (agreement) {
    return Api().post('agreements', agreement)
  },
  put (agreement) {
    return Api().put(`agreements/${agreement.id}`, agreement)
  }
}
