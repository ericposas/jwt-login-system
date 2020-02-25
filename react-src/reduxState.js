import { bindActionCreators } from 'redux'
import actions from './actions/actionCreators'

const mapState = state => state

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export default {
  mapState, mapDispatch
}
