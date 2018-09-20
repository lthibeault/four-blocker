module.exports = (sequelize, DataTypes) => {
  const Reporter = sequelize.define('Reporter', {
      person: DataTypes.INTEGER
    })
    Reporter.associate = function (models) {
      Reporter.belongsTo(models.User)
    }
  return Reporter
}
