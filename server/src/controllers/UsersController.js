const {User, Team, Role, Reporter} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try{
      let users = null
        users = await User.findAll({
          include:[
            {model: Team},
            {model: Role}
        ]
        })
        .map(users => users.toJSON())
           .map(users => _.extend(
             {
               first: users.first,
               last: users.last,
               fullName: users.first + ' ' + users.last,
               roleId: users.Role.id,
               role: users.Role.name,
               id: users.id,
               email: users.email,
               nextLevel: users.nextLevel
             }, users))
      res.send(users)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the users.' + err
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Team')
    try {
      const team = await Team.create(req.body)
      res.send(team)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the team.'
        })
    }
  },
  async show (req, res) {
    try{
      const user = await User.findById(req.params.UserId,{
         attributes: { exclude: ["password"] },
         include:[
           {model: Team},
           {model: Role}
         ]
        }
      )
      res.send(user)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the teams.'
        })
    }
  },
  async put (req, res) {
    try {
      const user = await User.update(req.body,{
      where: {
        id:req.params.userId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the teams.'
        })
    }
  },
  async showReportee (req, res){
    try{
      let reportee = null
      const UserId = req.user.id
      reportee = await User.findAll({
          where: {nextLevel: UserId },
          attributes: { exclude: ["password"] },
          include:[{model: Role}]
        })
      res.send(reportee)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the accomplishments.' + err
        })
      }
  }

}
