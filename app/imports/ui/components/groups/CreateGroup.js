import React from 'react';
import {
    create,
  } from '../../../api/groups/methods.js';

class CreateGroup extends React.Component{
    constructor(props){
        super(props);
        this._createGroup = this._createGroup.bind(this);
    }
    _createGroup() {
        const groupName = this.groupName.value;
        if (groupName) {
            create.call({ name: groupName },(err)=>{
                if(err){
                    return console.log(err);
                }
                this.groupName.value = null;
            });
        }
    }
    render(){
        return (
            <div>
                <label htmlFor="groupName">New Group</label><br/>
                <input id="groupName" ref={(c) => {this.groupName = c}} placeholder="only-lowercase-allowed"/>
                <div onClick={this._createGroup}>Go</div>
            </div>
        )
    }
}

export default CreateGroup;
