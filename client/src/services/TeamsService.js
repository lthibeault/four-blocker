import Api from '@/services/Api'

export default {
  index () {
    return Api().get('teams')
  },
  post (team) {
    return Api().post('teams', team)
  },
  put (team) {
    return Api().put(`teams/${team.id}`, team)
  }
}
