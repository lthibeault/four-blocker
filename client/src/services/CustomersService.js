import Api from '@/services/Api'

export default {
  index () {
    return Api().get('customers')
  },
  show (userId) {
    return Api().get(`customers/${userId}`)
  },
  post (customer) {
    return Api().post('customers', customer)
  },
  put (customer) {
    return Api().put(`customers/${customer.id}`, customer)
  }
}
