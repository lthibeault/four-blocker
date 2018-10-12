const {Role, User} = require('../models')
const _ = require('lodash')

module.exports = {
  async users (req, res) {
    try{
      let userRole = null
      // const UserId = req.user.id
       const UserId = 1

//// TODO: Add if Statement to detect either User Information, or Role Information.
//// (Or just use to show entire Role. May need to adjust the User & JWT to include Role name)
      userRole = await UserRole.findAll({
        where:{RoleId: UserId},
        include:[
          {model: Role},
          {model: User}
      ]
     }).map(userRole => userRole.toJSON())
        .map(userRole => _.extend(
          {
            roleName: userRole.Role.name
          }, userRole.User))

    res.send(userRole)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the Role.' + err
        })
    }
  },
  async index (req, res) {
    try{
      let roles = null
        roles = await Role.findAll({
        })
      res.send(roles)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the roles.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Role')
    try {
      const role = await Role.create(req.body)
      res.send(role)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the role.'
        })
    }
  },
  async show (req, res) {
    try{
      const roles = await Role.findById(req.params.roleId)
      res.send(roles)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the roles.'
        })
    }
  },
  async put (req, res) {
    try {
      const roles = await Role.update(req.body,{
      where: {
        id:req.params.roleId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the roles.'
        })
    }
  }
}
