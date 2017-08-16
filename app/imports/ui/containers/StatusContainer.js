import { Meteor } from 'meteor/meteor';
// XXX: Session
import { createContainer } from 'meteor/react-meteor-data';
import { Statuses } from '../../api/statuses/statuses.js';

import Status from '../components/Status.js';

export default createContainer((props) => {
  const { userId } = props;
  const StatusHandle = Meteor.subscribe('statuses.byUser', {userId});
  console.log(userId);
  return {
    loading: !StatusHandle.ready(),
    user: Meteor.user(),
    statuses: Statuses.find({userId}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Status);
