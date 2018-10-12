const {Bookmark, Song, User} = require('../models')
const _ = require('lodash')
module.exports = {

  async index (req, res) {
    try{
      const UserId = req.user.id
      const {SongId} = req.query
      const where = {
        UserID: UserId
      }
      if (SongId) {
        where.SongId = SongId
      }
      const bookmarks = await Bookmark.findAll({
         where:where,
         include:[{
           model: Song
         }
       ]
     })
     .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {
            bookmarkId: bookmark.id
          }, bookmark.Song))
    res.send(bookmarks)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the bookmark.'
        })
    }
  },
  async post (req, res) {
    try{
      const UserId = req.user.id
      console.log('UserID', UserId)
      const {SongId} = req.body
      const bookmark = await Bookmark.findOne({
         where:{
           SongId: SongId,
           UserId: UserId
         }
       })
       if (bookmark){
        return res.status(400).send({
             error: 'You have already added this bookmark.'
             })
       }
    const newBookmark = await Bookmark.create({SongId: SongId, UserId: UserId})
      res.send(newBookmark)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the bookmark.'
        })
    }
  },
  async delete (req, res) {
    try{
      const UserId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: UserId
        }
      })
      if (!bookmark){
        return res.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to delete the bookmark.'
        })
    }
   }

}
