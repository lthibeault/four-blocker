const {Risk, Customer, User, Report} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try{
      let risks = null
      const UserId = req.user.id
        risks = await Risk.findAll({
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
        }).map(risks => risks.toJSON())
           .map(risks => _.extend(
             {
               customerName: risks.Customer.name,
               userFirst: risks.User.first,
               userLast: risks.User.last
             }, risks))
      res.send(risks)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the risks.' + err
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Risk')
    try {
      req.body.UserId = req.user.id
      const risk = await Risk.create(req.body)
      res.send(risk)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the risk.'+ err
        })
    }
  },
  async show (req, res) {
    try{
      const risks = await Risk.findById(req.params.riskId)
      res.send(risks)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the risks.'
        })
    }
  },
  async put (req, res) {
    try {
      const risks = await Risk.update(req.body,{
      where: {
        id:req.params.riskId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the risks.'
        })
    }
  },
  async delete (req, res) {
    try{
      //const UserId = req.user.id
      const {riskId} = req.params

      const risk = await Risk.findOne({
        where: {
          id: riskId
        }
      })
      if (!risk){
        return res.status(403).send({

          error: 'You do not have access to this risk'
        })
      }
      await risk.destroy()
      res.send(risk)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to delete the risk.' + err
        })
    }
   }
}
