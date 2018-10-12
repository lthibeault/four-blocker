module.exports = (sequelize, DataTypes) => {
  const BlockReport = sequelize.define('BlockReport')
    BlockReport.associate = function (models) {
      BlockReport.belongsTo(models.Block)
      BlockReport.belongsTo(models.Report)
      BlockReport.belongsTo(models.User)
      BlockReport.belongsTo(models.Customer)
      BlockReport.belongsTo(models.BlockType)
      BlockReport.belongsTo(models.Agreement)
      BlockReport.belongsTo(models.Team)
    }
  return BlockReport
}
