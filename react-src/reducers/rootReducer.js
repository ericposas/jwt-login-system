import { combineReducers } from 'redux'
import users from './users'
import userState from './userState'

const rootReducer = combineReducers({
  users,
  userState
})

export default rootReducer
