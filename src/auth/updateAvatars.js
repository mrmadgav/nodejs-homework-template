const Jimp = require('jimp')
const User = require('../../model/user.model')
const fs = require('fs').promises
const path = require('path')

const updateAvatars = async (req, res, next) => {
  try {
    const { id } = req.user
    const filePath = req.file.path
    fs.writeFile(filePath, function(error) {
      if (error) throw error
      fs.readFileSync(filePath, 'utf8')
    })

    const newAvatarName = `${Date.now()}-${req.file.originalname}`
    const img = await Jimp.read(filePath)
    await img
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(path.join('public/avatars', newAvatarName))
    const avatarUrl = path.normalize(path.join('public/avatars', newAvatarName))
    await User.updateOne(
      { _id: id },
      { avatarUrl }
    )

    return res.json({
      status: 'Success',
      code: 200,
      data: {
        avatarUrl,
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = updateAvatars
