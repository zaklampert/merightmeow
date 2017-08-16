import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../api/groups/groups.js';

import GroupPage from '../pages/GroupPage.js';

export default createContainer(({ params: { groupName } }) => {
  const handle = Meteor.subscribe('users.byGroupName', { groupName });
  const loading = !handle.ready();
  const group = Groups.findOne({ name: groupName });
  const groupExists = !loading && !!group;
  const members = (groupExists) ? group.usersInGroup().fetch() : [];
  console.log(members);
  return {
    loading,
    groupExists,
    group,
    members,
  };
}, GroupPage);
