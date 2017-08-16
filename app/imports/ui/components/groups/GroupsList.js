import React from 'react';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';

class GroupsList extends React.Component{
    constructor(props){
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick(e) {
        const {name} = e.item.props;

        this.context.router.push(`/${name}`)
    }

    render(){
        const { groups } = this.props; 
        return(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={this._handleClick}>
           
          
            {groups.map(group => (
                <Menu.Item key={group._id} name={group.name}>
                    <Icon type="user" />
                    <span className="nav-text">
                        {group.name}
                    
                    </span>
                </Menu.Item>
                
            ))}
        </Menu>        
        )
    }
}

GroupsList.contextTypes = {
    router: React.PropTypes.object,
};    

export default GroupsList;