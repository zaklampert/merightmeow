import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Groups } from '../../groups/groups.js';
Meteor.publishComposite('users.byGroupName', function (params) {
  new SimpleSchema({
      groupName: { type: String },
    }).validate(params);
  const { groupName } = params;
  const userId = this.userId;

  return {
      find() {
        const query = {
          name: groupName,
          members: userId,
        };

        // We only need the _id field in this query, since it's only
        // used to drive the child queries to get the todos
        const options = {
          sort: { createdAt: -1 },
          // limit: 20
        };
        return Groups.find(query, options);
      },

      children: [{
        find(group) {
          return Meteor.users.find({ _id: { $in: group.members } }, { fields: { _id: 1, emails: 1 } });
        },
      }],
    };
});

Meteor.publish('users.public', () =>  {
    return Meteor.users.find({}, { fields: { emails: 1, _id: 1 } });
  });
