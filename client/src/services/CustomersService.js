import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('customers', {
      params: {
        search: search
      }
    })
  },
  show (userId) {
    return Api().get(`customers/${userId}`)
  },
  post (customer) {
    return Api().post('customers', {name: customer})
  },
  put (customer) {
    return Api().put(`customers/${customer.id}`, customer)
  }
}
