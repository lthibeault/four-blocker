module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    status: DataTypes.STRING,
      month: DataTypes.INTEGER,
      year: DataTypes.INTEGER
    })
    Report.associate = function (models) {
      Report.belongsTo(models.User)
    }
  return Report
}
