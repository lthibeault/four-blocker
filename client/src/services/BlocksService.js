import Api from '@/services/Api'

export default {
  index (pageId) {
    return Api().get(`blocks/${pageId}`)
  },
  reportee (pageId) {
    return Api().get(`reportee/${pageId}`)
  },
  link (item) {
    return Api().post('link', item)
  },
  post (newEntry) {
    return Api().post('blocks', newEntry)
  },
  delete (blockId) {
    return Api().delete(`blocks/${blockId}`)
  }
}
