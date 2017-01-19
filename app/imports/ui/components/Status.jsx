import React from 'react';
import moment from 'moment';

export default class Status extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      statusIndex: 0
    }
    this._showOlderStatus = this._showOlderStatus.bind(this)
    this._showNewerStatus = this._showNewerStatus.bind(this)
  }
  _showOlderStatus(){

    const {statuses} = this.props;
    const {statusIndex} = this.state;
    if(statusIndex + 1 <= statuses.length){
      return this.setState({
        statusIndex: statusIndex + 1
      })
    }
  }
  _showNewerStatus(){
    const {statusIndex} = this.state;
    if(statusIndex - 1 >= 0) {
      return this.setState({
        statusIndex: statusIndex - 1
      })
    }
  }
  render(){
    const {loading, statuses, user} = this.props;
    const status = statuses[this.state.statusIndex];

    if(loading){
      return <div>Loading...</div>
    }

    return(
      <div>

        <div className="info">{user.emails[0].address}: {moment(status.createdAt).calendar()}</div>
        <img src={status.imageUrl}/>
        <div onClick={this._showOlderStatus}>Show older</div>
        <div onClick={this._showNewerStatus}>Show newer</div>
      </div>
    )
  }
}
