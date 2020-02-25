import { Router } from 'express'
import controller from './controller'
import validateTokenMiddleware from './utils/validateTokenMiddleware'

const router = new Router()

router.route('/register')
  .post(controller.register)

router.route('/login')
  .post(controller.login)

// now, when we send a GET request to /users, our middleware checks for the
// valid jwt token and responds appropriately
router.route('/users')
  .get(validateTokenMiddleware, controller.viewUsers)

export default router
