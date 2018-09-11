const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {
  //Start Register Route
  app.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
  //end Register Route

  //Start Login Route
  app.post('/login', AuthenticationController.login)
  //end Login Route

  //Start Songs Routes
  app.get('/songs', SongsController.index)
  app.get('/songs/:songId', SongsController.show)
  app.post('/songs', SongsController.post)
  app.put('/songs/:songId', SongsController.put)
  //end Songs Routes

//Start Bookmark Routes
  app.get('/bookmarks', isAuthenticated, BookmarksController.index)
  app.post('/bookmarks',isAuthenticated, BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId', isAuthenticated, BookmarksController.delete)
//End Bookmark Routes

//Start History Routes
  app.get('/histories', isAuthenticated, HistoriesController.index)
  app.post('/histories',isAuthenticated, HistoriesController.post)
//End History Routes


}
