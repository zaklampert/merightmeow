import React from 'react';
import {
    addUser,
} from '../../../api/groups/methods.js';

class AddUserToGroup extends React.Component {
    constructor(props){
        super(props);
        this._addUser = this._addUser.bind(this);
    }
    _addUser() {
        const email = this.email.value;
        const { groupId } = this.props;
        
        if (!email || !groupId) {
            return false;
        }
        console.log(email);
        addUser.call({ email, groupId}, (err)=>{
            if(err){
                return console.log(err)
            }
            this.email.value = null;
            return;
        })
    }
    render(){
        return (
            <div>
                <input ref={(c)=>{this.email = c}} />
                <div onClick={this._addUser} >Add</div>
            </div>
        );
    }
}

export default AddUserToGroup;
