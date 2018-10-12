module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define('Block', {
    entry: DataTypes.STRING,
    target: DataTypes.STRING
    })

    Block.associate = function (models) {
      Block.belongsTo(models.User)
    }
  return Block
}
