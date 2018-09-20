// This is the data entered by the Team for "KPI information" (Block 1) in the 4 blocker

module.exports = (sequelize, DataTypes) => {
  const Performance = sequelize.define('Performance', {
    actual: DataTypes.FLOAT,
    level: DataTypes.INTEGER
    })

    Performance.associate = function (models) {
      Performance.belongsTo(models.User)
      Performance.belongsTo(models.Customer)
      Performance.belongsTo(models.Agreement)
      Performance.belongsTo(models.Report)
    }

  return Performance
}
