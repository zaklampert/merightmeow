import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../api/groups/groups.js';

import GroupsList from '../components/groups/GroupsList.js';

export default createContainer(() => {
  const myStatusHandle = Meteor.subscribe('groups.myGroups');
  return {
    loading: !myStatusHandle.ready(),
    user: Meteor.user(),
    groups: Groups.find({ members: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
  };
}, GroupsList);
