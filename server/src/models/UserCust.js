module.exports = (sequelize, DataTypes) => {
  const UserCust = sequelize.define('UserCust')
    UserCust.associate = function (models) {
      UserCust.belongsTo(models.User)
      UserCust.belongsTo(models.Customer)
    }
  return UserCust
}
