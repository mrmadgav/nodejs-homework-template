const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const gravatar = require('gravatar')

const UsersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

UsersSchema.pre('save', next => {
  if (this.password && (this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
      bcrypt.hash(this.password, salt, (_err, hash) => {
        this.password = hash
        next()
      })
    })
  } else return next()
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
