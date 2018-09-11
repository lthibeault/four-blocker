module.exports = (sequelize, DataTypes) => {
  const Accomplishment = sequelize.define('Accomplishment', {
    description: DataTypes.STRING,
    level: DataTypes.INTEGER
    })

    Accomplishment.associate = function (models) {
      Accomplishment.belongsTo(models.User)
      Accomplishment.belongsTo(models.Customer)
    }

  return Accomplishment
}
