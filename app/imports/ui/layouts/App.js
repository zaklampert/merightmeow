import React from 'react';
import { Meteor } from 'meteor/meteor';

import Me from '../components/Me'
import ChangeStatus from '../components/ChangeStatus';
import Groups from '../containers/GroupsListContainer';
import CreateGroup from '../components/groups/CreateGroup';

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.userId) {
      this.context.router.push('/signin');
    }
  }
  render() {
    const {user, groups, children, location, userId, searchResults, searching} = this.props;
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return(
      <div>
        {(userId) ? <div onClick={() => Meteor.logout((err)=>{console.log(err)})}>Logout</div> : null }
        <Groups />
        <CreateGroup />
        <Me me={user} userId={userId} />
        <ChangeStatus searchResults={searchResults} searching={searching}/>
        {clonedChildren}
        {/* <GroupList groups={groups} /> */}
      </div>
    )
  }
}


App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
