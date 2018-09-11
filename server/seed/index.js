const {sequelize,  User,  Accomplishment, Agreement, Customer, Milestone, Performance, Risk, Team, UserTeam} = require('../src/models')
const Promise = require('bluebird')
const users = require('./users.json')
const risks = require('./risks.json')
const performances = require('./performances.json')
const milestones = require('./milestones.json')
const customers = require('./customers.json')
const agreements = require('./agreements.json')
const teams = require('./teams.json')
const userTeams = require('./userTeams.json')

const accomplishments = require('./accomplishments.json')

 sequelize.sync({force:true})
   .then(async function () {
     await Promise.all(
       users.map(user => {
         User.create(user)
       })
     )
     await Promise.all(
       teams.map(team => {
         Team.create(team)
       })
     )
     await Promise.all(
       userTeams.map(userTeam => {
         UserTeam.create(userTeam)
       })
     )
     await Promise.all(
       customers.map(customer => {
         Customer.create(customer)
       })
     )
     await Promise.all(
       risks.map(risk => {
         Risk.create(risk)
       })
     )
     await Promise.all(
       performances.map(performance => {
         Performance.create(performance)
       })
     )
     await Promise.all(
       milestones.map(milestone => {
         Milestone.create(milestone)
       })
     )

     await Promise.all(
       agreements.map(agreement => {
         Agreement.create(agreement)
       })
     )
     await Promise.all(
       accomplishments.map(accomplishment => {
         Accomplishment.create(accomplishment)
       })
     )
 })
