import constants from '../constants/constants'
import axios from 'axios'

const setToken = token => {
  if (localStorage) {
    localStorage.setItem('jwt-login-system-token', token)
  }
}

const getToken = () => {
  if (localStorage && localStorage.getItem('jwt-login-system-token')) return localStorage.getItem('jwt-login-system-token')
  else return false
}

const actions = {

  login: ({ email, password }, callback) => {
    return (dispatch, getState) => {
      axios.post('/login', { email, password })
        .then(data => {
          if (data.data.success) {
            console.log(data)
            dispatch({ type: constants.USER_LOGGED_IN, payload: data.data.success.user })
            setToken(data.data.success.token)
            if (callback) callback()

          } else {
            console.log(data.data)
          }
        })
        .catch(err => console.log(err))
    }
  },

  getUsers: (callback) => {
    return (dispatch, getState) => {
      let token = getToken()
      if (token) {
        axios.get('/users', { headers: { Authorization: `Bearer ${token}` } })
          .then(data => {
            if (data.data.success) {
              console.log(data)
              dispatch({ type: constants.SET_USERS, payload: data.data.success })
              if (callback) callback()

            }
          })
          .catch(err => console.log(err))
      } else {
        console.log('no token stored client side')
      }
    }
  }

}

export default actions
