const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const AccomplishmentsController = require('./controllers/AccomplishmentsController')
const AgreementsController = require('./controllers/AgreementsController')
const CustomersController = require('./controllers/CustomersController')
const MilestonesController = require('./controllers/MilestonesController')
const PerformancesController = require('./controllers/PerformancesController')
const RisksController = require('./controllers/RisksController')
const TeamsController = require('./controllers/TeamsController')
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

  //Start Accomplishments Routes
  app.get('/accomplishments', AccomplishmentsController.index)
  app.get('/accomplishments/:accomplishmentId', AccomplishmentsController.show)
  app.post('/accomplishments', AccomplishmentsController.post)
  app.put('/accomplishments/:accomplishmentId', AccomplishmentsController.put)
  //end Accomplishments Routes

  //Start agreements Routes
  app.get('/agreements', AgreementsController.index)
  app.get('/agreements/:agreementId', AgreementsController.show)
  app.post('/agreements', AgreementsController.post)
  app.put('/agreements/:agreementId', AgreementsController.put)
  //end agreements Routes

  //Start customers Routes
  app.get('/customers', CustomersController.index)
  app.get('/customers/:customerstId', CustomersController.show)
  app.post('/customers', CustomersController.post)
  app.put('/customers/:customerId', CustomersController.put)
  //end customers Routes

  //Start milestones Routes
  app.get('/milestones', MilestonesController.index)
  app.get('/milestones/:milestoneId', MilestonesController.show)
  app.post('/milestones', MilestonesController.post)
  app.put('/milestones/:milestoneId', MilestonesController.put)
  //end milestones Routes

  //Start performances Routes
  app.get('/performances', PerformancesController.index)
  app.get('/performances/:performanceId', PerformancesController.show)
  app.post('/performances', PerformancesController.post)
  app.put('/performances/:performanceId', PerformancesController.put)
  //end performances Routes

  //Start risks Routes
  app.get('/risks', RisksController.index)
  app.get('/risks/:riskId', RisksController.show)
  app.post('/risks', RisksController.post)
  app.put('/risks/:riskId', RisksController.put)
  //end risks Routes

  //Start teams Routes
  app.get('/teams', TeamsController.index)
  app.get('/teams/:teamId', TeamsController.show)
  app.post('/teams', TeamsController.post)
  app.put('/teams/:teamId', TeamsController.put)
  app.get('/teams/users/:userId', TeamsController.users)
  //end teams Routes


//Start Bookmark Routes
  app.get('/bookmarks', /*isAuthenticated,*/ BookmarksController.index)
  app.post('/bookmarks', /*isAuthenticated,*/ BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId', /*isAuthenticated,*/ BookmarksController.delete)
//End Bookmark Routes

//Start History Routes
  app.get('/histories', /*isAuthenticated,*/ HistoriesController.index)
  app.post('/histories', /*isAuthenticated,*/ HistoriesController.post)
//End History Routes

}
