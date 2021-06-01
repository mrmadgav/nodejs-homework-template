const User = require('../../model/user.model')
const EmailService = require('../../services/email')

const verify = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400).json({ message: 'missing required field email' })
      return
    }

    const user = await User.findOne({ email })
    if (!user.verify) {
      const emailService = new EmailService()
      emailService.sendEmail(user.verifyToken, email)
      return res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Verification email sent',
      })
    } else {
      return res.status(400).json({
        status: 'Error',
        code: 404,
        message: 'Verification has already been passed',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = verify
