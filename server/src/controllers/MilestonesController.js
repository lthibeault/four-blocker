const {Milestone, Customer, User, Report} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try{
      let milestones = null
      const UserId = req.user.id
        milestones = await Milestone.findAll({
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
        }).map(milestones => milestones.toJSON())
           .map(milestones => _.extend(
             {
               customerName: milestones.Customer.name,
               userFirst: milestones.User.first,
               userLast: milestones.User.last,
               description: milestones.description,
               target:milestones.description,
               milestoneId: milestones.id
             }, milestones.Agreement))
      res.send(milestones)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the milestones.' + err
        })
    }
  },
  async post (req, res) {

    console.log('Trying to add the milestone')
    try {
      req.body.UserId = req.user.id
      const milestone = await Milestone.create(req.body)
      res.send(milestone)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the milestone.' + err
        })
    }
  },
  async show (req, res) {
    try{
    const milestones = await Milestone.findById(req.params.milestoneId)
      res.send(milestones)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the milestones.'
        })
    }
  },
  async put (req, res) {
    try {
      const milestones = await Milestone.update(req.body,{
      where: {
        id:req.params.milestoneId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the milestones.'
        })
    }
  },
  async delete (req, res) {
    try{
      //const UserId = req.user.id
      const {milestoneId} = req.params
      const milestone = await Milestone.findOne({
        where: {
          id: milestoneId
        }
      })
      if (!milestone){
        return res.status(403).send({
          error: 'You do not have access to this bookmark'
        })
      }
      await milestone.destroy()
      res.send(milestone)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to delete the bookmark.'
        })
    }
   }
}
