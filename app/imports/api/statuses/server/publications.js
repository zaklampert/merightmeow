/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Statuses } from '../statuses.js';

Meteor.publishComposite('statuses.me', function() {
  // new SimpleSchema({
  //   listId: { type: String },
  // }).validate(params);

  // const { listId } = params;
  const userId = this.userId;

  return {
    find() {
      const query = {
        userId: userId
      };

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        sort: {createdAt: -1},
        limit: 20
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
