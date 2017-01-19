import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Session} from 'meteor/session';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Statuses } from './statuses.js';
// import { Lists } from '../lists/lists.js';

export const create = new ValidatedMethod({
  name: 'statuses.create',
  validate: new SimpleSchema({
    imageUrl: { type: String },
  }).validator(),
  run({ imageUrl }) {
    // const list = Lists.findOne(listId);
    //
    // if (list.isPrivate() && list.userId !== this.userId) {
    //   throw new Meteor.Error('api.todos.insert.accessDenied',
    //     'Cannot add todos to a private list that is not yours');
    // }

    const status = {
      userId: Meteor.userId(),
      imageUrl,
      public: false,
      createdAt: new Date(),
    };

    Statuses.insert(status);
  },
});

export const search = new ValidatedMethod({
  name: 'statuses.search',
  validate: new SimpleSchema({
    searchTerm: {type: String},
  }).validator(),
  run({searchTerm}) {
    this.unblock();
    if (this.isSimulation) {

    }
    var url = 'http://api.giphy.com/v1/gifs/search';
    try {
      var result = HTTP.get(url, {
        params: {
          q: searchTerm,
          rating: 'pg-13',
          limit: '50',
          api_key: Meteor.settings.giphy_api_key
        }
      })
      return result;
    } catch(e){
      return false;
    }
  }
})

// export const setCheckedStatus = new ValidatedMethod({
//   name: 'todos.makeChecked',
//   validate: new SimpleSchema({
//     todoId: { type: String },
//     newCheckedStatus: { type: Boolean },
//   }).validator(),
//   run({ todoId, newCheckedStatus }) {
//     const todo = Todos.findOne(todoId);
//
//     if (todo.checked === newCheckedStatus) {
//       // The status is already what we want, let's not do any extra work
//       return;
//     }
//
//     if (!todo.editableBy(this.userId)) {
//       throw new Meteor.Error('api.todos.setCheckedStatus.accessDenied',
//         'Cannot edit checked status in a private list that is not yours');
//     }
//
//     Todos.update(todoId, { $set: {
//       checked: newCheckedStatus,
//     } });
//   },
// });
//
// export const updateText = new ValidatedMethod({
//   name: 'todos.updateText',
//   validate: new SimpleSchema({
//     todoId: { type: String },
//     newText: { type: String },
//   }).validator(),
//   run({ todoId, newText }) {
//     // This is complex auth stuff - perhaps denormalizing a userId onto todos
//     // would be correct here?
//     const todo = Todos.findOne(todoId);
//
//     if (!todo.editableBy(this.userId)) {
//       throw new Meteor.Error('api.todos.updateText.accessDenied',
//         'Cannot edit todos in a private list that is not yours');
//     }
//
//     Todos.update(todoId, {
//       $set: { text: newText },
//     });
//   },
// });
//
// export const remove = new ValidatedMethod({
//   name: 'todos.remove',
//   validate: new SimpleSchema({
//     todoId: { type: String },
//   }).validator(),
//   run({ todoId }) {
//     const todo = Todos.findOne(todoId);
//
//     if (!todo.editableBy(this.userId)) {
//       throw new Meteor.Error('api.todos.remove.accessDenied',
//         'Cannot remove todos in a private list that is not yours');
//     }
//
//     Todos.remove(todoId);
//   },
// });

// Get list of all method names on Todos
const TODOS_METHODS = _.pluck([
  create,
  // setCheckedStatus,
  // updateText,
  // remove,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 todos operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TODOS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
