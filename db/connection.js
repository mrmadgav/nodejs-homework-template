const mongoose = require('mongoose')

function dbConnection() {
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log('err :', err)
        process.exit(1)
      }

      if (!err) {
        console.log('Database connection successful!')
      }
    }
  )
}

module.exports = dbConnection
