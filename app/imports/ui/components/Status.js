import React from 'react';
import moment from 'moment';

import './Status.styl';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusIndex: 0,
    };
    this._showOlderStatus = this._showOlderStatus.bind(this);
    this._showNewerStatus = this._showNewerStatus.bind(this);
    this._renderImage = this._renderImage.bind(this);
  }
  _showOlderStatus() {
    const { statuses } = this.props;
    const { statusIndex } = this.state;
    if (statusIndex + 1 <= statuses.length && statuses[statusIndex + 1]) {
      return this.setState({
        statusIndex: statusIndex + 1,
      });
    }
  }
  _showNewerStatus() {
    const { statusIndex } = this.state;
    if (statusIndex - 1 >= 0) {
      return this.setState({
        statusIndex: statusIndex - 1,
      });
    }
  }
  _renderImage(status) {
    if (status.imageUrl || status.fileType === 'gif') {
      return (
        <img src={status.sourceUrl || status.imageUrl} role="presentation" />
      );
    }
    if (status.fileType === 'mp4') {
      return (
        <video width={status.width} height={status.height} autoPlay loop key={status.sourceUrl}>
          <source src={status.sourceUrl} type="video/mp4" />

        Your browser does not support the video tag.
      </video>
      );
    }
  }
  render() {
    const { loading, statuses, user } = this.props;
    const status = statuses[this.state.statusIndex];

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!status) {
      return <div>Set your first status!</div>
    }

    return (
      <div className="container-status">
        <div className="info">{user.emails[0].address}: {moment(status.createdAt).calendar()}</div>
        {this._renderImage(status)}
        <div className="container-status-timeline">
          <div className="button01" onClick={this._showOlderStatus}>
            <span className="label">Past</span>
          </div>
          <div className="button01" onClick={this._showNewerStatus}>
            <span className="label">Current</span>
          </div>
        </div>
      </div>
    );
  }
}
