import React, { Component } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import reduxState from '../reduxState'
import { connect } from 'react-redux'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
  }

  handleLoginSubmit = () => {
    if (this.state.email && this.state.password) {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      })
    } else {
      console.log('no input params')
    }
  }

  render() {
    return (
      <>
        <Box>
          <TextField
            label='email'
            variant='outlined'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            label='password'
            variant='outlined'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button
            onClick={this.handleLoginSubmit}
          >Login</Button>
        </Box>
      </>
    )
  }

}

export default connect(reduxState.mapState, reduxState.mapDispatch)(Login)
