import React from 'react';
import StatusContainer from '../containers/StatusContainer';
import AddUserToGroup from '../components/groups/AddUserToGroup';

const GroupPage = ({ loading, members, groupExists, group }) => {
  if (loading) {
    return (
        <div> Loading...</div>
      );
  }
  return (
    <div>
          #{group.name}
          <AddUserToGroup groupId={group._id} />
          {members.map((member)=>{
              const email = member.emails[0].address;
             return (<div key={member._id}>
                  { email }
             </div>);
          })}
            {members.map((member) => {
            return (
                <StatusContainer key={member._id} userId={member._id} />
              );
          })}
    </div>
  );
};

export default GroupPage;
