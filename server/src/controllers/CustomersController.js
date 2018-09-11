const {Customer} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let customers = null
      const search = req.query.search
        customers = await Customer.findAll({
          limit: 10
        })
      res.send(customers)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the customers.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Customer')
    try {
      const customer = await Customer.create(req.body)
      res.send(customer)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the customer.'
        })
    }
  },
  async show (req, res) {
    try{
      const customers = await Customer.findById(req.params.customerId)
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
