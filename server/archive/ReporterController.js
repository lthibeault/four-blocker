const {Reporter, User} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let reports = null
        reports = await Reporter.findAll({
          where:{
            reporter: 4
          },
          include:[{
            model: User
          }
        ]
        })
      res.send(reports)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the reports.' + err
        })
    }
  }
}
