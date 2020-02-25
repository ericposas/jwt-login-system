import jwt from 'jsonwebtoken'
import jwtOptions from './jwtOptions'

const validateTokenMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1] // Bearer <token>
    // put jwt 'verify' function within the try block in order to catch
    // validation hours
    try {
      jwt.verify(token, process.env.JWT_SECRET, jwtOptions)
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
