import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Statuses } from '../../api/statuses/statuses.js';

import Status from '../components/Status.jsx';

export default createContainer(() => {
  const myStatusHandle = Meteor.subscribe('statuses.me');
  return {
    loading: !myStatusHandle.ready(),
    user: Meteor.user(),
    statuses: Statuses.find({userId: Meteor.userId()},{sort: {createdAt: -1}}).fetch()
  };
}, Status);
