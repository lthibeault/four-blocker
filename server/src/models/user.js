const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8
   // if(!user.changed('password')){
   //    return;
   //  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
  })
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    nextLevel: DataTypes.INTEGER
  }, {
      hooks: {
        beforeCreate: hashPassword,
        // beforeUpdate: hashPassword()
        //beforeSave: hashPassword()
      }
    }
  )

  User.prototype.comparePassword =  function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  
  User.associate = function (models) {
    User.belongsTo(models.Team)
    User.belongsTo(models.Role)
  }

  return User;
}
