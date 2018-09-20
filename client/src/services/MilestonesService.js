import Api from '@/services/Api'

export default {
  index () {
    return Api().get('milestones')
  },
  post (milestone) {
    return Api().post('milestones', milestone)
  },
  put (milestone) {
    return Api().put(`milestones/${milestone.id}`, milestone)
  },
  delete (id) {
    return Api().delete(`milestones/${id}`)
  }
}
