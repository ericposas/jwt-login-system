import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import ViewUsers from './ViewUsers'
import Login from './Login'

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/users' component={ViewUsers} />
          </Switch>
        </Router>
      </>
    )
  }

}

export default App
