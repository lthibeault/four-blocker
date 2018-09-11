const {Agreement} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let agreements = null
      const search = req.query.search
        agreements = await Agreement.findAll({
          limit: 10
        })
      res.send(agreements)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the agreements.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Agreement')
    try {
      const agreement = await Agreement.create(req.body)
      res.send(agreement)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the agreement.'
        })
    }
  },
  async show (req, res) {
    try{
      const agreements = await Agreement.findById(req.params.agreementId)
      res.send(agreements)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the agreements.'
        })
    }
  },
  async put (req, res) {
    try {
      const agreements = await Agreement.update(req.body,{
      where: {
        id:req.params.agreementId
      }
    })
      res.send(req.body)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the agreements.'
        })
    }
  }
}
