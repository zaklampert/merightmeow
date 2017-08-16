/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Statuses } from '../statuses.js';
import { Groups } from '../../groups/groups.js'

Meteor.publishComposite('statuses.byUser', function(params) {
  new SimpleSchema({
    userId: { type: String },
  }).validate(params);

  const { userId } = params;

  return {
    find() {
      const query = {
        userId: userId
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        sort: {createdAt: -1},
        limit: 20,
      };
      return Statuses.find(query, options);
    },

    // children: [{
    //   find(list) {
    //     return Todos.find({ listId: list._id }, { fields: Todos.publicFields });
    //   },
    // }],
  };
});

Meteor.publishComposite('statuses.byGroupName', function(params) {
    new SimpleSchema({
    groupName: { type: String },
  }).validate(params);
  const { groupName } = params;
  return {
    find() {
      const query = {
        name: groupName,
        members: this.userId,
      };
      return Groups.find(query);
    },
    children: [{
      find(group) {
        return Statuses.find({ userId: { $in: group.members } });
      }
    }]
  }
});

