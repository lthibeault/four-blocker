const {Risk} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let risks = null
      const search = req.query.search
        risks = await Risk.findAll({
          limit: 10
        })
      res.send(risks)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the risks.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Risk')
    try {
      const risk = await Risk.create(req.body)
      res.send(risk)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the risk.'
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
  }
}
