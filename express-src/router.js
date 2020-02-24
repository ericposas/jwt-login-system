import { Router } from 'express'
import controller from './controller'
import validateTokenMiddleware from './utils/validateTokenMiddleware'

const router = new Router()

router
  // .get('/', controller.home)
  .post('/register', controller.register)
  .post('/login', controller.login)

router.route('/users')
  // now, when we send a GET request, our middleware checks for the
  // valid jwt token and responds appropriately
  .get(validateTokenMiddleware, controller.viewUsers)

export default router
