module.exports = (sequelize, DataTypes) => {
  const Risk = sequelize.define('Risk', {
    description: DataTypes.STRING,
    level: DataTypes.INTEGER
    })

    Risk.associate = function (models) {
      Risk.belongsTo(models.User)
      Risk.belongsTo(models.Customer)
    }

  return Risk
}
