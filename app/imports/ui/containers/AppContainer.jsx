import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

export default createContainer(() => {
  const publicHandle = Meteor.subscribe('lists.public');
  const privateHandle = Meteor.subscribe('lists.private');
  return {
    user: Meteor.user(),
    userId: Meteor.userId(),
    // loading: !(publicHandle.ready() && privateHandle.ready()),
    searching: Session.get('SEARCHING'),
    searchResults: Session.get('SEARCH_RESULTS'),
    connected: Meteor.status().connected,
    menuOpen: Session.get('menuOpen'),
    // lists: Lists.find({ $or: [
    //   { userId: { $exists: false } },
    //   { userId: Meteor.userId() },
    // ] }).fetch(),
  };
}, App);
