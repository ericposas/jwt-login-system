import User from './models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwtOptions from './utils/jwtOptions'

const controller = {

  viewUsers: (req, res) => {
    User.find({})
      .then(results => res.send({ success: results }))
      .catch(err => res.send({ error: err.errmsg }))
  },

  register: (req, res) => {

    if (req.body.username && req.body.email && req.body.password) {
      const insertUser = hash => {
        User({
          username: req.body.username,
          email: req.body.email,
          password: hash
        })
        .save()
        .then(doc => res.send({ success: 'successfuly registered!' }))
        .catch(err => res.send({ error: err.errmsg }))
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => insertUser(hash))
      })
    } else {
      res.send({ error: 'incorrect params sent' })
    }

  },

  login: (req, res) => {

    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email })
        .then(doc => {
          bcrypt.compare(req.body.password, doc.password, (err, match) => {
            if (match && !err) {
              let user = Object.assign({}, doc._doc)
              res.send({
                success: {
                  user: user,
                  token: jwt.sign({ username: doc.username }, process.env.JWT_SECRET, jwtOptions)
                }
              })
            } else {
              res.send({ error: 'password is incorrect' })
            }
          })
        })
        .catch(err => res.send({ error: 'error occurred finding user' }))
      } else {
        res.send({ error: 'invalid params' })
      }

    }

}

export default controller
