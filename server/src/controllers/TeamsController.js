const {Team, UserTeam, User} = require('../models')
const _ = require('lodash')

module.exports = {
  async users (req, res) {
    try{
      let userTeam = null
      // const UserId = req.user.id
       const UserId = 1

//// TODO: Add if Statement to detect either User Information, or Team Information.
//// (Or just use to show entire Team. May need to adjust the User & JWT to include Team name)
      userTeam = await UserTeam.findAll({
        where:{TeamId: UserId},
        include:[
          {model: Team},
          {model: User}
      ]
     }).map(userTeam => userTeam.toJSON())
        .map(userTeam => _.extend(
          {
            teamName: userTeam.Team.name
          }, userTeam.User))

    res.send(userTeam)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the Team.' + err
        })
    }
  },
  async index (req, res) {
    try{
      let teams = null
      const search = req.query.search
        teams = await Team.findAll({
          limit: 10
        })
      res.send(teams)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the teams.'
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
      const teams = await Team.findById(req.params.teamId)
      res.send(teams)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the teams.'
        })
    }
  },
  async put (req, res) {
    try {
      const teams = await Team.update(req.body,{
      where: {
        id:req.params.teamId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the teams.'
        })
    }
  }
}
