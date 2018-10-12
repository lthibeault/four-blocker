const {Performance, Customer, User, Agreement, Report} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try{
      let performances = null
      const UserId = req.user.id
      const search = req.query.search
        performances = await Performance.findAll({
          include:[{
            model: Customer
          },{
            model: User,
            where: { id: UserId}
          },
          {
            model: Agreement
          },{
            model:Report,
            where: { status: "Active" }
          }
        ]
        }).map(performances => performances.toJSON())
           .map(performances => _.extend(
             {
               customerName: performances.Customer.name,
               userFirst: performances.User.first,
               userLast: performances.User.last,
               actual: performances.actual,
               performanceId: performances.id,
               reportMonth:performances.Report.month,
               reportYear:performances.Report.year
             }, performances.Agreement))
      res.send(performances)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the performances.' + err
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Performance')
    try {
      const performance = await Performance.create(req.body)
      res.send(performance)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the performance.'
        })
    }
  },
  async show (req, res) {
    try{
    const performances = await Performance.findById(req.params.performanceId)
      res.send(performances)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the performances.'
        })
    }
  },
  async put (req, res) {
    try {
    //const send = null
    // req.body.forEach(function(element) {
    //   Performance.findOne({
    //     where: {
    //       id: element.performanceId
    //     }
    //   }).then(function(element){
    //     return element.update({level: 3})
    //   }).then(res.send(element))
    //
    // })
  } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the performances.' + err
        })
    }
  },
  async delete (req, res) {
    try{
      //const UserId = req.user.id
      const {performanceId} = req.params
      const performance = await Performance.findOne({
        where: {
          id: performanceId
        }
      })
      if (!performance){
        return res.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await performance.destroy()
      res.send(performance)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to delete the bookmark.'
        })
    }
   }
}
