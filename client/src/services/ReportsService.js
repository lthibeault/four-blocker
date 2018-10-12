import Api from '@/services/Api'

export default {
  index () {
    return Api().get('reports')
  },
  post (report) {
    return Api().post('reports', report)
  },
  put (report) {
    return Api().put(`reports/${report.id}`, report)
  },
  reportee () {
    return Api().get('reportee')
  }
}
