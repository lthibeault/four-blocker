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
const ReportsController = require('./controllers/ReportsController')
const UsersController = require('./controllers/UsersController')

module.exports = (app) => {
  //Start Register Route
  app.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
  //end Register Route

  //Start Login Route
  app.post('/login', AuthenticationController.login)
  //end Login Route

  //Start Accomplishments Routes
  app.get('/accomplishments', isAuthenticated, AccomplishmentsController.index)
  app.get('/accomplishments/:accomplishmentId', isAuthenticated, AccomplishmentsController.show)
  app.post('/accomplishments', isAuthenticated, AccomplishmentsController.post)
  app.put('/accomplishments/:accomplishmentId', isAuthenticated,  AccomplishmentsController.put)
  app.put('/accomplishments/', isAuthenticated,  AccomplishmentsController.put)
  app.delete('/accomplishments/:accomplishmentId', /*isAuthenticated,*/ AccomplishmentsController.delete)
  //end Accomplishments Routes

  //Start Reports Routes
  app.get('/reports', isAuthenticated, ReportsController.index)
  app.get('/reports/:accomplishmentId', ReportsController.show)
  app.post('/reports', ReportsController.post)
  app.put('/reports/:reportsId', ReportsController.put)
  //end Reports Routes

  //Start agreements Routes
  app.get('/agreements/:agreementId', AgreementsController.index)
  //app.get('/agreements/:agreementId', AgreementsController.show)
  app.post('/agreements', AgreementsController.post)
  app.put('/agreements/:agreementId', AgreementsController.put)
  //end agreements Routes

  //Start customers Routes
  app.get('/customers', isAuthenticated, CustomersController.index)
  app.get('/customers/:userId', CustomersController.show)
  app.post('/customers', CustomersController.post)
  app.put('/customers/:customerId', CustomersController.put)
  //end customers Routes

  //Start milestones Routes
  app.get('/milestones', isAuthenticated, MilestonesController.index)
  app.get('/milestones/:milestoneId', isAuthenticated, MilestonesController.show)
  app.post('/milestones', isAuthenticated, MilestonesController.post)
  app.put('/milestones/:milestoneId', MilestonesController.put)
  app.delete('/milestones/:milestoneId', /*isAuthenticated,*/ MilestonesController.delete)
  //end milestones Routes

  //Start performances Routes
  app.get('/performances', isAuthenticated, PerformancesController.index)
  app.get('/performances/:performanceId', isAuthenticated, PerformancesController.show)
  app.post('/performances', isAuthenticated, PerformancesController.post)
  app.put('/performances/:performanceId', isAuthenticated, PerformancesController.put)
  app.put('/performances/', isAuthenticated, PerformancesController.put)

  app.delete('/performances/:performanceId', /*isAuthenticated,*/ PerformancesController.delete)
  //end performances Routes

  //Start risks Routes
  app.get('/risks', isAuthenticated, RisksController.index)
  app.get('/risks/:riskId', isAuthenticated, RisksController.show)
  app.post('/risks', isAuthenticated, RisksController.post)
  app.put('/risks/:riskId', isAuthenticated, RisksController.put)
  app.delete('/risks/:riskId', /*isAuthenticated,*/ RisksController.delete)
  //end risks Routes

  //Start teams Routes
  app.get('/teams', TeamsController.index)
  app.get('/teams/:teamId', TeamsController.show)
  app.post('/teams', TeamsController.post)
  app.put('/teams/:teamId', TeamsController.put)
  //app.get('/teams/users/:userId', TeamsController.users)
  //end teams Routes

    //Start users Routes
    app.get('/users', UsersController.index)
    app.get('/users/:userId', UsersController.show)
    app.post('/users', UsersController.post)
    app.put('/users/:userId', UsersController.put)
    //end teams Routes
}
