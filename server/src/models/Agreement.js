// This file Identifies and builds the KPI's used to select.

module.exports = (sequelize, DataTypes) => {
  const Agreement = sequelize.define('Agreement', {
    kpi: DataTypes.STRING,
    target: DataTypes.FLOAT
    })
    Agreement.associate = function (models) {
      Agreement.belongsTo(models.Customer)
    }

  return Agreement
}
