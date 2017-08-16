import React from 'react';

class GroupsList extends React.Component{
    render(){
        const { groups } = this.props; 
        return(
        <div id="groups">
            Your groups:
            {groups.map(group => (
                <div onClick={()=>{this.context.router.push(`/${group.name}`)}} key={group._id}>{group.name}</div>
            ))}
        </div>
        )
    }
  
}

GroupsList.contextTypes = {
    router: React.PropTypes.object,
};    

export default GroupsList;