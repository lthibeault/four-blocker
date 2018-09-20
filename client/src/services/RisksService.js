import Api from '@/services/Api'

export default {
  index () {
    return Api().get('risks')
  },
  post (risk) {
    return Api().post('risks', risk)
  },
  put (risk) {
    return Api().put(`risks/${risk.id}`, risk)
  },
  delete (id) {
    return Api().delete(`risks/${id}`)
  }
}
