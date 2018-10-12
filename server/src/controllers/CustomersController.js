const {Customer} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  async index (req, res) {
    try{
      let customers = null
      const search = req.query.search
      if (search){
        customers = await Customer.findAll({
          where: {
              'name': {[Op.like]: `%${search}%`}
              }
            })
          } else {
              customers = await Customer.findAll()
          }


      res.send(customers)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the customers.' + err
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Customer')
    try {
      const customer = await Customer.create(req.body
         // {name: req.body.name}
      )
      res.send(req.body)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the customer.' + err
        })
    }
  },
  async show (req, res) {
    try{
      // const customers = await Customer.findById(req.params.userId)
      const customers = await Customer.findAll()
      res.send(customers)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the customers.'
        })
    }
  },
  async put (req, res) {
    try {
      const customers = await Customer.update(req.body,{
      where: {
        id:req.params.customerId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the customers.'
        })
    }
  }
}
