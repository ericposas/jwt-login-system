import User from './models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const controller = {

  home: (req, res) => {
    res.send('Homepage.')
  },

  viewUsers: (req, res) => {
    User.find({})
      .then(results => res.send({ success: results }))
      .catch(err => res.send({ error: err.errmsg }))
  },

  register: (req, res) => {

    if (!req.body.username || !req.body.email || !req.body.password) res.send({ error: 'incorrect params sent' })

    const insertUser = hash => {
      User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      })
      .save()
      .then(doc => {
        res.send({ success: 'successfuly registered!' })
      })
      .catch(err => res.send({ error: err.errmsg }))
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => insertUser(hash))
    })

  },

  login: (req, res) => {

    if (!req.body.email || !req.body.password) res.send({ error: 'invalid params' })

    User.findOne({ email: req.body.email })
      .then(doc => {
        bcrypt.compare(req.body.password, doc.password, (err, match) => {
          if (match && !err) {
            // res.send({ success: 'now do the jwt token part' })
            let encodedJwt = jwt.sign(
              {
                username: doc.username
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '2d',
                issuer: 'jwt-login-system'
              }
            )
            res.send({ success: encodedJwt })
          } else {
            res.send({ error: 'password is incorrect' })
          }
        })
      })
      .catch(err => res.send({ error: err.errmsg }))

  }

}

export default controller
