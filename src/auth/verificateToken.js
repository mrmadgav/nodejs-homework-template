const User = require('../../model/user.model')

const verificateToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ verifyToken: req.params.verificationToken })
    if (user) {
      await User.findOneAndUpdate(
        { _id: user._id },
        { verifyToken: null, verify: true },
      )
      return res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'Verification successful!',
      })
    }

    return res.status(404).json({
      status: 'Error',
      code: 404,
      message: 'User not found',
    })
  } catch (e) {
    next(e)
  }
}

module.exports = verificateToken
