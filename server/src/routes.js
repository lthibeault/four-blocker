const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AgreementsController = require('./controllers/AgreementsController')
const CustomersController = require('./controllers/CustomersController')
const BlocksController = require('./controllers/BlocksController')
const TeamsController = require('./controllers/TeamsController')
const isAuthenticated = require('./policies/isAuthenticated')
const ReportsController = require('./controllers/ReportsController')
const UsersController = require('./controllers/UsersController')
const RolesController = require('./controllers/RolesController')


module.exports = (app) => {
  //Start Register Route
  app.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
  //end Register Route

  //Start Login Route
  app.post('/login', AuthenticationController.login)
  //end Login Route

  //Start Blocks Routes
  app.get('/blocks', BlocksController.index)
  app.get('/blocks/:blockTypeId', isAuthenticated, BlocksController.index)
  app.get('/reportee/:blockTypeId', isAuthenticated, BlocksController.show)
  app.post('/blocks', isAuthenticated, BlocksController.post)
  app.delete('/blocks/:blockId', isAuthenticated, BlocksController.delete)
  app.post('/link', isAuthenticated, BlocksController.linkBlock)
  //end Blocks Routes

    //Start Reports Routes
  app.get('/reports', isAuthenticated, ReportsController.index)
  app.get('/reportee', isAuthenticated, ReportsController.showReportee)
  //app.get('/reports/:accomplishmentId', ReportsController.show)
  app.post('/reports',isAuthenticated, ReportsController.post)
  app.put('/reports/:reportsId', ReportsController.put)
  //end Reports Routes

  //Start agreements Routes
  app.get('/agreements/:agreementId', AgreementsController.index)
  //app.get('/agreements/:agreementId', AgreementsController.show)
  app.post('/agreements', AgreementsController.post)
  app.put('/agreements/:agreementId', AgreementsController.put)
  //end agreements Routes

  //Start customers Routes
  app.get('/customers', CustomersController.index)
  //app.get('/customers/:customerName/', isAuthenticated, CustomersController.index)
  app.get('/customers/:userId', CustomersController.show)
  app.post('/customers', CustomersController.post)
  app.put('/customers/:customerId', CustomersController.put)
  //end customers Routes


  //Start teams Routes
  app.get('/teams', TeamsController.index)
  app.get('/teams/:teamId', TeamsController.show)
  app.post('/teams', TeamsController.post)
  app.put('/teams/:teamId', TeamsController.put)
  //app.get('/teams/users/:userId', TeamsController.users)
  //end teams Routes

  //Start roles Routes
  app.get('/roles', RolesController.index)
  app.get('/roles/:RoleId', RolesController.show)
  app.post('/roles', RolesController.post)
  app.put('/roles/:RoleId', RolesController.put)
  //app.get('/teams/users/:userId', TeamsController.users)
  //end roles Routes

    //Start users Routes
    app.get('/users', UsersController.index)
    app.get('/users/reportee', isAuthenticated, UsersController.showReportee)
    app.get('/users/:UserId', UsersController.show)
    app.post('/users', UsersController.post)
    app.put('/users/:userId', UsersController.put)
    //end teams Routes
}
