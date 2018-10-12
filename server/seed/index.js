const {sequelize,  User,  Agreement, Customer, Team, Role, Report, BlockType, Block, BlockReport, UserCustomer} = require('../src/models')
const Promise = require('bluebird')
const users = require('./users.json')
// const risks = require('./risks.json')
// const performances = require('./performances.json')
// const milestones = require('./milestones.json')
const customers = require('./customers.json')
const agreements = require('./agreements.json')
const teams = require('./teams.json')
const roles = require('./roles.json')
const reports = require('./reports.json')
const blockReports = require('./blockReports.json')
const userCustomer = require('./userCusts.json')
const blockTypes = require('./blockTypes.json')
const blocks = require('./blocks.json')

// const accomplishments = require('./accomplishments.json')

 sequelize.sync({force:true})

   .then(async function () {

     await Promise.all(
       customers.map(customer => {
         Customer.create(customer)
       })
     )

     await Promise.all(
       teams.map(team => {
         Team.create(team)
       })
     )
     await Promise.all(
       blockTypes.map(blockType => {
         BlockType.create(blockType)
       })
     )
     await Promise.all(
       roles.map(role => {
         Role.create(role)
       })
     )

     await Promise.all(
       users.map(user => {
         User.create(user)
       })
     )
     await Promise.all(
       userCustomers.map(userCustomer => {
         UserCustomer.create(userCustomer)
       })
     )
     await Promise.all(
       reports.map(report => {
         Report.create(report)
       })
     )
     await Promise.all(
       agreements.map(agreement => {
         Agreement.create(agreement)
       })
     )
     await Promise.all(
       blocks.map(block => {
         Block.create(block)
       })
     )
     await Promise.all(
       blockReports.map(blockReport => {
         BlockReport.create(blockReport)
       })
     )
 })
