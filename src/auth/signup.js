const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const EmailService = require('../../services/email')
const Users = require('../../model/user.model')
const handlerError = require('../../middlewares/notFound')

function signup(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(422).json({ message: 'Missing required fields' })
      return
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) handlerError(res, err)
      const verifyToken = uuidv4()
      const newUsers = new Users({
        email,
        password: hash,
        verifyToken
      })
      console.log(newUsers)
      Users.findOne({ email })
        .then(data => {
          if (data) {
            res.status(409).json({ message: 'Email in use' })
            return
          }
          const emailService = new EmailService()
          emailService.sendEmail(verifyToken, email)
          newUsers
            .save()
            .then(data => res.status(200).json({ data }))
            .catch(err => handlerError(res, err))
        })
        .catch(err => {
          console.log('err', err)
          handlerError(res, err)
        })
    })
  } catch (e) {
    next(e)
  }
}

module.exports = signup
