import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/factory';
// import faker from 'faker';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// import incompleteCountDenormalizer from './incompleteCountDenormalizer.js';
// import { Lists } from '../lists/lists.js';

class StatusesCollection extends Mongo.Collection {
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

export const Statuses = new StatusesCollection('statuses');

// Deny all client-side updates since we will be using methods to manage this collection
Statuses.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Statuses.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
  },
  imageUrl: {
    type: String
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

Statuses.attachSchema(Statuses.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Statuses.publicFields = {
  // listId: 1,
  // text: 1,
  createdAt: 1,
  public: 1,
};

// TODO This factory has a name - do we have a code style for this?
//   - usually I've used the singular, sometimes you have more than one though, like
//   'todo', 'emptyTodo', 'checkedTodo'
// Factory.define('todo', Todos, {
//   listId: () => Factory.get('list'),
//   text: () => faker.lorem.sentence(),
//   createdAt: () => new Date(),
// });
//
// Todos.helpers({
//   list() {
//     return Lists.findOne(this.listId);
//   },
//   editableBy(userId) {
//     return this.list().editableBy(userId);
//   },
// });
