module.exports = (sequelize, DataTypes) => {
  const BlockType = sequelize.define('BlockType', {
    name: DataTypes.STRING
    })

  return BlockType
}
