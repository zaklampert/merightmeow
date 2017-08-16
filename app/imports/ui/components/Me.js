import React from 'react'
import {Link} from 'react-router';
import StatusContainer from '../containers/StatusContainer';

class Me extends React.Component {
  constructor(props) {
    super(props);
    this._renderSignedIn = this._renderSignedIn.bind(this);
  }
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
    const { userId } = this.props;
    return (
      <div>
        <StatusContainer userId={userId} />

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
