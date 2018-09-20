import Api from '@/services/Api'

export default {
  index () {
    return Api().get('accomplishments')
  },
  show (songID) {
    return Api().get(`songs/${songID}`)
  },
  post (song) {
    return Api().post('songs', song)
  },
  put (song) {
    return Api().put(`songs/${song.id}`, song)
  }
}
