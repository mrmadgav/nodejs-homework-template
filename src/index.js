const getContact = require('./contacts/getContact')
const findContactById = require('./contacts/findContactById')
const deleteContact = require('./contacts/deleteContact')
const updateContact = require('./contacts/updateContact')
const addContact = require('./contacts/addContact')
const signup = require('./auth/signup')
const loginUser = require('./auth/login')
const validTokenUser = require('./auth/validationToken')
const logout = require('./auth/logout')
const updateAvatars = require('./auth/updateAvatars')
const verificateToken = require('./auth/verificateToken')
const verify = require('./auth/verify')

module.exports = {
  getContact,
  findContactById,
  deleteContact,
  updateContact,
  addContact,
  loginUser,
  signup,
  validTokenUser,
  logout,
  updateAvatars,
  verificateToken,
  verify,
}
