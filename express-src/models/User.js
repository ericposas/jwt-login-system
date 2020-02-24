import mongoose, { Schema } from 'mongoose'

const User = new mongoose.model('User', new Schema({
  username: {
    type: String,
    index: true,
    required: true,
    dropdups: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}))

export default User
