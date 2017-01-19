import React from 'react'
import {Link} from 'react-router';
import MyStatus from '../containers/MyStatusContainer'

class Me extends React.Component {
  _renderSignedOut(){
    return (
      <div>
        <Link to="/join">
          Join
        </Link>
        {" | "}
        <Link to="signin">
          Sign in
        </Link>
      </div>
    )
  }
  _renderSignedIn(){
    return (
      <div>
        <MyStatus />

      </div>
    )
  }
  render(){
    const {me, userId} = this.props;
    if (!userId) {
      return this._renderSignedOut()
    }
    return this._renderSignedIn()
  }
}

export default Me;
