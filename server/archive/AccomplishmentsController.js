const {Accomplishment, Customer, User, Report, Reporter} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try{
      let accomplishments = null
      const UserId = req.user.id
        accomplishments = await Accomplishment.findAll({
          include:[{
            model: Customer
          },{
            model: User,
            where: { id: UserId}
          },{
            model:Report,
            where: { status: "Active" }
          }
        ]
        }).map(accomplishments => accomplishments.toJSON())
           .map(accomplishments => _.extend(
             {
               customerName: accomplishments.Customer.name,
               userFirst: accomplishments.User.first,
               userLast: accomplishments.User.last
             }, accomplishments))
      res.send(accomplishments)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the accomplishments.' + err
        })
    }
  },
  
  async post (req, res) {
    console.log('Trying to add the Accomplishment')
    try {
      req.body.UserId = req.user.id
      const accomplishment = await Accomplishment.create(req.body)
      res.send(accomplishment)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the accomplishment.' + err
        })
    }
  },
  async show (req, res) {
    try{
      const accomplishments = await Accomplishment.findById(req.params.accomplishmentId)
      res.send(accomplishments)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the accomplishments.'
        })
    }
  },
  async put (req, res) {
    try {
      const accomplishments = await Accomplishment.update(req.body,{
      where: {
        id:req.params.accomplishmentId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the accomplishments.'
        })
    }
  },
  async delete (req, res) {
    try{
      //const UserId = req.user.id
      const {accomplishmentId} = req.params

      const accomplishment = await Accomplishment.findOne({
        where: {
          id: accomplishmentId
        }
      })
      if (!accomplishment){
        return res.status(403).send({

          error: 'You do not have access to this accomplishment'
        })
      }
      await accomplishment.destroy()
      res.send(accomplishment)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to delete the accomplishment.' + err
        })
    }
   }
}
