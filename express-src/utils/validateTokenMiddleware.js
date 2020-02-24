import jwt from 'jsonwebtoken'

const validateTokenMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1] // Bearer <token>
    const options = { expiresIn: '2d', issuer: 'jwt-login-system' }
    try {
      req.decoded = jwt.verify(token, process.env.JWT_SECRET, options)
      next()
    } catch (err) {
      throw new Error(err)
    }
  } else {
    res.send({ error: 'authentication error.' })
  }

}

export default validateTokenMiddleware