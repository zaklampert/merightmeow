import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// import i18n from 'meteor/universe:i18n';

// route components
import AppContainer from '../../ui/containers/AppContainer.js';
// import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

// i18n.setLocale('en');

const isLoggedIn = (nextState, replace) => {
  if (!Meteor.userId()) {
    replace({
      pathname: '/signin',
    });
  }
};

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer} onEnter={isLoggedIn} />
    <Route path="signin" component={AuthPageSignIn} />
    <Route path="join" component={AuthPageJoin} />
  </Router>
);
