module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define('Milestone', {
    description: DataTypes.STRING,
    target: DataTypes.STRING,
    level: DataTypes.INTEGER
    })
    Milestone.associate = function (models) {
      Milestone.belongsTo(models.User)
      Milestone.belongsTo(models.Customer)
    }


  return Milestone
}
