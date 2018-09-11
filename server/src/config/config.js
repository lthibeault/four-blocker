module.exports = {
  port: process.env.PORT || 8081,
  db :{
    database:process.env.DB_NAME || 'tabtracker',
    user:process.env.DB_USER || 'root',
    password:process.env.DB_PASS || 'root',
    options:{
      dialect: 'mysql',
      host:process.env.HOST || 'localhost',
      //storage: './tabtracker.sqlite',
      port: 3306,
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret : process.env.JWT_SECRET ||'secret'
  }
}
