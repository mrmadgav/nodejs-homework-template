const express = require('express')
const upload = require('../helpers/upload')

const router = express.Router()

const { signup, loginUser, validTokenUser, logout, updateAvatars, verificateToken, verify } = require('../src/index')

router.post('/signup', signup)

router.post('/login', loginUser)

router.post('/logout', validTokenUser, logout)

router.patch('/avatars', validTokenUser, upload.single('avatar'), updateAvatars)

router.get('/verify/:verificationToken', verificateToken)

router.post('/verify', verify)

module.exports = router
