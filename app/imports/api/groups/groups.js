import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
import { Meteor } from 'meteor/meteor';
// import faker from 'faker';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


// import incompleteCountDenormalizer from './incompleteCountDenormalizer.js';
import { Statuses } from '../statuses/statuses.js';

class GroupsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    // incompleteCountDenormalizer.afterInsertTodo(ourDoc);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    // incompleteCountDenormalizer.afterUpdateTodo(selector, modifier);
    return result;
  }
  remove(selector) {
    // const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    // incompleteCountDenormalizer.afterRemoveTodos(todos);
    return result;
  }
}

export const Groups = new GroupsCollection('groups');

// Deny all client-side updates since we will be using methods to manage this collection
Groups.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Groups.schema = new SimpleSchema({
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  members: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    regEx: /^[a-z]+(-[a-z]+)*$/,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  public: {
    type: Boolean,
    defaultValue: false,
  },
});

Groups.attachSchema(Groups.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Groups.publicFields = {
  // listId: 1,
  // text: 1,
  createdAt: 1,
  public: 1,
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
// Factory.define('group', Groups, {
// //   listId: () => Factory.get('list'),
// //   text: () => faker.lorem.sentence(),
// //   createdAt: () => new Date(),
// });

Groups.helpers({
  usersInGroup() {
      console.log(this.members);
    return Meteor.users.find({ _id: { $in: this.members } });
  },
});
