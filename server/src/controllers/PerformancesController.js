const {Milestone} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let performances = null
      const search = req.query.search
        performances = await Milestone.findAll({
          limit: 10
        })
      res.send(performances)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the performances.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Milestone')
    try {
      const milestone = await Milestone.create(req.body)
      res.send(milestone)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the milestone.'
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
  }
}
