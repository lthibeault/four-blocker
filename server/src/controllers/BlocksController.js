const {Block, Customer, User, Report, Agreement, BlockType, BlockReport} = require('../models')
const _ = require('lodash')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {

  async index (req, res) {
    try{
      let blocks = null
       const UserId = req.user.id
        blocks = await BlockReport.findAll({
          include:[{
            model: Customer
          },{
            model: User,
             where: { id: UserId},
            attributes: {exclude:'password'}

          },
          {
            model: BlockType,
            where: {name: req.params.blockTypeId}
          },
          {
            model: Agreement,
          },
          {
            model:Report,
            where: { status: "Active" }
          },
          {model: Block,
          include:[ {model: User}]}
        ]
         })
      res.send(blocks)
    } catch(err){
      console.log(err)
      res.status(400).send({
        error: 'An Error has occured trying to fetch the accomplishments.' + err
        })
      }
    },
    async show (req, res) {
      try{
        const UserId = req.user.id
        let blocks = null
        report = await Report.findAll({
          where:{
            status: "active",
            UserId: UserId
          }
        })

         const myBlocks = await BlockReport.findAll({
           include:[{model: Report,
           where:{
             UserId: UserId, Status: "Active"
           }}]
         })

         const reportsToShow = await BlockReport.findAll({
           include:[
             {model: Report,
               where:{
                       [Op.and]:
                         [
                           { month: report[0].month },
                           {year: report[0].year},
                           {status: 'Complete'}
                         ]
                       }},
         {model: User,
           attributes: {exclude:'password'},
          where:{
            nextLevel: UserId
          }},
          {model:Block,
             include:[
             {model:User,attributes: {exclude:'password'},}
          ]},
          {model:Agreement},
          {model: Customer},
          {
            model: BlockType,
            where: {name: req.params.blockTypeId}
           }
        ]
         })
      res.send(reportsToShow)
      } catch(err){
        console.log(err)
        res.status(400).send({
          error: 'An Error has occured trying to fetch the accomplishments.' + err
          })
        }
      },
  async post (req, res) {
    console.log('Trying to add the Item')
    try {
      const UserId = req.user.id
      const data = req.body
      const estimate = data.estimate
      const target = data.target
      let insert = {
        entry: data.entry,
        UserId: UserId
      }
      if (estimate)
      {
        insert =  {
          entry: data.entry,
          UserId: UserId,
          target: estimate
        }
      }

      const newBlock = await Block.create(insert)
      let linkInsert = {
        BlockId: newBlock.id,
        ReportId: data.reportId,
        UserId: UserId,
        CustomerId: data.customerId,
        BlockTypeId: data.blockTypeId
      }
      if (target) {
        linkInsert =   {
          BlockId: newBlock.id,
          ReportId: data.reportId,
          UserId: UserId,
          CustomerId: data.customerId,
          BlockTypeId: data.blockTypeId,
          AgreementId: data.target.id
        }
      }

      const blockLink = BlockReport.create(linkInsert)
      res.send(data)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the Block data.' + err
        })
    }
  },
  async linkBlock (req, res) {
    console.log('Trying to add the Item')
    try {
      const UserId = req.user.id
      const data = req.body

      const blockLink = BlockReport.create(data)
      res.send(blockLink)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the Block data.' + err
        })
    }
  },
  async delete (req, res) {
    console.log('Trying to delete the Item')
    try {
      const UserId = req.user.id
      const data = req.params.blockId
      block = await BlockReport.findOne({
        where: {
          id: data,
          UserId: UserId
        }
      })
      if (!block) {
        return res.status(403).send({
          error: 'You do not have access to this Block Data'
        })
      }
      await BlockReport.destroy({
        where: {
          id: data,
          UserId: UserId
        }})
      //const blockLink = BlockReport.create(data)
      res.send(block)
    } catch(err){
      res.status(400).send({
        error: 'An Error has occured trying to create the Block data.' + err
        })
    }
  }
}
