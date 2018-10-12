module.exports = (sequelize, DataTypes) => {
  const Reporter = sequelize.define('Reporter', {
      reporter: DataTypes.STRING
    })
    Reporter.associate = function (models) {
      Reporter.belongsTo(models.User)
    }
  return Reporter
}
