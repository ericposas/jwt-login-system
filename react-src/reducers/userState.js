import constants from '../constants/constants'

const userState = (state = null, action) => {
  return action.type || state
}

export default userState
