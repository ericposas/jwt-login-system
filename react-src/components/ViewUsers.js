import React, { Component } from 'react'
import { Box, Button } from '@material-ui/core'
import reduxState from '../reduxState'
import { connect } from 'react-redux'

class ViewUsers extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <>
        <Box>
          {
            this.props.users && this.props.users.length > 0
            ?
              <>
                <h3>Protected route is now visible because we're logged in via jwt token</h3>
                {
                  this.props.users.map((user, idx) => (
                    <Box key={user._id}>
                      User {idx + 1}: {user.username}
                    </Box>
                  ))
                }
              </>
            : <h3>Not logged in, no jwt token saved</h3>
          }
        </Box>
      </>
    )
  }

}

export default connect(reduxState.mapState, reduxState.mapDispatch)(ViewUsers)
