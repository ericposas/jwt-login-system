import jwt from 'jsonwebtoken'

const validateTokenMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1] // Bearer <token>
    const options = { expiresIn: '2d', issuer: 'jwt-login-system' }
    // put jwt 'verify' function within the try block in order to catch
    // validation hours
    try {
      jwt.verify(token, process.env.JWT_SECRET, options)
      next()
    } catch (err) {
      // throw new Error(err)
      res.send({ error: 'invalid token' })
    }
  } else {
    res.send({ error: 'authentication error.' })
  }

}

export default validateTokenMiddleware
