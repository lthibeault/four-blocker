const {Report, User} = require('../models')

module.exports = {
  async index (req, res) {
    try{
      let reports = null
      const UserId = req.user.id
        reports = await Report.findAll({
          where:{
            status: "active",
            UserId: UserId
          }
        })
      res.send(reports)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the reports.'
        })
    }
  },
  async post (req, res) {
    console.log('Trying to add the Report')
    try {
      const report = await Report.create(req.body)
      res.send(report)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the report.'
        })
    }
  },
  async show (req, res) {
    try{
      // const reports = await Report.findById(req.params.userId)
      const reports = await Report.findAll()
      res.send(reports)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to fetch the reports.'
        })
    }
  },
  async put (req, res) {
    console.log(req.body)
    try {
      await Report.update({
        status: "Complete"
      },{
        where: {
           id: req.body.id
         }
       }
     )
     const newReport = await Report.create({
       month: req.body.newMonth,
       year: req.body.newYear,
       UserId: req.body.UserId,
       status: 'Active'
     })
      res.send(newReport)
    } catch (err) {
      res.status(400).send({
        error: 'An Error has occured trying to Update the reports.' + err
        })
    }
  },
  async showReportee (req, res){
    try{
      let reportee = null
      const UserId = req.user.id
      currentReport = await Report.findAll({
        where:{
          status: "active",
          UserId: UserId
        }
      })
        reportee = await Report.findAll({
          where: { month:  currentReport[0].month, year: currentReport[0].year },
          include:[{
            model: User,
             attributes: { exclude: ["password"] },
             where: {nextLevel: UserId }
           }]
        })
      res.send(reportee)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the accomplishments.' + err
        })
  }
}
}
