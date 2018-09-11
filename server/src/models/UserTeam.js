module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define('UserTeam', {})

UserTeam.associate = function (models) {
  UserTeam.belongsTo(models.User)
  UserTeam.belongsTo(models.Team)
}
  return UserTeam
}
