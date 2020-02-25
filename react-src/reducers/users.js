import constants from '../constants/constants'

const users = (state = [], action) => {
  switch (action.type) {
    case constants.SET_USERS:
      return action.payload
      break;
    default:
      return state
  }
}

export default users
