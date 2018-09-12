const {Accomplishment, Customer, User} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try{
      let accomplishments = null
      const search = req.query.search
        accomplishments = await Accomplishment.findAll({
          include:[{
            model: Customer
          },{
            model: User
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
      const accomplishment = await Accomplishment.create(req.body)
      res.send(accomplishment)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the accomplishment.'
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
  }
}
